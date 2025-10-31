<template>
  <div class="fixed top-4 right-4 z-50 space-y-2" aria-live="polite" aria-atomic="true">
    <div v-for="t in toasts" :key="t.id" :class="['px-4 py-3 rounded-lg shadow-lg text-white transition-all transform', t.type === 'success' ? 'bg-green-500' : 'bg-red-500']">
      {{ t.message }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useToast } from '../composables/useToast'

// reference the reactive toast object (do not destructure toasts)
const toast = useToast()
const toasts = computed(() => toast.toasts)
</script>
