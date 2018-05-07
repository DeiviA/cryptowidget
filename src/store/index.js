import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const baseUrl = 'http://fmpedia-dev-ws1:81/api/cryptocurrencies/get-currencies?Take=10&Page=0'

export const state = {
  filteredCurrencies: [],
  unfilteredCurrencies: [],
  filterQuery: {}
}

export const getters = {
  filteredCurrencies: state => state.filteredCurrencies,
  unfilteredCurrencies: state => state.unfilteredCurrencies,
  filterQuery: state => state.filterQuery
}

export const actions = {
  async getCurrencies ({ commit }) {
    try {
      const { data } = await Vue.axios.get('?Take=50&Page=0')
      commit('setList', data)
      return data
    } catch (e) {
      throw e
    }
  },
  addFilterQuery ({ commit }, { key, ...payload }) {
    const newVal = {}
    newVal[key] = payload
    commit('addFilterQuery', newVal)
  },
  removeFilterQuery ({ commit }, { key }) {
    commit('removeFilterQuery', key)
  }
}

export const mutations = {
  setList (state, payload) {
    state.filteredCurrencies = payload
    state.unfilteredCurrencies = payload
  },
  addFilterQuery (state, payload) {
    state.filterQuery = { ...state.filterQuery, ...payload }
  },
  removeFilterQuery (state, key) {
    delete state.filterQuery[key]
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
