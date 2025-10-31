<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <div class="flex-1 flex items-center justify-center py-12">
      <Container>
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-center mb-2">Create Account</h2>
          <p class="text-gray-600 text-center mb-8">Join TicketFlow today</p>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label
                for="signup-name"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Full Name</label
              >
              <input
                id="signup-name"
                type="text"
                v-model="formData.name"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <p
                v-if="errors.name"
                class="text-red-500 text-sm mt-1"
                role="alert"
              >
                {{ errors.name }}
              </p>
            </div>

            <div>
              <label
                for="signup-email"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Email Address</label
              >
              <input
                id="signup-email"
                type="email"
                v-model="formData.email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <p
                v-if="errors.email"
                class="text-red-500 text-sm mt-1"
                role="alert"
              >
                {{ errors.email }}
              </p>
            </div>

            <div>
              <label
                for="signup-password"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Password</label
              >
              <input
                id="signup-password"
                type="password"
                v-model="formData.password"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <p
                v-if="errors.password"
                class="text-red-500 text-sm mt-1"
                role="alert"
              >
                {{ errors.password }}
              </p>
            </div>

            <div>
              <label
                for="signup-confirm"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Confirm Password</label
              >
              <input
                id="signup-confirm"
                type="password"
                v-model="formData.confirmPassword"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <p
                v-if="errors.confirmPassword"
                class="text-red-500 text-sm mt-1"
                role="alert"
              >
                {{ errors.confirmPassword }}
              </p>
            </div>

            <button
              type="submit"
              class="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Create Account
            </button>
          </form>

          <p class="text-center mt-6 text-gray-600">
            Already have an account?
            <button
              @click="go('/auth/login')"
              class="text-blue-600 font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </Container>
    </div>
  </div>
</template>

<script setup>
import Container from "../components/layout/Container.vue";
import { reactive } from "vue";
import { useAuth } from "../composables/useAuth";
import { useToast } from "../composables/useToast";
import { useRouter } from "vue-router";

const router = useRouter();
const { signup } = useAuth();
const { showToast } = useToast();

const formData = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const errors = reactive({});

const validate = () => {
  const newErrors = {};
  if (!formData.name) newErrors.name = "Name is required";
  else if (formData.name.length < 2)
    newErrors.name = "Name must be at least 2 characters";
  if (!formData.email) newErrors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(formData.email))
    newErrors.email = "Invalid email format";
  if (!formData.password) newErrors.password = "Password is required";
  else if (formData.password.length < 6)
    newErrors.password = "Password must be at least 6 characters";
  if (formData.password !== formData.confirmPassword)
    newErrors.confirmPassword = "Passwords do not match";
  return newErrors;
};

const handleSubmit = () => {
  const newErrors = validate();
  Object.keys(errors).forEach((k) => delete errors[k]);
  Object.assign(errors, newErrors);
  if (Object.keys(newErrors).length) return;

  signup(formData.name, formData.email, formData.password);
  showToast("Account created successfully! Welcome aboard.", "success");
  router.push("/dashboard");
};

const go = (path) => router.push(path);
</script>
