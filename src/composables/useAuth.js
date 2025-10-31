import { reactive, inject } from 'vue'

const authSymbol = Symbol('auth')

function createAuth() {
  const state = reactive({ user: null, loading: false, sessionExpired: false })

  const createSession = (user) => {
    const payload = { user, created: Date.now() }
    localStorage.setItem('ticketapp_session', JSON.stringify(payload))
    state.user = user
  }

  const login = (email, password) => {
    // demo credentials always work
    if (email === 'demo@ticketapp.com' && password === 'Demo123!') {
      createSession({ email, name: 'Demo User' })
      return { success: true }
    }

    // check persisted users (signup creates them)
    const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)
    if (user) {
      createSession({ email: user.email, name: user.name })
      return { success: true }
    }

    // no matching account found
    return { success: false, error: 'Account not found. Please sign up.' }
  }

  const signup = (name, email, password) => {
    // persist user locally
    const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]')
    // prevent duplicate email registration
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already registered' }
    }
    users.push({ name, email, password })
    localStorage.setItem('ticketapp_users', JSON.stringify(users))
    createSession({ email, name })
    return { success: true }
  }

  const logout = (expired = false) => {
    localStorage.removeItem('ticketapp_session')
    state.user = null
    if (expired) state.sessionExpired = true
  }

  const clearSessionExpired = () => (state.sessionExpired = false)

  const init = () => {
    const s = localStorage.getItem('ticketapp_session')
    if (s) {
      try {
        const parsed = JSON.parse(s)
        state.user = parsed.user
      } catch (e) {
        state.user = null
      }
    }
  }

  // attach methods to reactive state and return it (avoid spread)
  state.login = login
  state.signup = signup
  state.logout = logout
  state.clearSessionExpired = clearSessionExpired
  state.init = init

  return state
}

export function provideAuth(app) {
  const auth = createAuth()
  auth.init()
  app.provide(authSymbol, auth)
  app.config.globalProperties.$auth = auth
}

export function useAuth() {
  const auth = inject(authSymbol)
  if (!auth) throw new Error('useAuth must be used within provideAuth')
  return auth
}
