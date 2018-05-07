import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const baseUrl = 'http://fmpedia-dev-ws1:81/api/cryptocurrencies/get-currencies?Take=10&Page=0'

export const state = {
  filteredCurrencies: [],
  unfilteredCurrencies: []
}

export const getters = {
  filteredCurrencies: state => state.filteredCurrencies,
  unfilteredCurrencies: state => state.unfilteredCurrencies
}

export const actions = {
  async getCurrencies ({ commit }, payload) {
    try {
      const { data } = await Vue.axios.get('?Take=50&Page=0')
      commit('setList', data)
      return data
    } catch (e) {
      throw e
    }
  }
}

export const mutations = {
  setList (state, payload) {
    state.filteredCurrencies = payload
    state.unfilteredCurrencies = payload
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
