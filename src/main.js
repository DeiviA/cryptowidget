// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const instance = axios.create({
  baseURL: 'http://fmpedia-dev-ws1:81/api/cryptocurrencies/get-currencies'
})

Vue.use(VueAxios, instance)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
