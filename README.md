# Le Kitchen Master

Modern & stylish kitchenware and cutlery e-commerce storefront.

**Tagline:** Health is homemade

## Development

```bash
npm ci
npm run dev
```

Open http://localhost:3000 for the storefront UI.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on port 3000 |
| `npm test` | Run API tests |

## Content architecture

- **Home:** promotional banner, category shortcuts, recommended products
- **Categories:** sidebar navigation across appliances, bakeware, cookware, dinnerware, kitchen tools, storage, bottles, and more
- **Profile:** guest cart, wishlist, orders, and editable contact/shipping fields

## API

- `GET /api/app-info` — brand, tagline, and contact details
- `GET /api/categories` — product categories with counts
- `GET /api/products` — catalog with optional `category`, `featured`, `search`, and `series` filters
- `GET /api/cart` / `POST /api/cart/:id` — demo cart
- `GET /api/wishlist` / `POST /api/wishlist/:id` — demo wishlist

## Contact

- Email: info@lkjnnm.in
- Phone: +91 9947160697
- Website: www.lkjriyasm.in
