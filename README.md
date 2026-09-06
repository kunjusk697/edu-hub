# Le Mam / Le Kitchen Master

Modern & stylish kitchenware and cutlery e-commerce storefront with admin panel.

## Catalog (Le Mam brochure)

- **Cookware** — Tri-Ply Aura Series, Marvel Non-Stick, Granite Tawas, Kadai, Fry Pans, Puttu Makers
- **Appliances** — Electric Kettles, Gas Stoves, Push Choppers, Hand Choppers
- **Thermoware** — Belly, Pearl, and Marvel insulated casseroles
- **Kitchen Tools & Cutlery** — Whisks, strainers, lemon squeezers, lunch boxes, scissors

> There is no “Dising” product line — that referred to the Foodies-style **design model** used for the mobile UI.

Each brochure line item is stored as its own inventory row with a unique `id`, `sku`, `name`, `categoryId`, `image`, and MRP `price` (98 products). Re-sync from seed data with `POST /api/admin/catalog/sync` (admin token required), or run `python3 scripts/extract-catalog-images.py` to regenerate per-product images from the catalog composite.

## Development

```bash
npm ci
npm run dev
```

- Storefront: http://localhost:3000
- Admin panel: http://localhost:3000/admin.html

## Admin panel

Token (demo): `lemam-admin-demo` or set `LKM_ADMIN_TOKEN` in the environment.

| Feature | Description |
| --- | --- |
| Products | Add products with photos/MRP, update prices |
| Home banners | Edit slideshow offers on the home page |
| Orders | Mark delivery status and verify UPI payments |
| Accounts | Daily sales, expenses, profit/loss report |
| UPI QR | Configure GPay / PhonePe / Paytm QR image and UPI ID |

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on port 3000 |
| `npm test` | Run API tests |
| `npm run android:setup` | Install Android SDK (first-time build machines) |
| `npm run build:apk` | Build debug APK to `dist/le-mam-debug.apk` |

## Android APK

The storefront ships as a Capacitor Android app (`in.lkjriyasm.lemam`).

```bash
npm run android:setup   # once, installs Android SDK
npm run build:apk       # outputs dist/le-mam-debug.apk
```

**Using the APK**

1. Run the Le Mam API on a server reachable from the phone (`npm run dev` on your LAN, or deploy to a host).
2. Install `dist/le-mam-debug.apk` on the device (enable “Install unknown apps” if needed).
3. Open **Profile → Store server (APK)** and save your API URL, e.g. `http://192.168.1.10:3000` (use your PC’s LAN IP, not `localhost`).
4. The app reloads and loads catalog, cart, checkout, and UPI from that server.

Optional: bake in a default API URL at build time:

```bash
LE_MAM_API_URL=http://192.168.1.10:3000 npm run build:apk
```

## Contact

- Email: info@lkjkdkdjm.in
- Phone: +91 9947169697
- Website: www.lkjriyasm.in
