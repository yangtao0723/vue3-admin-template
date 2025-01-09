import { createApp } from 'vue'
import App from '@/App.vue'

const app = createApp(App)

// 动态注册所有名称为 Global 开头的组件
const componentsContext = import.meta.glob<Record<string, any>>('./Global*.vue')

Object.keys(componentsContext).forEach(async (path) => {
  const componentConfig = await componentsContext[path]()
  const componentName = path.replace(/^\.\/Global/, '').replace(/\.\w+$/, '')

  app.component(componentName, componentConfig.default || componentConfig)
})
