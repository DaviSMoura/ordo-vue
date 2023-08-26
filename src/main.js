import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'

import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router/auto'

const pinia = createPinia()
const router = createRouter({
  history: createWebHashHistory()
})

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
