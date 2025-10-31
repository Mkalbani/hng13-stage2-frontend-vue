<template>
  <div class="min-h-screen flex flex-col">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
      <!-- Decorative Circles -->
      <div class="absolute top-10 right-10 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
      <div class="absolute bottom-20 left-10 w-48 h-48 bg-purple-400 rounded-full opacity-20 blur-2xl"></div>

      <Container class="relative z-10 py-20 md:py-32">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Manage Tickets with Ease
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100">
            The most intuitive ticket management system for modern teams.
            Track, organize, and resolve issues faster.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="go('/auth/signup')"
              class="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Get Started Free
            </button>
            <button
              @click="go('/auth/login')"
              class="px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-blue-500"
            >
              Login
            </button>
          </div>
        </div>
      </Container>

      <!-- Wave SVG -->
      <div class="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,64 C360,20 720,20 1080,64 C1260,86 1350,96 1440,96 L1440,120 L0,120 Z"
            fill="white"
          />
        </svg>
      </div>
    </div>

    <!-- Features Section -->
    <Container class="py-20">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Powerful Features</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(feature, i) in features"
          :key="i"
          class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div :class="['w-14 h-14 mb-6 rounded-lg flex items-center justify-center', feature.bg, feature.text]">
            <component :is="feature.icon" class="h-8 w-8" />
          </div>
          <h3 class="text-xl font-semibold mb-3">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.desc }}</p>
        </div>
      </div>
    </Container>

    <!-- CTA Section -->
    <div class="bg-gray-50 py-20">
      <Container>
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-10 transform translate-x-32 -translate-y-32"></div>
          <div class="relative z-10">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p class="text-xl mb-8 text-blue-100">
              Join thousands of teams managing their tickets efficiently.
            </p>
            <button
              @click="go('/auth/signup')"
              class="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </Container>
    </div>
  </div>
</template>

<script setup>
import Container from '../components/layout/Container.vue'
import { useRouter } from 'vue-router'
import { Ticket, BarChart3, CheckCircle } from 'lucide-vue-next' // ✅ install: npm i lucide-vue-next

const router = useRouter()
const go = (path) => router.push(path)

const features = [
  {
    icon: Ticket,
    title: 'Easy Ticket Creation',
    desc: 'Create and organize tickets in seconds with our intuitive interface.',
    bg: 'bg-blue-100',
    text: 'text-blue-600',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    desc: 'Get instant insights into your ticket workflow and team performance.',
    bg: 'bg-green-100',
    text: 'text-green-600',
  },
  {
    icon: CheckCircle,
    title: 'Status Tracking',
    desc: 'Monitor ticket progress from open to resolution with clear status indicators.',
    bg: 'bg-purple-100',
    text: 'text-purple-600',
  },
]
</script>
