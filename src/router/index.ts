import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/components/layouts/index.vue'
import { useGlobalInfo } from '@/store'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/pages/login.vue'),
  },
  {
    path: '',
    name: '首页',
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
    path: '',
    name: '活动',
    meta: {
      keepAlive: true,
    },
    component: Layout,
    children: [
      {
        path: '/activity',
        name: '活动列表',
        component: () => import('@/pages/activity.vue'),
      },
    ],
  },
  {
    path: '/news',
    name: '新闻',
    meta: {
      keepAlive: true,
    },
    component: Layout,
    children: [
      {
        path: 'list',
        name: '新闻列表',
        component: () => import('@/pages/newsList.vue'),
      },
      {
        path: 'home',
        name: '新闻首页',
        component: () => import('@/pages/newsHome.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    component: () => import('@/pages/404.vue'),
    children: [
      {
        path: '/404',
        component: () => import('@/pages/404.vue'),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const globalInfo = useGlobalInfo()
  if (!globalInfo.userToken && to.path !== '/login') next('/login')
  else next()
})
export default router
