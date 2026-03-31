import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { mockProducts } from "../data/mockProducts";

export const useProductsStore = defineStore("products", () => {

  // Product data

  const products = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Filtering

  const selectedCategory = ref("All");
  const searchQuery = ref("");
  const inStockOnly = ref(false);
  const sortOrder = ref("asc");

  const filteredProducts = computed(() => {
    let result = products.value;
    if (selectedCategory.value !== "All") {
      result = result.filter(product => product.category === selectedCategory.value);
    }
    if (searchQuery.value) {
      result = result.filter(product => product.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
    }
    if (inStockOnly.value) {
      result = result.filter(product => product.stock > 0);
    }
    return [...result].sort((a, b) => sortOrder.value === "asc" ? a.price - b.price : b.price - a.price);
  });

  // Actions

  async function loadInitialProducts() {
    isLoading.value = true
    error.value = null
    try {
      const saved = localStorage.getItem('products')
      if (saved) {
        products.value = JSON.parse(saved)
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000))
        products.value = mockProducts
      }
    } catch (err) {
      error.value = 'Failed to load products'
      console.error('Failed to load products:', err)
    } finally {
      isLoading.value = false
    }
  }

  function addProduct(product) {
    products.value.push({ ...product, id: Date.now() });
  }

  function removeProduct(productId) {
    products.value = products.value.filter(product => product.id !== productId);
  } 

  function updateStock(productId, newStock) {
    const product = products.value.find(p => p.id === productId);
    if (product) {
      product.stock = newStock;
    }
  }

  watch(products, (newProducts) => {
    localStorage.setItem('products', JSON.stringify(newProducts))
  }, { deep: true })

  return {
    products,
    isLoading,
    selectedCategory,
    searchQuery,
    inStockOnly,
    sortOrder,
    filteredProducts,
    loadInitialProducts,
    addProduct,
    removeProduct,
    updateStock,
    error,
  };

});