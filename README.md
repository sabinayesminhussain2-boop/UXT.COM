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

## Deploy on Vercel

Import this repository and deploy a branch that contains the website files (including `package.json`, `src/`, and `vercel.json`). The repository root is the project root. `vercel.json` explicitly selects the Vite framework, runs `npm run build`, serves the `dist` directory, and sends client-side routes back to `index.html`.

If a deployment returns Vercel's `404: NOT_FOUND`, check **Deployments** to make sure its Git branch and commit contain the website. In **Settings → Git**, confirm the production branch points to that branch; then redeploy the latest commit. The original `main` branch may contain only the initial README until the website branch is merged.

## Demo boundaries

- The eight products, options, specifications and prices are illustrative; they are not commercial offers.
- The ten images in `public/images` are AI-generated editorial scenes, not exact photographs of the sample products. The same ten images are reused throughout the site.
- The cart and wishlist are saved in the current browser's local storage. There is no inventory, account system, backend or real order processing.
- Checkout collects no payment information. A payment provider would be required for real transactions.
- The newsletter validates the input but does not transmit or save email addresses. Contact and social channels are not connected.

Catalog data and collection/category definitions are centralized in `src/data/catalog.ts`; journal content is in `src/data/journal.ts`.
