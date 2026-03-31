<script setup>
import ProductFilters from './components/ProductFilters.vue';
import ProductForm from './components/ProductForm.vue';
import ProductTable from './components/ProductTable.vue';
</script>

<template>
  <div class="app-container">
    <h1>Product Inventory Dashboard</h1>
    <ProductForm />
    <ProductFilters />
    <ProductTable />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: system-ui, -apple-system, sans-serif;
}

h1 {
  margin-bottom: 24px;
  color: #1a1a1a;
}
</style>

<style scoped></style>
