<script setup>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import ToastContainer from './components/ToastContainer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <main class="flex-1">
      <router-view />
    </main>

    <Footer />
    <ToastContainer />
  </div>
</template>

<style>
/* kept intentionally global so Tailwind utilities can apply */
</style>
