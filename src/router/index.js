import Vue from 'vue'
import Router from 'vue-router'
import AllCrypto from '@/components/pages/AllCrypto'
import SingleCrypto from '@/components/pages/SingleCrypto'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'all-crypto',
    component: AllCrypto
  },
  {
    path: '/single-crypto',
    name: 'single-crypto',
    component: SingleCrypto
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
