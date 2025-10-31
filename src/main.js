import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { provideAuth } from './composables/useAuth'
import { provideToast } from './composables/useToast'

const app = createApp(App)
provideAuth(app)
provideToast(app)
app.use(router).mount('#app')
