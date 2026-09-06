const state = {
  appInfo: null,
  categories: [],
  activeCategory: "cookware",
  activeFilter: "all",
  menuProducts: [],
  quantities: {},
  searchQuery: "",
  activeProduct: null,
  productQty: 1,
  previousScreen: "home",
};

const screens = [...document.querySelectorAll("[data-screen]")];
const navButtons = [...document.querySelectorAll(".bottom-nav [data-screen]")];
const bottomNav = document.getElementById("bottom-nav");

function formatCurrency(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function pseudoRating(product) {
  return (4 + (product.price % 9) / 10).toFixed(1);
}

async function api(path, options) {
  const response = await fetch(path, options);
  if (!response.ok) {
    throw new Error(`Request failed: ${path}`);
  }
  return response.json();
}

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === name);
  });

  const showNav = !["welcome", "menu", "product"].includes(name);
  bottomNav.hidden = !showNav;

  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.screen === name);
  });

  document.getElementById("menu-add-cart").style.display =
    name === "menu" ? "block" : "none";
}

function productThumb(product, altText) {
  if (product.imageThumb || product.image) {
    return `<img src="${product.imageThumb || product.image}" alt="${altText}" loading="lazy" />`;
  }

  return `<span>${product.categoryIcon}</span>`;
}

function topProductCard(product) {
  return `
    <article class="top-product-card" data-open-product="${product.id}">
      <div class="top-product-visual">
        <span class="rating">⭐ ${pseudoRating(product)}</span>
        ${productThumb(product, product.name)}
      </div>
      <div class="top-product-body">
        <strong>${product.name}</strong>
        <span class="series">${product.series}</span>
        <div class="price-row">
          <span class="price">${product.formattedPrice}</span>
        </div>
      </div>
    </article>
  `;
}

function menuItem(product) {
  const qty = state.quantities[product.id] || 0;
  return `
    <article class="menu-item" data-open-product="${product.id}">
      <div class="menu-item-thumb">
        ${productThumb(product, product.name)}
      </div>
      <div class="menu-item-info">
        <strong>${product.name}</strong>
        <p>${product.description}</p>
        <span class="rating">⭐ ${pseudoRating(product)} · ${product.sku || ""}</span>
      </div>
      <div class="menu-item-actions">
        <span class="price">${product.formattedPrice}</span>
        <div class="qty-control">
          <button type="button" data-qty-minus="${product.id}" aria-label="Decrease">−</button>
          <span>${qty}</span>
          <button type="button" data-qty-plus="${product.id}" aria-label="Increase">+</button>
        </div>
      </div>
    </article>
  `;
}

async function openProductDetail(productId) {
  const product = await api(`/api/products/${productId}`);
  state.activeProduct = product;
  state.productQty = state.quantities[productId] || 1;
  state.previousScreen = document.querySelector(".screen.active")?.dataset.screen || "home";

  document.getElementById("product-image").src = product.image;
  document.getElementById("product-image").alt = product.name;
  document.getElementById("product-sku").textContent = product.sku;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-series").textContent = `${product.series} · ${product.categoryName}`;
  document.getElementById("product-rating").textContent = `⭐ ${pseudoRating(product)} rating`;
  document.getElementById("product-price").textContent = product.formattedPrice;
  document.getElementById("product-description").textContent = product.description;
  document.getElementById("product-features").innerHTML = (product.features || [])
    .map((feature) => `<li>${feature}</li>`)
    .join("");
  document.getElementById("product-qty-value").textContent = String(state.productQty);

  showScreen("product");
}

function bindProductOpenHandlers() {
  document.querySelectorAll("[data-open-product]").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (event.target.closest("[data-qty-plus], [data-qty-minus]")) {
        return;
      }
      openProductDetail(element.dataset.openProduct);
    });
  });
}

function renderMenuList() {
  let products = [...state.menuProducts];

  if (state.activeFilter === "best") {
    products = products.filter((product) => product.price >= 1500);
  } else if (state.activeFilter !== "all") {
    products = products.filter((product) => product.series === state.activeFilter);
  }

  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.series.toLowerCase().includes(query)
    );
  }

  document.getElementById("category-products").innerHTML = products.length
    ? products.map(menuItem).join("")
    : `<p class="empty-state">No products match this filter.</p>`;

  bindQuantityControls();
  bindProductOpenHandlers();
}

async function loadCategoryProducts(categoryId) {
  state.activeCategory = categoryId;
  const category = state.categories.find((item) => item.id === categoryId);
  const products = await api(`/api/products?category=${categoryId}`);

  state.menuProducts = products;
  document.getElementById("menu-title").textContent = category ? category.name : "Catalog";
  document.getElementById("menu-section-title").textContent = `Best in ${category ? category.name : "Products"}`;

  renderMenuList();
  showScreen("menu");
}

function bindQuantityControls() {
  document.querySelectorAll("[data-qty-plus]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.qtyPlus;
      state.quantities[id] = (state.quantities[id] || 0) + 1;
      renderMenuList();
    });
  });

  document.querySelectorAll("[data-qty-minus]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.qtyMinus;
      state.quantities[id] = Math.max(0, (state.quantities[id] || 0) - 1);
      renderMenuList();
    });
  });
}

async function addMenuSelectionsToCart() {
  const selected = Object.entries(state.quantities).filter(([, qty]) => qty > 0);

  if (!selected.length) {
    return;
  }

  for (const [productId, quantity] of selected) {
    await api(`/api/cart/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
  }

  state.quantities = {};
  await refreshLists();
  showScreen("profile");
}

async function refreshLists() {
  const [cart, wishlist, appInfo] = await Promise.all([
    api("/api/cart"),
    api("/api/wishlist"),
    api("/api/app-info"),
  ]);

  state.appInfo = appInfo;

  document.getElementById("panel-cart").innerHTML = cart.items.length
    ? `<h3>Your Cart</h3><ul>${cart.items
        .map(
          (item) =>
            `<li><strong>${item.name}</strong> × ${item.quantity} — ${formatCurrency(
              item.price * item.quantity
            )}</li>`
        )
        .join("")}</ul><p><strong>Total:</strong> ${cart.formattedTotal}</p>`
    : `<p class="empty-state">Your cart is empty. Browse Aura cookware or Chop Magic choppers.</p>`;

  document.getElementById("checkout-button").disabled = !cart.items.length;

  document.getElementById("panel-wishlist").innerHTML = wishlist.length
    ? `<ul>${wishlist
        .map((item) => `<li><strong>${item.name}</strong> — ${item.formattedPrice}</li>`)
        .join("")}</ul>`
    : `<p class="empty-state">Save Vacuum Flasks, Puttu Makers, or Tri-Ply pans to your wishlist.</p>`;

  const phone = document.getElementById("profile-phone").value;
  const orders = phone ? await api(`/api/orders?phone=${encodeURIComponent(phone)}`) : await api("/api/orders");

  document.getElementById("panel-orders").innerHTML = orders.length
    ? `<ul>${orders
        .map(
          (order) =>
            `<li><strong>${order.id}</strong> — ${order.formattedTotal} · ${order.status} · payment ${order.paymentStatus}</li>`
        )
        .join("")}</ul>`
    : `<p class="empty-state">No orders yet. Your checkout history will appear here.</p>`;
}

async function checkoutOrder() {
  const checkout = await api("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerName: "Guest",
      customerPhone: document.getElementById("profile-phone").value,
      customerEmail: document.getElementById("profile-email").value,
    }),
  });

  const upiBox = document.getElementById("upi-checkout");
  upiBox.hidden = false;
  upiBox.innerHTML = `
    <p><strong>Order ${checkout.order.id}</strong> placed. Scan to pay ${checkout.order.formattedTotal}.</p>
    <img src="${checkout.upi.qrImage}" alt="UPI QR code" />
    <p>${checkout.upi.payeeName} · ${checkout.upi.upiId}</p>
    <p>${checkout.upi.note}</p>
  `;

  await refreshLists();
  showScreen("orders");
}

async function runSearch() {
  state.searchQuery = document.getElementById("search-input").value.trim();
  if (!state.searchQuery) {
    return;
  }

  const products = await api(`/api/products?search=${encodeURIComponent(state.searchQuery)}`);
  if (products.length) {
    state.menuProducts = products;
    state.activeCategory = products[0].categoryId;
    document.getElementById("menu-title").textContent = "Search Results";
    document.getElementById("menu-section-title").textContent = `Results for "${state.searchQuery}"`;
    renderMenuList();
    showScreen("menu");
  }
}

function categoryPill(category) {
  return `
    <button class="category-pill" data-category="${category.id}" type="button">
      <div class="cat-icon" style="background:${category.color}22">${category.icon}</div>
      <span>${category.name}</span>
    </button>
  `;
}

function initSlideshow(slides) {
  const track = document.getElementById("slideshow-track");
  const dots = document.getElementById("slideshow-dots");
  let activeIndex = 0;
  let timerId = null;

  track.innerHTML = slides
    .map(
      (slide, index) => `
        <article class="slideshow-slide" data-slide-index="${index}">
          <img src="${slide.image}" alt="${slide.title}" loading="${index === 0 ? "eager" : "lazy"}" />
          <div class="slideshow-caption">
            <h3>${slide.title}</h3>
            <p>${slide.subtitle}</p>
            <button class="promo-btn" data-slide-shop="${index}" type="button">Shop Now</button>
          </div>
        </article>
      `
    )
    .join("");

  dots.innerHTML = slides
    .map(
      (_, index) =>
        `<button class="slideshow-dot${index === 0 ? " active" : ""}" data-slide-dot="${index}" type="button" aria-label="Go to slide ${index + 1}"></button>`
    )
    .join("");

  function goToSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    dots.querySelectorAll(".slideshow-dot").forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === activeIndex);
    });
  }

  function startAutoPlay() {
    clearInterval(timerId);
    timerId = setInterval(() => {
      goToSlide(activeIndex + 1);
    }, 4500);
  }

  dots.querySelectorAll("[data-slide-dot]").forEach((dot) => {
    dot.addEventListener("click", () => {
      goToSlide(Number(dot.dataset.slideDot));
      startAutoPlay();
    });
  });

  track.querySelectorAll("[data-slide-shop]").forEach((button) => {
    button.addEventListener("click", async () => {
      const slide = slides[Number(button.dataset.slideShop)];
      if (slide.series) {
        state.activeFilter = slide.series;
        document.querySelectorAll(".filter-chip").forEach((chip) => {
          chip.classList.toggle("active", chip.dataset.filter === slide.series);
        });
      } else {
        state.activeFilter = "all";
        document.querySelectorAll(".filter-chip").forEach((chip) => {
          chip.classList.toggle("active", chip.dataset.filter === "all");
        });
      }
      await loadCategoryProducts(slide.categoryId);
    });
  });

  const bar = document.getElementById("slideshow-bar");
  bar.addEventListener("mouseenter", () => clearInterval(timerId));
  bar.addEventListener("mouseleave", startAutoPlay);

  goToSlide(0);
  startAutoPlay();
}

async function init() {
  bottomNav.hidden = true;

  const [appInfo, categories, featured, slides] = await Promise.all([
    api("/api/app-info"),
    api("/api/categories"),
    api("/api/products?featured=true"),
    api("/api/slides"),
  ]);

  state.appInfo = appInfo;
  state.categories = categories;

  document.getElementById("welcome-brand").textContent = appInfo.brandName;
  document.getElementById("location-label").textContent = "Ernakulam, IN";
  document.getElementById("menu-location").textContent = "Ernakulam";

  initSlideshow(slides);

  document.getElementById("home-categories").innerHTML = categories
    .filter((category) => category.productCount > 0)
    .slice(0, 8)
    .map(categoryPill)
    .join("");

  document.getElementById("recommended-products").innerHTML = featured.map(topProductCard).join("");

  document.getElementById("profile-email").value = appInfo.contact.email;
  document.getElementById("profile-phone").value = appInfo.contact.phone;
  document.getElementById("profile-address").value = appInfo.contact.address;

  document.getElementById("welcome-start").addEventListener("click", () => {
    localStorage.setItem("lkm-welcome-seen", "1");
    showScreen("home");
  });

  const skipWelcome =
    localStorage.getItem("lkm-welcome-seen") ||
    new URLSearchParams(window.location.search).has("skipWelcome");

  if (skipWelcome) {
    showScreen("home");
  }

  document.getElementById("support-button").addEventListener("click", () => {
    window.location.href = `tel:${appInfo.contact.phone.replace(/\s/g, "")}`;
  });

  document.getElementById("search-button").addEventListener("click", runSearch);
  document.getElementById("search-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      runSearch();
    }
  });

  document.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", async () => {
      await loadCategoryProducts(button.dataset.category);
    });
  });

  document.querySelectorAll("[data-open-category]").forEach((card) => {
    card.addEventListener("click", async () => {
      await loadCategoryProducts(card.dataset.openCategory);
    });
  });

  document.getElementById("product-back").addEventListener("click", () => {
    showScreen(state.previousScreen === "product" ? "home" : state.previousScreen);
  });

  document.getElementById("product-qty-plus").addEventListener("click", () => {
    state.productQty += 1;
    document.getElementById("product-qty-value").textContent = String(state.productQty);
  });

  document.getElementById("product-qty-minus").addEventListener("click", () => {
    state.productQty = Math.max(1, state.productQty - 1);
    document.getElementById("product-qty-value").textContent = String(state.productQty);
  });

  document.getElementById("product-add-cart").addEventListener("click", async () => {
    if (!state.activeProduct) {
      return;
    }

    await api(`/api/cart/${state.activeProduct.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: state.productQty }),
    });

    state.quantities[state.activeProduct.id] = state.productQty;
    await refreshLists();
    showScreen("profile");
  });

  document.getElementById("product-wishlist").addEventListener("click", async () => {
    if (!state.activeProduct) {
      return;
    }

    await api(`/api/wishlist/${state.activeProduct.id}`, { method: "POST" });
    await refreshLists();
  });

  document.querySelectorAll("[data-screen-jump]").forEach((button) => {
    button.addEventListener("click", async () => {
      const target = button.dataset.screenJump;
      if (target === "menu") {
        await loadCategoryProducts(state.activeCategory);
      } else {
        showScreen(target);
        if (target === "wishlist" || target === "orders" || target === "profile") {
          await refreshLists();
        }
      }
    });
  });

  navButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      showScreen(button.dataset.screen);
      await refreshLists();
    });
  });

  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.activeFilter = chip.dataset.filter;
      document.querySelectorAll(".filter-chip").forEach((item) => {
        item.classList.toggle("active", item === chip);
      });
      renderMenuList();
    });
  });

  document.getElementById("menu-add-cart").addEventListener("click", addMenuSelectionsToCart);
  document.getElementById("cart-shortcut").addEventListener("click", async () => {
    await refreshLists();
  });

  document.getElementById("checkout-button").addEventListener("click", checkoutOrder);

  document.getElementById("profile-form").addEventListener("submit", (event) => {
    event.preventDefault();
    localStorage.setItem(
      "lkm-profile",
      JSON.stringify({
        email: document.getElementById("profile-email").value,
        phone: document.getElementById("profile-phone").value,
        address: document.getElementById("profile-address").value,
      })
    );
    document.getElementById("profile-subtitle").textContent = "Profile saved for guest checkout.";
  });

  const savedProfile = localStorage.getItem("lkm-profile");
  if (savedProfile) {
    const profile = JSON.parse(savedProfile);
    document.getElementById("profile-email").value = profile.email;
    document.getElementById("profile-phone").value = profile.phone;
    document.getElementById("profile-address").value = profile.address;
  }

  await refreshLists();

  const hash = window.location.hash.replace(/^#\/?/, "");
  if (hash.startsWith("product/")) {
    const productId = hash.split("/")[1];
    if (productId) {
      await openProductDetail(productId);
    }
  }
}

init().catch((error) => {
  console.error(error);
  document.body.innerHTML = `<p class="empty-state">Unable to load Le Kitchen Master.</p>`;
});
