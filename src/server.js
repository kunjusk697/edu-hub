const express = require("express");
const path = require("path");

const appInfo = require("./data/app-info");
const categories = require("./data/categories");
const products = require("./data/products");
const { imageForProduct, skuForProduct } = require("./data/product-images");

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
  const image = imageForProduct(product);
  return {
    ...product,
    sku: skuForProduct(product),
    image,
    imageThumb: image,
    formattedPrice: formatPrice(product.price),
    categoryName: category ? category.name : product.categoryId,
    categoryColor: category ? category.color : "#495057",
    categoryIcon: category ? category.icon : "🛒",
  };
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", brand: appInfo.brandName });
});

app.get("/api/app-info", (_req, res) => {
  res.json(appInfo);
});

app.get("/api/categories", (_req, res) => {
  res.json(
    categories.map((category) => ({
      ...category,
      productCount: products.filter((product) => product.categoryId === category.id).length,
    }))
  );
});

app.get("/api/products", (req, res) => {
  const { category, featured, search, series } = req.query;
  let results = [...products];

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
    results = appInfo.recommendedProductIds
      .map((id) => products.find((product) => product.id === id))
      .filter(Boolean);
  }

  res.json(results.map(enrichProduct));
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((item) => item.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(enrichProduct(product));
});

app.get("/api/wishlist", (_req, res) => {
  res.json(
    [...wishlist]
      .map((id) => products.find((product) => product.id === id))
      .filter(Boolean)
      .map(enrichProduct)
  );
});

app.post("/api/wishlist/:id", (req, res) => {
  const product = products.find((item) => item.id === req.params.id);
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
  const items = [...cart.entries()].map(([id, quantity]) => {
    const product = products.find((item) => item.id === id);
    return product ? { ...enrichProduct(product), quantity } : null;
  }).filter(Boolean);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ items, total, formattedTotal: formatPrice(total) });
});

app.post("/api/cart/:id", (req, res) => {
  const product = products.find((item) => item.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const quantity = Math.max(1, Number(req.body.quantity) || 1);
  cart.set(product.id, (cart.get(product.id) || 0) + quantity);
  res.status(201).json({ productId: product.id, quantity: cart.get(product.id) });
});

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`${appInfo.brandName} listening on http://0.0.0.0:${PORT}`);
  });
}

module.exports = app;
