# Product Inventory Dashboard

A single-page product inventory manager built with Vue 3 and Pinia.

**Live demo:** https://vue-product-inventory-dashboard.vercel.app/

## Setup - to run locally

```sh
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

To build for production:

```sh
npm run build
```

## What it does

- Displays a table of products (name, category, price, stock)
- Add new products through a form with validation
- Remove products from inventory
- Edit stock values inline by clicking the number in the table
- Filter by category, search by name, toggle "in stock only"
- Sort by price ascending/descending
- Persists data to localStorage so it survives page refreshes
- Low stock items (≤ 5) are highlighted in red
- Loading, empty, and error states are handled

## Design decisions

**Composition API** Both the store and all components use the setup syntax with `ref()` and `computed()`.

**Single Pinia store** All product data and filter state lives in one store (`src/stores/products.js`). Filter state is in the store rather than in the Filters component because the ProductTable needs to read it too.

**Thin components** Components import the store, bind to its state, and call its actions. Filtering, sorting, and validation logic stays in the store.

**localStorage via `watch`** A watcher on the products array writes to localStorage on any change. On load, the store checks localStorage first and falls back to mock data.

**Mock data in a separate file** `src/data/mockProducts.js` keeps seed data out of the store.

**Inline stock editing** Clicking a stock number swaps it for an input with save/cancel buttons.

## Project structure

```
src/
  App.vue                  — Root layout, imports the three components
  main.js                  — App entry, registers Pinia and Vue Router
  data/
    mockProducts.js        — Seed data (baseball products)
  stores/
    products.js            — Pinia store: state, getter, actions, localStorage
  components/
    ProductTable.vue       — Displays filtered products, inline stock editing
    ProductForm.vue        — Add product form with validation
    ProductFilters.vue     — Search, category, in-stock toggle, sort controls
```
