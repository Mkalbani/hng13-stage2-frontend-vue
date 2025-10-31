<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <div class="flex-1 flex items-center justify-center py-12">
      <Container>
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-center mb-2">Welcome Back</h2>
          <p class="text-gray-600 text-center mb-8">Login to your account</p>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="login-email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input id="login-email" type="email" v-model="formData.email" :aria-invalid="errors.email ? 'true' : 'false'" placeholder="demo@ticketapp.com" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
              <p v-if="errors.email" class="text-red-500 text-sm mt-1" role="alert">{{ errors.email }}</p>
            </div>

            <div>
              <label for="login-password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input id="login-password" type="password" v-model="formData.password" :aria-invalid="errors.password ? 'true' : 'false'" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="Demo123!" />
              <p v-if="errors.password" class="text-red-500 text-sm mt-1" role="alert">{{ errors.password }}</p>
            </div>

            <button type="submit" class="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">Login</button>
          </form>

          <p class="text-center mt-6 text-gray-600">Don't have an account? <button @click="go('/auth/signup')" class="text-blue-600 font-semibold hover:underline">Sign Up</button></p>

          <div class="mt-6 p-4 bg-blue-50 rounded-lg">
            <p class="text-sm text-gray-600 text-center"><strong>Demo Credentials:</strong><br/>Email: demo@ticketapp.com<br/>Password: Demo123!</p>
          </div>
        </div>
      </Container>
    </div>
  </div>
</template>

<script setup>
import Container from '../components/layout/Container.vue'
import { reactive } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useToast } from '../composables/useToast'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login } = useAuth()
const { showToast } = useToast()

const formData = reactive({ email: '', password: '' })
const errors = reactive({})

const validate = () => {
  const newErrors = {}
  if (!formData.email) newErrors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
  if (!formData.password) newErrors.password = 'Password is required'
  else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
  return newErrors
}

const handleSubmit = () => {
  const newErrors = validate()
  Object.keys(errors).forEach(k => delete errors[k])
  Object.assign(errors, newErrors)
  if (Object.keys(newErrors).length) return

  const result = login(formData.email, formData.password)
  if (result.success) {
    showToast('Login successful! Welcome back.', 'success')
    router.push('/dashboard')
  } else {
    showToast(result.error, 'error')
  }
}

const go = (path) => router.push(path)
</script>
