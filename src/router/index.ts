import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/components/layouts/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)',
    redirect: '/',
  },

  {
    path: '/login',
    meta: {
      KeepAlive: false,
    },
    component: () => import('@/pages/login.vue'),
  },
  {
    path: '/',
    name: '首页',
    meta: {
      KeepAlive: false,
    },
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
      },
    ],
  },
  {
    path: '/activity',
    name: '活动页',
    meta: {
      KeepAlive: true,
    },
    component: Layout,
    children: [
      {
        path: '/activity',
        component: () => import('@/pages/activity.vue'),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
