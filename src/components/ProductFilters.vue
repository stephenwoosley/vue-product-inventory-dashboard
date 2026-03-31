<script setup>
import { useProductsStore } from '@/stores/products'

const store = useProductsStore()
</script>

<template>
  <div>
    <h2>Filters</h2>

    <div>
      <label>Search</label>
      <input v-model="store.searchQuery" type="text" placeholder="Search by name..." />
    </div>

    <div>
      <label>Category</label>
      <select v-model="store.selectedCategory">
        <option value="All">All</option>
        <option>Equipment</option>
        <option>Clothing</option>
        <option>Accessories</option>
        <option>Collectibles</option>
      </select>
    </div>

    <div>
      <label>
        <input v-model="store.inStockOnly" type="checkbox" />
        In stock only
      </label>
    </div>

    <div>
      <label>Sort by price</label>
      <select v-model="store.sortOrder">
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin-top: 0;
  margin-bottom: 12px;
}

div > div {
  display: inline-block;
  margin-right: 16px;
  margin-bottom: 8px;
}

label {
  font-weight: 500;
  margin-right: 4px;
}

input[type="text"], select {
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>