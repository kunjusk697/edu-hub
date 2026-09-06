const seedProducts = require("./products");
const seedSlides = require("./slides");
const seedAppInfo = require("./app-info");
const { readJson, writeJson } = require("../lib/store");

function defaultSettings() {
  return {
    brandName: "Le Mam",
    tagline: seedAppInfo.tagline,
    subtitle: seedAppInfo.subtitle,
    contact: {
      email: "info@lemam.in",
      phone: "+91 7356915954",
      website: "www.lemam.in",
      address: "Fathish Appliances Pvt. Ltd, Kolencherry, Ernakulam - 682 311",
    },
    promotion: seedAppInfo.promotion,
    recommendedProductIds: seedAppInfo.recommendedProductIds,
    upi: {
      payeeName: "Le Mam Kitchenware",
      upiId: "lemam@upi",
      qrImage: "/images/payments/upi-qr-placeholder.svg",
      note: "Scan to pay via GPay, PhonePe, or Paytm",
    },
  };
}

function loadCatalog() {
  return readJson("catalog.json", {
    products: seedProducts,
    slides: seedSlides,
    settings: defaultSettings(),
  });
}

function saveCatalog(catalog) {
  writeJson("catalog.json", catalog);
}

function loadOrders() {
  return readJson("orders.json", []);
}

function saveOrders(orders) {
  writeJson("orders.json", orders);
}

function loadExpenses() {
  return readJson("expenses.json", []);
}

function saveExpenses(expenses) {
  writeJson("expenses.json", expenses);
}

module.exports = {
  defaultSettings,
  loadCatalog,
  saveCatalog,
  loadOrders,
  saveOrders,
  loadExpenses,
  saveExpenses,
};
