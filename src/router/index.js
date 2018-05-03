import Vue from 'vue'
import Router from 'vue-router'
import AllCrypto from '@/components/pages/AllCrypto'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'all-crypto',
    component: AllCrypto
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
