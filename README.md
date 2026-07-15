# MERN E-commerce — Frontend (Client)

A responsive React storefront and admin dashboard built with Vite, Redux
Toolkit, React Router, Tailwind CSS, and React Hook Form, following a
feature-based folder structure.

## Tech Stack

- **Build tool:** Vite
- **UI:** React 18, Tailwind CSS
- **State:** Redux Toolkit (one slice per feature)
- **Routing:** React Router v6 (with `PrivateRoute` / `AdminRoute` / `PublicRoute` guards)
- **Forms:** React Hook Form
- **HTTP:** Axios with an interceptor that transparently refreshes expired access tokens
- **Payments:** Stripe.js / React Stripe Elements
- **Notifications:** react-hot-toast
- **Charts:** Recharts (admin dashboard)

## Folder Structure (Feature-based)

```
src/
  app/           # Redux store + typed hooks
  features/      # One folder per domain: auth, products, cart, checkout,
                  # orders, wishlist, reviews, user, search, admin/*
                  # Each feature owns its slice, API calls, components, and pages
  components/    # Shared UI: common/, layout/, errors/
  routes/        # AppRoutes + route guards
  services/      # axiosInstance (with refresh-token interceptor)
  hooks/         # useAuth, useDebounce, useOutsideClick, usePagination
  utils/         # constants, formatters, validators
  styles/        # Tailwind entry stylesheet
```

## Getting Started

```bash
npm install
cp .env.example .env   # fill in VITE_API_BASE_URL and VITE_STRIPE_PUBLISHABLE_KEY
npm run dev
```

The app runs at `http://localhost:5173` and proxies `/api` requests to
`http://localhost:5000` in development (see `vite.config.js`).

## Guest Cart

Anonymous visitors get a `guestId` generated client-side (see
`utils/validators.js#getGuestId`) and stored in `localStorage`. It's sent as
an `x-guest-id` header on every `/cart` request. On login/register, the app
automatically calls `POST /cart/merge` with that guest id to fold the guest
cart into the user's account cart, then clears the local guest id.

## Building for Production

```bash
npm run build      # outputs to dist/
npm run preview    # locally preview the production build
```

See `../docs/DEPLOYMENT_GUIDE.md` for hosting instructions (Vercel/Netlify/S3)
and required environment variables.
