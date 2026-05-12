# Burn Notice Co — Website

A Next.js (App Router) site for showcasing engraving work and taking orders, with a small SQLite-backed API for incoming submissions.

---

## What you're looking at

- **`app/`** — Next.js App Router. Each folder under here is a route; `page.js` is the page; `api/*/route.js` files are the API endpoints.
- **`components/`** — React components shared across pages (Header, Footer, CartDrawer, forms).
- **`lib/`** — Shared utilities (SQLite helper, products data, admin auth).
- **`orders.db`** — SQLite database file. Auto-created the first time an order comes in.

---

## File map

```
Burn Notice Co/
├── app/
│   ├── layout.js               Root layout (header, footer, cart drawer)
│   ├── page.js                 Home
│   ├── shop/page.js            Shop + checkout
│   ├── gallery/page.js         Gallery
│   ├── custom/page.js          Custom order form
│   ├── about/page.js           About + contact form
│   ├── admin/page.js           Admin orders dashboard
│   ├── globals.css             All site styling
│   └── api/
│       ├── order/route.js          POST /api/order
│       ├── orders/route.js         GET  /api/orders (admin)
│       └── admin/
│           ├── login/route.js      POST /api/admin/login
│           └── logout/route.js     POST /api/admin/logout
├── components/                 React components
├── lib/                        DB + auth + product data
├── package.json
├── next.config.mjs
├── jsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

---

## How to run it on your computer

### One-time setup

1. **Install Node.js 18.17+** from https://nodejs.org (the "LTS" version is fine).
2. From this folder, install dependencies:
   ```bash
   npm install
   ```
3. Copy the env template and pick an admin password:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and change `ADMIN_PASSWORD`.

### Every time after that

```bash
npm run dev
```

Open `http://localhost:3000`. Admin lives at `http://localhost:3000/admin`.

To build for production:

```bash
npm run build
npm start
```

---

## How to test it works

1. `npm run dev`
2. Open http://localhost:3000 — the home page should load with wood-grain styling.
3. Go to **Shop**, add a product, fill in the checkout form, hit **Place Order**. You should see a green confirmation.
4. Open `http://localhost:3000/admin` in another tab. Type your admin password. The order should be in the dashboard.

---

## How to customize

### Change the colors

Open `app/globals.css`. The `:root` block at the top has all the color variables:

```css
--walnut:    #3E2723;
--ember:     #C8501A;
--parchment: #F5E6D3;
```

### Add a new product

Open `lib/products.js` and add a new entry to the `PRODUCTS` array. Every product needs a unique `id`.

### Add real photos

1. Drop images into `public/images/` (create the folder if needed).
2. Reference them with `<img src="/images/yourfile.jpg" />` inside a `.card-image` div.

### Rewrite the About story

Open `app/about/page.js` and edit the paragraphs in the `.story` block.

---

## What's not built yet

- **Real payments** — currently a "request a quote" flow. Wire up Stripe Checkout when you're ready.
- **Email notifications** — orders only show in the admin dashboard. Resend or SendGrid is the easy path.
- **Deployment** — Vercel is the natural home for a Next.js app (free tier, one-click). Railway/Render also work.
