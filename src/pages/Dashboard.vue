<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <div class="flex-1 py-12">
      <Container>
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {{ user?.name }}
          </h1>
          <p class="text-gray-600">
            Here's an overview of your ticket management system
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div
            class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 bg-blue-100 rounded-lg text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span class="text-3xl font-bold text-gray-900">{{
                stats.total
              }}</span>
            </div>
            <h3 class="text-gray-600 font-medium">Total Tickets</h3>
          </div>

          <div
            class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 bg-green-100 rounded-lg text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <span class="text-3xl font-bold text-gray-900">{{
                stats.open
              }}</span>
            </div>
            <h3 class="text-gray-600 font-medium">Open Tickets</h3>
          </div>

          <div
            class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 bg-amber-100 rounded-lg text-amber-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span class="text-3xl font-bold text-gray-900">{{
                stats.inProgress
              }}</span>
            </div>
            <h3 class="text-gray-600 font-medium">In Progress</h3>
          </div>

          <div
            class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 bg-gray-100 rounded-lg text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span class="text-3xl font-bold text-gray-900">{{
                stats.closed
              }}</span>
            </div>
            <h3 class="text-gray-600 font-medium">Closed Tickets</h3>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-8">
          <h2 class="text-2xl font-bold mb-6">Quick Actions</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              @click="go('/tickets')"
              class="p-6 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-start gap-4"
            >
              <div
                class="flex-none w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6"
                  />
                </svg>
              </div>
              <div class="flex-1">
                <div class="font-semibold text-gray-900">Manage Tickets</div>
                <div class="text-sm text-gray-600 mt-1">
                  View, create, edit, and delete tickets
                </div>
              </div>
            </button>

            <button
              @click="go('/tickets')"
              class="p-6 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all text-left flex items-start gap-4"
            >
              <div
                class="flex-none w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div class="flex-1">
                <div class="font-semibold text-gray-900">Create New Ticket</div>
                <div class="text-sm text-gray-600 mt-1">
                  Add a new ticket to the system.
                </div>
              </div>
            </button>
          </div>
        </div>
      </Container>
    </div>
  </div>
</template>

<script setup>
import Container from "../components/layout/Container.vue";
import { computed } from "vue";
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";

const { user } = useAuth();
const router = useRouter();

const tickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");

const stats = computed(() => ({
  total: tickets.length,
  open: tickets.filter((t) => t.status === "open").length,
  inProgress: tickets.filter((t) => t.status === "in_progress").length,
  closed: tickets.filter((t) => t.status === "closed").length,
}));

const go = (path) => router.push(path);
</script>
