# UXT.com — furniture for considered living

A responsive luxury furniture website concept built with React, TypeScript, Vite and lightweight custom CSS. It includes an editorial homepage, a small searchable catalog, collections, product details, an about page, a journal, a wishlist and a shopping bag.

## Run locally

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. To check the production build:

```bash
npm run build
npm run preview
```

Client-side routes are configured to fall back to `index.html` on Vercel (`vercel.json`).

## Demo boundaries

- The eight products, options, specifications and prices are illustrative; they are not commercial offers.
- The ten images in `public/images` are AI-generated editorial scenes, not exact photographs of the sample products. The same ten images are reused throughout the site.
- The cart and wishlist are saved in the current browser's local storage. There is no inventory, account system, backend or real order processing.
- Checkout collects no payment information. A payment provider would be required for real transactions.
- The newsletter validates the input but does not transmit or save email addresses. Contact and social channels are not connected.

Catalog data and collection/category definitions are centralized in `src/data/catalog.ts`; journal content is in `src/data/journal.ts`.
