# Ashanti Naturals

A premium human hair wig e-commerce storefront built with Next.js.

## Features

- **Storefront** — Browse and shop for premium human hair wigs
- **Shop by Method** — Interactive section to browse by installation method (Sew-In, Tape-In, Clip-In, Glueless Wig, Lace Front, Full Lace)
- **Find Your Texture Match** — Interactive quiz that recommends products based on selected hair texture
- **Product Listing Page** — Filterable, sortable product grid with sidebar filters (texture, method, category, length, color, price range)
- **Product Detail Page** — Image gallery with zoom, variant selectors, tabbed content (description, care, shipping), and related products
- **Slide-Out Cart** — Cart drawer with quantity controls, item removal, and order summary
- **Admin Dashboard** — Add, edit, and delete products without touching code
- **Google Sign-In** — Authenticate with Google via NextAuth.js
- **Stripe Payments** — Secure checkout powered by Stripe
- **Image Uploads** — Upload product images directly from the admin panel
- **Customer Reviews** — Rotating testimonials carousel with star ratings
- **Newsletter Signup** — Email subscription section with validation
- **Responsive Design** — Fully responsive across mobile, tablet, and desktop

## Screenshots

### Homepage — Hero & Navigation

Sticky header with mega menu navigation, search bar, and cart icon. Hero banner with CTAs for "Shop Bestsellers" and "Find Your Texture."

![Homepage Hero](https://github.com/user-attachments/assets/df84a634-c942-4e82-af24-4e086b9f276d)

### Homepage — Shop by Method

Interactive method cards (Sew-In, Tape-In, Clip-In, Glueless Wig, Lace Front, Full Lace) with hover effects, linking to filtered shop views.

![Shop by Method](https://github.com/user-attachments/assets/370ffca7-29a1-4fc4-abf7-139c3c405b5a)

### Homepage — Find Your Texture Match & Reviews

Interactive texture selector that fetches and displays matching products. Customer testimonials carousel with star ratings.

![Texture Match & Reviews](https://github.com/user-attachments/assets/4b88541b-5f25-499f-92f0-5786afd62deb)

### Homepage — Customer Reviews

Rotating reviews carousel featuring real customer testimonials with star ratings and product references.

![Customer Reviews](https://github.com/user-attachments/assets/3d9852ae-5d7c-425b-9fad-fe5ccfc85841)

### Homepage — Newsletter & Footer

Newsletter signup section and enhanced 4-column footer with social links, quick links, customer service links, and payment badges.

![Newsletter & Footer](https://github.com/user-attachments/assets/53776e49-74b3-4fb2-884c-49f786ae48d6)

### Shop Page (Product Listing)

Full product grid with filter sidebar (texture, method, category, length, color, price range), sort options, pagination, and product count.

![Shop Page](https://github.com/user-attachments/assets/3ac160fa-ae47-40b9-92c1-2b21ff40876e)

### Product Detail Page

Product image with zoom, variant selectors (length, color, quantity), add to cart, tabbed content (Description, Care Instructions, Shipping Info), and related products.

![Product Detail](https://github.com/user-attachments/assets/f8b054f6-049c-4f95-8b5f-340dc7985ce2)

### About Us Page

Brand story, mission statement, and core values (Premium Quality, Inclusivity, Afrocentric Beauty).

![About Page](https://github.com/user-attachments/assets/28f10864-6229-4932-86a4-35807c976794)

### FAQ Page

Expandable accordion FAQ organized by category (Ordering, Shipping, Returns, Hair Care) with category filter tabs.

![FAQ Page](https://github.com/user-attachments/assets/e37b887d-799e-4aa7-b518-113a4a3a37ee)

### Homepage — Full Page Overview

Full-length view of the homepage showing all sections from hero to footer.

![Homepage Full](https://github.com/user-attachments/assets/664692a2-c9ca-40b6-95b2-e1623d5cb3fb)

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
