const categories = require("./categories");

const seriesFallback = {
  "Aura Series": "/images/products/fallback-aura.jpg",
  "Marvel Series": "/images/products/fallback-marvel.jpg",
  "Pressure Cooker": "/images/products/fallback-pressure-cooker.jpg",
  "Gas Stove": "/images/products/fallback-appliance.jpg",
  Thermoware: "/images/products/fallback-thermoware.jpg",
  "Kitchen Tools": "/images/products/fallback-tools.jpg",
  "Chop Magic": "/images/products/fallback-tools.jpg",
  "Electric Kettle": "/images/products/fallback-appliance.jpg",
  "Vacuum Flask": "/images/products/fallback-bottle.jpg",
  Dinnerware: "/images/products/fallback-dinnerware.jpg",
};

function imageForProduct(product) {
  if (product.image) {
    return product.image;
  }
  return seriesFallback[product.series] || "/images/products/fallback-default.jpg";
}

function skuForProduct(product) {
  if (product.sku) {
    return product.sku;
  }
  return product.id.toUpperCase().replace(/-/g, " ");
}

function categoryIconForProduct(product) {
  const category = categories.find((item) => item.id === product.categoryId);
  return category ? category.icon : "🛒";
}

module.exports = {
  seriesFallback,
  imageForProduct,
  skuForProduct,
  categoryIconForProduct,
};
