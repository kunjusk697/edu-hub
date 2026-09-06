const state = {
  appInfo: null,
  categories: [],
  activeCategory: "cookware",
  activePanel: "cart",
};

const screens = [...document.querySelectorAll("[data-screen]")];
const navButtons = [...document.querySelectorAll(".bottom-nav [data-screen]")];

function formatCurrency(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

async function api(path, options) {
  const response = await fetch(path, options);
  if (!response.ok) {
    throw new Error(`Request failed: ${path}`);
  }
  return response.json();
}

function productCard(product) {
  return `
    <article class="product-card">
      <div class="product-visual" style="background: linear-gradient(135deg, ${product.categoryColor}, #1f1f1f);">
        <small>${product.series}</small>
        <span>${product.categoryIcon}</span>
      </div>
      <div class="product-body">
        <strong>${product.name}</strong>
        <span>${product.categoryName}</span>
        <div class="price">${product.formattedPrice}</div>
        <div class="card-actions">
          <button class="btn-secondary" data-wishlist="${product.id}">Wishlist</button>
          <button class="btn-primary" data-cart="${product.id}">Add to cart</button>
        </div>
      </div>
    </article>
  `;
}

function categoryCard(category) {
  return `
    <button class="category-card" data-category="${category.id}" type="button">
      <div class="category-icon" style="background:${category.color}22;color:${category.color}">
        ${category.icon}
      </div>
      <strong>${category.name}</strong>
      <span>${category.productCount} products</span>
    </button>
  `;
}

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === name);
  });
  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.screen === name);
  });
}

function showPanel(name) {
  state.activePanel = name;
  document.querySelectorAll(".profile-tabs button").forEach((button) => {
    button.classList.toggle("active", button.dataset.panel === name);
  });
  ["cart", "wishlist", "orders"].forEach((panel) => {
    document.getElementById(`panel-${panel}`).hidden = panel !== name;
  });
}

async function refreshLists() {
  const [cart, wishlist] = await Promise.all([api("/api/cart"), api("/api/wishlist")]);

  document.getElementById("panel-cart").innerHTML = cart.items.length
    ? `<ul>${cart.items
        .map(
          (item) =>
            `<li><strong>${item.name}</strong> × ${item.quantity} — ${formatCurrency(
              item.price * item.quantity
            )}</li>`
        )
        .join("")}</ul><p><strong>Total:</strong> ${cart.formattedTotal}</p>`
    : `<p class="empty-state">Your cart is empty. Add Aura cookware or Chop Magic choppers from the catalog.</p>`;

  document.getElementById("panel-wishlist").innerHTML = wishlist.length
    ? `<ul>${wishlist
        .map((item) => `<li><strong>${item.name}</strong> — ${item.formattedPrice}</li>`)
        .join("")}</ul>`
    : `<p class="empty-state">Save Vacuum Flasks, Puttu Makers, or Tri-Ply pans to your wishlist.</p>`;

  document.getElementById("panel-orders").innerHTML =
    `<p class="empty-state">No orders yet. Guest checkout history will appear here after your first purchase.</p>`;
}

async function loadCategoryProducts(categoryId) {
  state.activeCategory = categoryId;
  const products = await api(`/api/products?category=${categoryId}`);
  document.getElementById("category-products").innerHTML = products.length
    ? products.map(productCard).join("")
    : `<p class="empty-state">No products in this category yet.</p>`;
  document.querySelectorAll("#category-sidebar button").forEach((button) => {
    button.classList.toggle("active", button.dataset.category === categoryId);
  });
  bindProductActions();
}

function bindProductActions() {
  document.querySelectorAll("[data-cart]").forEach((button) => {
    button.addEventListener("click", async () => {
      await api(`/api/cart/${button.dataset.cart}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: 1 }),
      });
      await refreshLists();
      showScreen("profile");
      showPanel("cart");
    });
  });

  document.querySelectorAll("[data-wishlist]").forEach((button) => {
    button.addEventListener("click", async () => {
      await api(`/api/wishlist/${button.dataset.wishlist}`, { method: "POST" });
      await refreshLists();
      showScreen("profile");
      showPanel("wishlist");
    });
  });
}

async function init() {
  const [appInfo, categories, featured] = await Promise.all([
    api("/api/app-info"),
    api("/api/categories"),
    api("/api/products?featured=true"),
  ]);

  state.appInfo = appInfo;
  state.categories = categories;

  document.getElementById("brand-name").textContent = appInfo.brandName;
  document.getElementById("brand-tagline").textContent = `${appInfo.tagline} / ${appInfo.subtitle}`;
  document.getElementById("hero-banner").innerHTML = `
    <span class="hero-badge">${appInfo.promotion.badge}</span>
    <h2>${appInfo.promotion.title}</h2>
    <p>${appInfo.promotion.subtitle}</p>
  `;

  document.getElementById("home-categories").innerHTML = categories
    .filter((category) => category.productCount > 0)
    .slice(0, 6)
    .map(categoryCard)
    .join("");

  document.getElementById("recommended-products").innerHTML = featured.map(productCard).join("");

  document.getElementById("category-sidebar").innerHTML = categories
    .map(
      (category) =>
        `<button type="button" data-category="${category.id}">${category.name}</button>`
    )
    .join("");

  document.getElementById("profile-email").value = appInfo.contact.email;
  document.getElementById("profile-phone").value = appInfo.contact.phone;
  document.getElementById("profile-address").value = appInfo.contact.address;

  document.getElementById("support-button").addEventListener("click", () => {
    window.location.href = `tel:${appInfo.contact.phone.replace(/\s/g, "")}`;
  });

  document.querySelectorAll("#home-categories [data-category]").forEach((button) => {
    button.addEventListener("click", async () => {
      showScreen("category");
      await loadCategoryProducts(button.dataset.category);
    });
  });

  document.querySelectorAll("#category-sidebar [data-category]").forEach((button) => {
    button.addEventListener("click", async () => {
      await loadCategoryProducts(button.dataset.category);
    });
  });

  navButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      showScreen(button.dataset.screen);
      if (button.dataset.screen === "category") {
        await loadCategoryProducts(state.activeCategory);
      }
      if (button.dataset.screen === "profile") {
        await refreshLists();
      }
    });
  });

  document.querySelectorAll(".profile-tabs button").forEach((button) => {
    button.addEventListener("click", async () => {
      showPanel(button.dataset.panel);
      await refreshLists();
    });
  });

  document.getElementById("profile-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("profile-email").value;
    localStorage.setItem("lkm-profile", JSON.stringify({
      email,
      phone: document.getElementById("profile-phone").value,
      address: document.getElementById("profile-address").value,
    }));
    document.getElementById("profile-subtitle").textContent = "Profile saved for guest checkout.";
  });

  const savedProfile = localStorage.getItem("lkm-profile");
  if (savedProfile) {
    const profile = JSON.parse(savedProfile);
    document.getElementById("profile-email").value = profile.email;
    document.getElementById("profile-phone").value = profile.phone;
    document.getElementById("profile-address").value = profile.address;
  }

  bindProductActions();
  await loadCategoryProducts("appliances");
  await refreshLists();
}

init().catch((error) => {
  console.error(error);
  document.body.innerHTML = `<p class="empty-state">Unable to load Le Kitchen Master catalog.</p>`;
});
