<script setup>
import { reactive, ref } from 'vue';
import { useProductsStore } from '@/stores/products';

const store = useProductsStore();

const form = reactive({
  name: '',
  category: 'Equipment',
  price: 0,
  stock: 0,
});

const errors = ref([]);

function handleSubmit() {
    errors.value = [];

    if (!form.name.trim()) {
        errors.value.push('Product name is required.');
    }
    if (form.price <= 0) {
        errors.value.push('Price must be greater than zero.');
    }
    if (form.stock < 0) {
        errors.value.push('Stock cannot be negative.');
    }

    if (errors.value.length > 0) {
        return;
    }

    store.addProduct({...form});
    // Reset form
    Object.assign(form, { name: '', category: 'Equipment', price: 0, stock: 0 });
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h2>Add Product</h2>

    <div v-if="errors.length > 0">
      <p v-for="error in errors" :key="error" style="color: red;">{{ error }}</p>
    </div>

    <div>
      <label>Name</label>
      <input v-model="form.name" type="text" placeholder="Product name" />
    </div>

    <div>
      <label>Category</label>
      <select v-model="form.category">
        <option>Equipment</option>
        <option>Clothing</option>
        <option>Accessories</option>
        <option>Collectibles</option>
      </select>
    </div>

    <div>
      <label>Price</label>
      <input v-model.number="form.price" type="number" step="0.01" min="0" />
    </div>

    <div>
      <label>Stock</label>
      <input v-model.number="form.stock" type="number" min="0" />
    </div>

    <button type="submit">Add Product</button>
  </form>
</template>

<style scoped>
form {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

h2 {
  margin-top: 0;
  margin-bottom: 16px;
}

div {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}

input, select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

button {
  padding: 8px 16px;
  background: #4a90d9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: #357abd;
}
</style>