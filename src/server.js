const express = require("express");
const path = require("path");

const categories = require("./data/categories");
const {
  loadCatalog,
  saveCatalog,
  loadOrders,
  saveOrders,
  loadExpenses,
  saveExpenses,
} = require("./data/catalog-store");
const { imageForProduct, skuForProduct } = require("./data/product-images");
const { adminRouter } = require("./routes/admin");

const catalog = loadCatalog();
let orders = loadOrders();
let expenses = loadExpenses();

const app = express();
const PORT = process.env.PORT || 3000;

const wishlist = new Set();
const cart = new Map();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function enrichProduct(product) {
  const category = categories.find((item) => item.id === product.categoryId);
  const image = product.image || imageForProduct(product);
  return {
    ...product,
    sku: product.sku || skuForProduct(product),
    image,
    imageThumb: image,
    formattedPrice: formatPrice(product.price),
    categoryName: category ? category.name : product.categoryId,
    categoryColor: category ? category.color : "#495057",
    categoryIcon: category ? category.icon : "🛒",
    categoryGroup: category ? category.group : "",
  };
}

function getAppInfo() {
  return catalog.settings;
}

function getSlides() {
  return catalog.slides;
}

function getProducts() {
  return catalog.products;
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", brand: getAppInfo().brandName });
});

app.get("/api/app-info", (_req, res) => {
  res.json(getAppInfo());
});

app.get("/api/slides", (_req, res) => {
  res.json(getSlides());
});

app.get("/api/categories", (_req, res) => {
  res.json(
    categories.map((category) => ({
      ...category,
      productCount: getProducts().filter((product) => product.categoryId === category.id).length,
    }))
  );
});

app.get("/api/products", (req, res) => {
  const { category, featured, search, series } = req.query;
  let results = [...getProducts()];

  if (category) {
    results = results.filter((product) => product.categoryId === category);
  }

  if (series) {
    results = results.filter(
      (product) => product.series.toLowerCase() === String(series).toLowerCase()
    );
  }

  if (search) {
    const query = String(search).toLowerCase();
    results = results.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.series.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }

  if (featured === "true") {
    results = getAppInfo().recommendedProductIds
      .map((id) => getProducts().find((product) => product.id === id))
      .filter(Boolean);
  }

  res.json(results.map(enrichProduct));
});

app.get("/api/products/:id", (req, res) => {
  const product = getProducts().find((item) => item.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(enrichProduct(product));
});

app.get("/api/wishlist", (_req, res) => {
  res.json(
    [...wishlist]
      .map((id) => getProducts().find((product) => product.id === id))
      .filter(Boolean)
      .map(enrichProduct)
  );
});

app.post("/api/wishlist/:id", (req, res) => {
  const product = getProducts().find((item) => item.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  wishlist.add(product.id);
  res.status(201).json({ added: product.id });
});

app.delete("/api/wishlist/:id", (req, res) => {
  wishlist.delete(req.params.id);
  res.json({ removed: req.params.id });
});

app.get("/api/cart", (_req, res) => {
  const items = [...cart.entries()]
    .map(([id, quantity]) => {
      const product = getProducts().find((item) => item.id === id);
      return product ? { ...enrichProduct(product), quantity } : null;
    })
    .filter(Boolean);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ items, total, formattedTotal: formatPrice(total) });
});

app.post("/api/cart/:id", (req, res) => {
  const product = getProducts().find((item) => item.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const quantity = Math.max(1, Number(req.body.quantity) || 1);
  cart.set(product.id, (cart.get(product.id) || 0) + quantity);
  res.status(201).json({ productId: product.id, quantity: cart.get(product.id) });
});

app.post("/api/checkout", (req, res) => {
  const items = [...cart.entries()]
    .map(([id, quantity]) => {
      const product = getProducts().find((item) => item.id === id);
      return product ? { ...enrichProduct(product), quantity } : null;
    })
    .filter(Boolean);

  if (!items.length) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = {
    id: `ord-${Date.now()}`,
    customerName: req.body.customerName || "Guest",
    customerPhone: req.body.customerPhone || "",
    customerEmail: req.body.customerEmail || "",
    items,
    total,
    formattedTotal: formatPrice(total),
    status: "placed",
    paymentStatus: "pending",
    paymentMethod: "upi_qr",
    createdAt: new Date().toISOString(),
    deliveredAt: null,
  };

  orders.unshift(order);
  saveOrders(orders);
  cart.clear();

  res.status(201).json({
    order,
    upi: getAppInfo().upi,
  });
});

app.get("/api/orders", (req, res) => {
  const phone = req.query.phone;
  const results = phone
    ? orders.filter((order) => order.customerPhone === phone)
    : orders;
  res.json(results);
});

app.use(
  "/api/admin",
  adminRouter({
    catalog,
    saveCatalog,
    orders,
    saveOrders: (nextOrders) => {
      orders = nextOrders;
      saveOrders(orders);
    },
    expenses,
    saveExpenses: (nextExpenses) => {
      expenses = nextExpenses;
      saveExpenses(expenses);
    },
    enrichProduct,
    formatPrice,
  })
);

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`${getAppInfo().brandName} listening on http://0.0.0.0:${PORT}`);
  });
}

module.exports = app;
