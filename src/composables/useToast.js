import { reactive, inject } from 'vue'

const toastSymbol = Symbol('toast')

function createToast() {
  // keep a single reactive state object and attach methods to it
  const state = reactive({ toasts: [] })

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now().toString()
    state.toasts.push({ id, message, type })
    setTimeout(() => {
      // mutate the reactive array instead of replacing the top-level object
      const idx = state.toasts.findIndex(t => t.id === id)
      if (idx !== -1) state.toasts.splice(idx, 1)
    }, duration)
  }

  // attach the method onto the reactive state and return it (no spreading)
  state.showToast = showToast
  return state
}

export function provideToast(app) {
  const toast = createToast()
  app.provide(toastSymbol, toast)
  app.config.globalProperties.$toast = toast
}

export function useToast() {
  const toast = inject(toastSymbol)
  if (!toast) throw new Error('useToast must be used within provideToast')
  return toast
}
