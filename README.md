# Ashanti Naturals

A premium human hair wig e-commerce storefront built with Next.js.

## Features

- **Storefront** — Browse and shop for premium human hair wigs
- **Admin Dashboard** — Add, edit, and delete products without touching code
- **Google Sign-In** — Authenticate with Google via NextAuth.js
- **Stripe Payments** — Secure checkout powered by Stripe
- **Image Uploads** — Upload product images directly from the admin panel
- **Shopping Cart** — Client-side cart with persistent local storage
- **Responsive Design** — Looks great on desktop and mobile

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4** for styling
- **Prisma** with SQLite for database
- **NextAuth.js v5** for authentication
- **Stripe** for payment processing

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

You'll need:
- **Google OAuth credentials** from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- **Stripe API keys** from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
- **AUTH_SECRET** — generate with `openssl rand -base64 32`

### 3. Set up the database

```bash
npx prisma migrate dev
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

To make a user an admin (so they can manage products):

1. Sign in with Google
2. Open the SQLite database and update the user's role:

```bash
npx prisma studio
```

Find your user in the `User` table and change the `role` from `customer` to `admin`.

Alternatively, run:

```bash
npx prisma db execute --stdin <<< "UPDATE User SET role = 'admin' WHERE email = 'your-email@gmail.com';"
```

## Managing Products

Once you have admin access:

1. Click **Admin** in the navigation bar
2. Click **+ Add New Product** to add a wig
3. Fill in the details (name, description, price, category, etc.)
4. Upload a product image
5. Click **Add Product**

You can edit or delete products at any time from the admin dashboard.

## Deployment

This app can be deployed to Vercel, Railway, or any Node.js hosting provider. When deploying to production:

1. Switch the database from SQLite to PostgreSQL (update `prisma/schema.prisma` and `DATABASE_URL`)
2. Set all environment variables in your hosting provider
3. Run `npx prisma migrate deploy` after deployment
