import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const baseUrl = 'http://fmpedia-dev-ws1:81/api/cryptocurrencies/get-currencies?Take=10&Page=0'

export const state = {
  filteredCurrencies: []
}

export const getters = {
  filteredCurrencies: state => state.filteredCurrencies
}

export const actions = {
  async getCurrencies ({ commit }, payload) {
    try {
      const { data } = await Vue.axios.get('?Take=5&Page=0')
      commit('setList', data)
    } catch (e) {
      throw e
    }
  }
}

export const mutations = {
  setList (state, payload) {
    state.filteredCurrencies = payload
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
