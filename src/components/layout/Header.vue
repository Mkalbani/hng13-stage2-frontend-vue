<template>
  <header class="bg-white shadow-sm sticky top-0 z-40">
    <Container>
      <div class="flex items-center justify-between h-16">
        <button @click="goHome" class="text-2xl font-bold text-blue-600">
          TicketFlow
        </button>

        <div v-if="user" class="hidden md:flex items-center space-x-6">
          <button @click="go('/dashboard')" :class="navClass('/dashboard')">
            Dashboard
          </button>
          <button @click="go('/tickets')" :class="navClass('/tickets')">
            Tickets
          </button>
          <button
            @click="handleLogout"
            class="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <span>Logout</span>
          </button>
        </div>

        <div v-else class="flex items-center space-x-4">
          <button
            @click="go('/auth/login')"
            class="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Login
          </button>
          <button
            @click="go('/auth/signup')"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </button>
        </div>

        <button @click="toggleMobile" class="md:hidden p-2">Menu</button>
      </div>

      <div v-if="mobileOpen && user" class="md:hidden py-4 space-y-2">
        <button
          @click="go('/dashboard')"
          class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
        >
          Dashboard
        </button>
        <button
          @click="go('/tickets')"
          class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
        >
          Tickets
        </button>
        <button
          @click="handleLogout"
          class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded"
        >
          Logout
        </button>
      </div>
    </Container>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuth } from "../../composables/useAuth";
import Container from "./Container.vue";

const mobileOpen = ref(false);
const router = useRouter();
const route = useRoute();
const { user, logout } = useAuth();

const go = (path) => {
  router.push(path);
  mobileOpen.value = false;
};

const goHome = () => {
  if (user) router.push("/dashboard");
  else router.push("/");
  mobileOpen.value = false;
};

const toggleMobile = () => (mobileOpen.value = !mobileOpen.value);

const handleLogout = () => {
  logout();
  router.push("/auth/login");
};

const navClass = (path) =>
  route.path === path ? "text-blue-600" : "text-gray-700 hover:text-blue-600";
</script>
