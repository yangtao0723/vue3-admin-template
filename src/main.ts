import App from './App.vue'
import { createApp } from 'vue'
const app = createApp(App)
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`${key}Icon`, component)
}

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
import router from '@/router'
import './style.css'
app
  .use(pinia)
  .use(ElementPlus, {
    locale: zhCn,
    size: 'small',
  })
  .use(router)

app.mount('#app')
