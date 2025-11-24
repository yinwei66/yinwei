import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('@/views/mine/index.vue')
  },
  {
    path: '/wb',
    name: 'wb',
    component: () => import('@/views/wb.vue')
  },
  {
    path: '/wbyy',
    name: 'wbyy',
    component: () => import('@/views/wbyy.vue')
  },
  {
    path: '/wbls',
    name: 'wbls',
    component: () => import('@/views/wbls.vue')
  },
  {
    path: '/yjqd',
    name: 'yjqd',
    component: () => import('@/views/yjqd.vue')
  },
  {
    path: '/sjfx',
    name: 'sjfx',
    component: () => import('@/views/sjfx.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
