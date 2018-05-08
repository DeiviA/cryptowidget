import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const baseUrl = 'http://fmpedia-dev-ws1:81/api/cryptocurrencies/get-currencies?Take=10&Page=0'

export const state = {
  filteredCurrencies: [],
  unfilteredCurrencies: [],
  filterQuery: {},
  sortKey: null
}

export const getters = {
  getfilteredCurrencies: state => state.filteredCurrencies,
  unfilteredCurrencies: state => state.unfilteredCurrencies,
  filterQuery: state => state.filterQuery,
  sortKey: state => state.sortKey
}

export const actions = {
  async getCurrencies ({ commit }, payload) {
    try {
      const searchParams = new URLSearchParams()
      for (const key in payload) {
        searchParams.append(key, payload[key])
      }
      const { data } = await Vue.axios.get('?' + searchParams)
      commit('setList', data)
      return data
    } catch (e) {
      throw e
    }
  },
  setFilteredCurrencies ({ commit }, payload) {
    commit('setFilteredCurrencies', payload)
  },
  addFilterQuery ({ commit }, { key, ...payload }) {
    const newVal = {}
    newVal[key] = payload
    commit('addFilterQuery', newVal)
  },
  removeFilterQuery ({ commit }, { key }) {
    commit('removeFilterQuery', key)
  },
  clearFilterQuery ({ commit }) {
    commit('clearFilterQuery')
  },
  changeSortKey ({ commit }, payload) {
    commit('changeSortKey', payload)
  },
  clearSortKey ({ commit }) {
    commit('clearSortKey')
  }
}

export const mutations = {
  setList (state, payload) {
    state.filteredCurrencies = payload
    state.unfilteredCurrencies = payload
  },
  setFilteredCurrencies (state, payload) {
    state.filteredCurrencies = payload
  },
  addFilterQuery (state, payload) {
    state.filterQuery = { ...state.filterQuery, ...payload }
  },
  removeFilterQuery (state, key) {
    delete state.filterQuery[key]
  },
  clearFilterQuery (state) {
    state.filterQuery = {}
  },
  changeSortKey (state, sortKey) {
    state.sortKey = sortKey
  },
  clearSortKey (state) {
    state.sortKey = null
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
