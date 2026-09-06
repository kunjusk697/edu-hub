function token() {
  return document.getElementById("admin-token").value;
}

async function adminApi(path, options = {}) {
  const response = await fetch(`/api/admin${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": token(),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Request failed");
  }

  return response.json();
}

function showPanel(name) {
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `panel-${name}`);
  });
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.panel === name);
  });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

async function loadDashboard() {
  const stats = await adminApi("/dashboard");
  document.getElementById("dashboard-stats").innerHTML = `
    <div class="stat-card"><span>Products</span><strong>${stats.productCount}</strong></div>
    <div class="stat-card"><span>Home banners</span><strong>${stats.slideCount}</strong></div>
    <div class="stat-card"><span>Open orders</span><strong>${stats.openOrders}</strong></div>
    <div class="stat-card"><span>Delivered</span><strong>${stats.deliveredOrders}</strong></div>
    <div class="stat-card"><span>Sales</span><strong>${stats.formattedSalesTotal}</strong></div>
    <div class="stat-card"><span>Profit</span><strong>${stats.formattedProfit}</strong></div>
  `;
}

async function loadProducts() {
  const products = await adminApi("/products");
  document.getElementById("products-table").innerHTML = `
    <table>
      <thead>
        <tr><th>Name</th><th>SKU</th><th>MRP</th><th>Category</th><th>Update MRP</th></tr>
      </thead>
      <tbody>
        ${products
          .slice(0, 40)
          .map(
            (product) => `
              <tr>
                <td>${product.name}</td>
                <td>${product.sku}</td>
                <td>${product.formattedPrice}</td>
                <td>${product.categoryName}</td>
                <td>
                  <input data-price-id="${product.id}" type="number" value="${product.price}" min="1" style="width:90px" />
                  <button data-save-price="${product.id}" type="button">Save</button>
                </td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
    <p>${products.length} products total (showing first 40)</p>
  `;

  document.querySelectorAll("[data-save-price]").forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.savePrice;
      const price = document.querySelector(`[data-price-id="${id}"]`).value;
      await adminApi(`/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({ price: Number(price) }),
      });
      await loadProducts();
      await loadDashboard();
    });
  });
}

async function loadSlides() {
  const slides = await adminApi("/slides");
  document.getElementById("slides-editor").innerHTML = slides
    .map(
      (slide) => `
        <form class="card slide-editor" data-slide-id="${slide.id}">
          <img src="${slide.image}" alt="${slide.title}" />
          <label>Title<input name="title" value="${slide.title}" /></label>
          <label>Subtitle<input name="subtitle" value="${slide.subtitle}" /></label>
          <label>Image URL<input name="image" value="${slide.image}" /></label>
          <button type="submit">Save banner</button>
        </form>
      `
    )
    .join("");

  document.querySelectorAll(".slide-editor").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const id = form.dataset.slideId;
      const data = new FormData(form);
      await adminApi(`/slides/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: data.get("title"),
          subtitle: data.get("subtitle"),
          image: data.get("image"),
        }),
      });
      await loadSlides();
    });
  });
}

async function loadOrders() {
  const orders = await adminApi("/orders");
  document.getElementById("orders-table").innerHTML = orders.length
    ? `
      <table>
        <thead>
          <tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Payment</th><th>Actions</th></tr>
        </thead>
        <tbody>
          ${orders
            .map(
              (order) => `
                <tr>
                  <td>${order.id}<br><small>${new Date(order.createdAt).toLocaleString()}</small></td>
                  <td>${order.customerName}<br><small>${order.customerPhone}</small></td>
                  <td>${order.formattedTotal}</td>
                  <td>${order.status}</td>
                  <td>${order.paymentStatus}</td>
                  <td>
                    <button data-deliver="${order.id}" type="button">Mark delivered</button>
                    <button data-paid="${order.id}" type="button">Verify payment</button>
                  </td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `
    : "<p>No orders yet.</p>";

  document.querySelectorAll("[data-deliver]").forEach((button) => {
    button.addEventListener("click", async () => {
      await adminApi(`/orders/${button.dataset.deliver}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "delivered" }),
      });
      await loadOrders();
      await loadDashboard();
      await loadFinance();
    });
  });

  document.querySelectorAll("[data-paid]").forEach((button) => {
    button.addEventListener("click", async () => {
      await adminApi(`/orders/${button.dataset.paid}`, {
        method: "PATCH",
        body: JSON.stringify({ paymentStatus: "verified" }),
      });
      await loadOrders();
    });
  });
}

async function loadFinance() {
  const report = await adminApi("/reports/profit-loss");
  document.getElementById("finance-stats").innerHTML = `
    <div class="stat-card"><span>Sales</span><strong>${formatCurrency(report.salesTotal)}</strong></div>
    <div class="stat-card"><span>Expenses</span><strong>${formatCurrency(report.expenseTotal)}</strong></div>
    <div class="stat-card"><span>Profit / Loss</span><strong>${formatCurrency(report.profit)}</strong></div>
    <div class="stat-card"><span>Delivered orders</span><strong>${report.deliveredOrders}</strong></div>
  `;

  document.getElementById("expenses-table").innerHTML = report.expenses.length
    ? `<table><thead><tr><th>Date</th><th>Label</th><th>Amount</th></tr></thead><tbody>${report.expenses
        .map((item) => `<tr><td>${item.date}</td><td>${item.label}</td><td>${formatCurrency(item.amount)}</td></tr>`)
        .join("")}</tbody></table>`
    : "<p>No expenses recorded.</p>";
}

async function loadUpi() {
  const settings = await adminApi("/settings");
  const upi = settings.upi;
  const form = document.getElementById("upi-form");
  form.payeeName.value = upi.payeeName;
  form.upiId.value = upi.upiId;
  form.qrImage.value = upi.qrImage;
  form.note.value = upi.note;
  document.getElementById("upi-preview").innerHTML = `
    <h3>Preview</h3>
    <img src="${upi.qrImage}" alt="UPI QR code" />
    <p><strong>${upi.payeeName}</strong> · ${upi.upiId}</p>
    <p>${upi.note}</p>
  `;
}

async function refreshAll() {
  await Promise.all([loadDashboard(), loadProducts(), loadSlides(), loadOrders(), loadFinance(), loadUpi()]);
}

document.querySelectorAll(".nav-btn").forEach((button) => {
  button.addEventListener("click", () => showPanel(button.dataset.panel));
});

document.getElementById("refresh-all").addEventListener("click", refreshAll);

document.getElementById("product-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  await adminApi("/products", {
    method: "POST",
    body: JSON.stringify({
      name: data.get("name"),
      sku: data.get("sku"),
      price: Number(data.get("price")),
      categoryId: data.get("categoryId"),
      series: data.get("series"),
      image: data.get("image"),
      description: data.get("description"),
    }),
  });
  event.target.reset();
  await loadProducts();
  await loadDashboard();
});

document.getElementById("expense-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  await adminApi("/expenses", {
    method: "POST",
    body: JSON.stringify({
      label: data.get("label"),
      amount: Number(data.get("amount")),
    }),
  });
  event.target.reset();
  await loadFinance();
  await loadDashboard();
});

document.getElementById("upi-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  await adminApi("/settings", {
    method: "PUT",
    body: JSON.stringify({
      upi: {
        payeeName: data.get("payeeName"),
        upiId: data.get("upiId"),
        qrImage: data.get("qrImage"),
        note: data.get("note"),
      },
    }),
  });
  await loadUpi();
});

refreshAll().catch((error) => {
  document.body.innerHTML = `<p style="padding:24px">${error.message}</p>`;
});
