# Le Mam Kitchenware

Cross-platform shopping app for **Le Mam** cookware from Fathish Appliances Pvt. Ltd. (Kolencherry, Ernakulam). Browse the authorised catalog, filter by material and warranty, register coverage, and check out as a guest.

## Run

```bash
npm install
npm run web      # browser preview
npm start        # Expo Go (iOS / Android)
```

## What’s inside

- Home dashboard with featured collections (Tri-Ply Aura, Marvel Granite, gas stoves)
- Explore grid (Cookware, Appliances, Thermoware, Tools) linking into filtered catalog views
- Product cards with Bestseller / Top Pick / warranty / seasonal badges
- Search and filters: material, MRP band, 1- or 5-year warranty, induction/gas/ceramic/dishwasher
- Cart with quantity steppers, free-delivery milestone (₹1,999), guest checkout
- Warranty hub (invoice + serial/model) and care notes
- World of Le Mam: steel-mark story, click-to-call `+91 7356915954`, `info@lemam.in`, [lemam.in](https://www.lemam.in)

Catalog data lives in `data/products.ts` (99 brochure SKUs with list MRPs). Cart, orders, and warranty records persist locally with AsyncStorage. Product photos are cropped from the Le Mam catalog and stored in `assets/products/`.

## Stack

Expo 57 · React Native · Expo Router · TypeScript
