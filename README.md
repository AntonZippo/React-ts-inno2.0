Product catalog 2.0

<img width="362" height="124" alt="SPA-2 0" src="https://github.com/user-attachments/assets/68a2a28e-b48c-43a5-a78c-c35da3c042f9" />

[![Deployed with Vercel](https://img.shields.io/badge/deployed%20with-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://spa-react-98.vercel.app/home) - link to App.

A single-page React application that presents a product catalog backed by the public [DummyJSON](https://dummyjson.com/) REST API.
Users can browse with category filters, price and rating filters (client-side), search products, open product detail pages, add products to cart.
Also for logged user chat route will open, where you can find websocket echo chat.

## Features

- **Category filtering** — Categories are fetched from API using TanStack Query, server-side filtering by category.
- **Search** — Full-text search against DummyJSON API (triggered by submit button), clears when category changes.
- **Price & Rating filters** — Applied client-side on the currently loaded page (API does not support these filters).
- **Pagination** — Server-side pagination with `limit` and `skip` parameters.
- **Product page** — Fetches a single product by id from DummyJSON.
- **Cart** — Global state via React Context with `localStorage` persistence, add/remove/clear functionality.
- **Authentication (mock)** — Simple login form (`admin`/`123`) with Context API, protected route concept.
- **WebSocket Chat** — Real-time echo chat via `wss://ws.ifelse.io` with connection status and message history.
- **Dark / Light theme** — Toggleable theme with Tailwind CSS dark mode.
- **Routing** — TanStack Router for home (`/home`), login (`/login`), cart (`/cart`), product (`/product/:id`), chat (`/chat`), and a catch-all 404 page.
- **Responsive design** — Mobile-first layout using Tailwind CSS.
- **State management** — TanStack Query for server state; React Context for cart, auth.


### Runtime (`dependencies`)

| Package                 | Purpose                                                |
| ----------------------- | ------------------------------------------------------ |
| `react`                 | UI library                                             |
| `react-dom`             | DOM rendering                                          |
| `@tanstack/react-query` | Server-state management (caching, fetching, mutations) |
| `@tanstack/react-router`| Type-safe routing                                      |
| `recharts`              | Charts library for analytics/dashboard                 |
| `tailwindcss`           | Utility-first CSS framework                            |
| `@tailwindcss/vite`     | Tailwind CSS integration for Vite                      |

## Development (`devDependencies`)

| Package                                                                 | Purpose                                                              |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `vite`                                                                  | Build tool and development server with fast HMR                      |
| `@vitejs/plugin-react`                                                  | React support for Vite (JSX, Fast Refresh)                           |
| `typescript`                                                            | TypeScript compiler and type checking                                |
| `@types/react`, `@types/react-dom`                                      | TypeScript type definitions for React                                |
| `@types/node`                                                           | TypeScript type definitions for Node.js                              |
| `eslint`                                                                | Code linting and static analysis                                     |
| `@eslint/js`                                                            | ESLint core configuration preset                                     |
| `globals`                                                               | ESLint globals (browser, Node.js)                                    |
| `typescript-eslint`                                                     | ESLint integration for TypeScript                                    |
| `eslint-plugin-react-hooks`                                             | ESLint rules for React Hooks                                         |
| `eslint-plugin-react-refresh`                                           | ESLint rules for React Fast Refresh                                  |
| `@babel/core`                                                           | JavaScript transpiler core (for React Compiler)                      |
| `babel-plugin-react-compiler`                                           | Experimental React Compiler (optimization)                           |
| `@rolldown/plugin-babel`                                                | Babel plugin for Rolldown bundler                                    |
| `@types/babel__core`                                                    | TypeScript type definitions for Babel                                |

Exact versions are pinned in `package.json` after `npm install`.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended) and npm.

### Install

```bash
npm install

### Run in development
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in the browser.

### Production build

```bash
npm run build
```

Output is written to the `dist/assets/` folder (`index-[hash].js` and `index-[hash].css`).
