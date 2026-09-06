const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");

const app = require("../src/server");

const ADMIN_TOKEN = "lemam-admin-demo";

function request(method, url, body, headers = {}) {
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
          headers: {
            ...(body
              ? {
                  "Content-Type": "application/json",
                  "Content-Length": Buffer.byteLength(payload),
                }
              : {}),
            ...headers,
          },
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

describe("Le Mam storefront API", () => {
  it("returns health status", async () => {
    const response = await request("GET", "/api/health");
    assert.equal(response.status, 200);
    assert.equal(response.body.brand, "Le Mam");
  });

  it("returns Le Mam contact info", async () => {
    const response = await request("GET", "/api/app-info");
    assert.equal(response.status, 200);
    assert.equal(response.body.contact.email, "info@lkjkdkdjm.in");
    assert.equal(response.body.upi.upiId, "lemam@upi");
  });

  it("lists homepage slideshow slides", async () => {
    const response = await request("GET", "/api/slides");
    assert.equal(response.status, 200);
    assert.ok(response.body.length >= 3);
  });

  it("creates checkout order with UPI details", async () => {
    await request("POST", "/api/cart/chop-magic-650", { quantity: 1 });
    const response = await request("POST", "/api/checkout", {
      customerPhone: "+91 9947169697",
      customerEmail: "info@lkjkdkdjm.in",
    });

    assert.equal(response.status, 201);
    assert.equal(response.body.order.paymentMethod, "upi_qr");
    assert.ok(response.body.upi.qrImage);
  });
});

describe("Le Mam admin API", () => {
  it("rejects missing admin token", async () => {
    const response = await request("GET", "/api/admin/dashboard");
    assert.equal(response.status, 401);
  });

  it("returns dashboard metrics", async () => {
    const response = await request("GET", "/api/admin/dashboard", null, {
      "x-admin-token": ADMIN_TOKEN,
    });
    assert.equal(response.status, 200);
    assert.ok(response.body.productCount > 0);
  });

  it("updates product price", async () => {
    const response = await request(
      "PUT",
      "/api/admin/products/chop-magic-650",
      { price: 699 },
      { "x-admin-token": ADMIN_TOKEN }
    );
    assert.equal(response.status, 200);
    assert.equal(response.body.price, 699);
  });
});
