const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const seedProducts = require("../src/data/products");
const PRODUCT_SKUS = require("../src/data/product-skus");
const { syncIndividualProducts } = require("../src/data/catalog-store");

describe("Le Mam catalog products", () => {
  it("defines one inventory row per brochure SKU", () => {
    assert.equal(seedProducts.length, Object.keys(PRODUCT_SKUS).length);
    assert.equal(new Set(seedProducts.map((product) => product.id)).size, seedProducts.length);
  });

  it("gives every product its own name, sku, category, image, and MRP", () => {
    for (const product of seedProducts) {
      assert.ok(product.id, `missing id for ${product.name}`);
      assert.ok(product.name, `missing name for ${product.id}`);
      assert.ok(product.sku, `missing sku for ${product.id}`);
      assert.ok(product.categoryId, `missing category for ${product.id}`);
      assert.ok(product.image, `missing image for ${product.id}`);
      assert.ok(product.image.endsWith(`${product.id}.jpg`), `image not unique for ${product.id}`);
      assert.ok(Number.isFinite(product.price) && product.price > 0, `invalid MRP for ${product.id}`);
    }
  });

  it("syncs seed products individually instead of as one block", () => {
    const groupedCatalog = {
      products: [
        {
          id: "catalog-block",
          name: "Marvel + Aura brochure dump",
          price: 1,
          categoryId: "cookware",
          series: "Catalog",
          description: "Grouped block that should be replaced",
          features: [],
        },
      ],
      slides: [],
      settings: {},
    };

    const synced = syncIndividualProducts(groupedCatalog);
    assert.equal(synced.products.length, seedProducts.length);
    assert.equal(
      synced.products.some((product) => product.id === "catalog-block"),
      false
    );
    assert.equal(synced.products.find((product) => product.id === "ss-pc-5l-ib").sku, "LMSSPC5IB");
    assert.equal(
      synced.products.find((product) => product.id === "aura-kadai-22-glass").image,
      "/images/products/aura-kadai-22-glass.jpg"
    );
  });
});
