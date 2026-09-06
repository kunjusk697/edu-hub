const express = require("express");
const { syncIndividualProducts } = require("../data/catalog-store");

const ADMIN_TOKEN = process.env.LKM_ADMIN_TOKEN || "lemam-admin-demo";

function adminRouter({ catalog, saveCatalog, orders, saveOrders, expenses, saveExpenses, enrichProduct, formatPrice }) {
  const router = express.Router();

  router.use((req, res, next) => {
    const token = req.get("x-admin-token");
    if (token !== ADMIN_TOKEN) {
      return res.status(401).json({ error: "Unauthorized admin request" });
    }
    next();
  });

  router.get("/dashboard", (_req, res) => {
    const delivered = orders.filter((order) => order.status === "delivered");
    const salesTotal = delivered.reduce((sum, order) => sum + order.total, 0);
    const expenseTotal = expenses.reduce((sum, item) => sum + item.amount, 0);

    res.json({
      productCount: catalog.products.length,
      slideCount: catalog.slides.length,
      openOrders: orders.filter((order) => order.status !== "delivered").length,
      deliveredOrders: delivered.length,
      salesTotal,
      expenseTotal,
      profit: salesTotal - expenseTotal,
      formattedSalesTotal: formatPrice(salesTotal),
      formattedExpenseTotal: formatPrice(expenseTotal),
      formattedProfit: formatPrice(salesTotal - expenseTotal),
    });
  });

  router.post("/catalog/sync", (_req, res) => {
    syncIndividualProducts(catalog);
    saveCatalog(catalog);
    res.json({
      productCount: catalog.products.length,
      message: "Catalog synced as individual product entries",
    });
  });

  router.get("/products", (_req, res) => {
    res.json(catalog.products.map(enrichProduct));
  });

  router.post("/products", (req, res) => {
    const { name, price, categoryId, series, description, image, sku, features = [] } = req.body;
    if (!name || !price || !categoryId) {
      return res.status(400).json({ error: "name, price, and categoryId are required" });
    }

    const id = String(req.body.id || name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    if (catalog.products.some((product) => product.id === id)) {
      return res.status(409).json({ error: "Product id already exists" });
    }

    const product = {
      id,
      name: String(name).trim(),
      price: Number(price),
      categoryId,
      series: series || "Le Mam",
      description: description || "",
      features,
      sku: sku || id.toUpperCase(),
      image: image || "/images/products/brochure-full.jpg",
    };

    catalog.products.push(product);
    saveCatalog(catalog);
    res.status(201).json(enrichProduct(product));
  });

  router.put("/products/:id", (req, res) => {
    const index = catalog.products.findIndex((product) => product.id === req.params.id);
    if (index < 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    catalog.products[index] = {
      ...catalog.products[index],
      ...req.body,
      id: catalog.products[index].id,
      price: Number(req.body.price ?? catalog.products[index].price),
    };

    saveCatalog(catalog);
    res.json(enrichProduct(catalog.products[index]));
  });

  router.get("/slides", (_req, res) => {
    res.json(catalog.slides);
  });

  router.put("/slides/:id", (req, res) => {
    const index = catalog.slides.findIndex((slide) => slide.id === req.params.id);
    if (index < 0) {
      return res.status(404).json({ error: "Slide not found" });
    }

    catalog.slides[index] = { ...catalog.slides[index], ...req.body, id: catalog.slides[index].id };
    saveCatalog(catalog);
    res.json(catalog.slides[index]);
  });

  router.get("/settings", (_req, res) => {
    res.json(catalog.settings);
  });

  router.put("/settings", (req, res) => {
    catalog.settings = {
      ...catalog.settings,
      ...req.body,
      contact: { ...catalog.settings.contact, ...(req.body.contact || {}) },
      promotion: { ...catalog.settings.promotion, ...(req.body.promotion || {}) },
      upi: { ...catalog.settings.upi, ...(req.body.upi || {}) },
    };
    saveCatalog(catalog);
    res.json(catalog.settings);
  });

  router.get("/orders", (_req, res) => {
    res.json(orders);
  });

  router.patch("/orders/:id", (req, res) => {
    const order = orders.find((item) => item.id === req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (req.body.status) {
      order.status = req.body.status;
      order.deliveredAt = req.body.status === "delivered" ? new Date().toISOString() : order.deliveredAt;
    }

    if (req.body.paymentStatus) {
      order.paymentStatus = req.body.paymentStatus;
    }

    saveOrders(orders);
    res.json(order);
  });

  router.get("/expenses", (_req, res) => {
    res.json(expenses);
  });

  router.post("/expenses", (req, res) => {
    const { label, amount, date } = req.body;
    if (!label || !amount) {
      return res.status(400).json({ error: "label and amount are required" });
    }

    const entry = {
      id: `exp-${Date.now()}`,
      label: String(label),
      amount: Number(amount),
      date: date || new Date().toISOString().slice(0, 10),
    };

    expenses.push(entry);
    saveExpenses(expenses);
    res.status(201).json(entry);
  });

  router.get("/reports/profit-loss", (_req, res) => {
    const delivered = orders.filter((order) => order.status === "delivered");
    const salesByDay = {};
    delivered.forEach((order) => {
      const day = order.createdAt.slice(0, 10);
      salesByDay[day] = (salesByDay[day] || 0) + order.total;
    });

    const salesTotal = delivered.reduce((sum, order) => sum + order.total, 0);
    const expenseTotal = expenses.reduce((sum, item) => sum + item.amount, 0);

    res.json({
      salesTotal,
      expenseTotal,
      profit: salesTotal - expenseTotal,
      salesByDay,
      expenses,
      deliveredOrders: delivered.length,
    });
  });

  return router;
}

module.exports = { adminRouter, ADMIN_TOKEN };
