const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");

const app = require("../src/server");

function request(method, url, body) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      const payload = body ? JSON.stringify(body) : null;

      const req = http.request(
        {
          hostname: "127.0.0.1",
          port,
          path: url,
          method,
          headers: body
            ? {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(payload),
              }
            : undefined,
        },
        (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            server.close();
            resolve({
              status: res.statusCode,
              body: data ? JSON.parse(data) : null,
            });
          });
        }
      );

      req.on("error", (error) => {
        server.close();
        reject(error);
      });

      if (payload) {
        req.write(payload);
      }

      req.end();
    });
  });
}

describe("Le Kitchen Master API", () => {
  it("returns health status", async () => {
    const response = await request("GET", "/api/health");
    assert.equal(response.status, 200);
    assert.equal(response.body.status, "ok");
    assert.equal(response.body.brand, "Le Kitchen Master");
  });

  it("returns app branding and contact info", async () => {
    const response = await request("GET", "/api/app-info");
    assert.equal(response.status, 200);
    assert.equal(response.body.contact.email, "info@lkjnnm.in");
    assert.equal(response.body.contact.phone, "+91 9947160697");
  });

  it("lists catalog categories", async () => {
    const response = await request("GET", "/api/categories");
    assert.equal(response.status, 200);
    assert.ok(response.body.some((category) => category.id === "cookware"));
    assert.ok(response.body.some((category) => category.id === "appliances"));
  });

  it("lists featured products", async () => {
    const response = await request("GET", "/api/products?featured=true");
    assert.equal(response.status, 200);
    assert.ok(response.body.length >= 4);
    assert.ok(response.body.some((product) => product.id === "lmek-1-8"));
  });

  it("filters products by category", async () => {
    const response = await request("GET", "/api/products?category=appliances");
    assert.equal(response.status, 200);
    assert.ok(response.body.every((product) => product.categoryId === "appliances"));
  });

  it("returns product with brochure image and sku", async () => {
    const response = await request("GET", "/api/products/aura-kadai-22-glass");
    assert.equal(response.status, 200);
    assert.equal(response.body.sku, "AURA KA 22");
    assert.match(response.body.image, /^\/images\/products\//);
  });

  it("adds products to cart and wishlist", async () => {
    const cartResponse = await request("POST", "/api/cart/chop-magic-650", {
      quantity: 1,
    });
    assert.equal(cartResponse.status, 201);

    const wishlistResponse = await request("POST", "/api/wishlist/aura-kadai-22-glass");
    assert.equal(wishlistResponse.status, 201);

    const cart = await request("GET", "/api/cart");
    assert.equal(cart.body.items.length, 1);

    const wishlist = await request("GET", "/api/wishlist");
    assert.equal(wishlist.body.length, 1);
  });
});
