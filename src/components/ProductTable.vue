<script setup>
import { useProductsStore } from '../stores/products';
import { onMounted, ref } from 'vue';

const store = useProductsStore();

const editingId = ref(null)
const editingStock = ref(0)

function startEditing(product) {
  editingId.value = product.id
  editingStock.value = product.stock
}

function saveEditing() {
  if (editingStock.value < 0) return
  store.updateStock(editingId.value, editingStock.value)
  editingId.value = null
}

onMounted(() => {
  store.loadInitialProducts();
});
</script>

<template>
    <div v-if="store.isLoading">
        <p>Loading products...</p>
    </div>
    <div v-else-if="store.error">
        <p style="color: red;">{{ store.error }}</p>
    </div>
    <div v-else-if="store.filteredProducts.length === 0">
        <p>No products available.</p>
    </div>
    <table v-else>
        <thead>
            <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in store.filteredProducts" :key="product.id" :style="product.stock <= 5 ? { backgroundColor: '#ffe0e0' } : {}">
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>${{ product.price.toFixed(2) }}</td>
                <td>
                    <span v-if="editingId !== product.id" @click="startEditing(product)" style="cursor: pointer; text-decoration: underline;">
                        {{ product.stock }}
                    </span>
                    <span v-else>
                        <input
                        v-model.number="editingStock"
                        type="number"
                        min="0"
                        @keyup.enter="saveEditing"
                        style="width: 60px;"
                        />
                        <button @click="saveEditing">✓</button>
                        <button @click="editingId = null">✗</button>
                    </span>
                </td>
                <td>
                    <button @click="store.removeProduct(product.id)">Remove</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

th, td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f5f5f5;
  font-weight: 600;
}

tr:hover {
  background-color: #f9f9f9;
}

button {
  padding: 4px 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
}

button:hover {
  background: #eee;
}
</style>