import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const baseUrl = 'http://fmpedia-dev-ws1:81/api/cryptocurrencies/get-currencies?Take=10&Page=0'

export const state = {
  filteredCurrencies: [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      logoUrl: 'https://s2.coinmarketcap.com/static/img/coins/16x16/1.png',
      marketCap: 159147688000,
      price: 9354.51,
      volume24H: 8299570000,
      circulatingSupply: 17012936,
      change1H: 0.92,
      change24H: 2.58,
      change7D: 5
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      logoUrl: 'https://s2.coinmarketcap.com/static/img/coins/16x16/1027.png',
      marketCap: 74515290000,
      price: 751.132,
      volume24H: 3376490000,
      circulatingSupply: 99203990,
      change1H: 1.79,
      change24H: 10.98,
      change7D: 19
    },
    {
      name: 'Ripple',
      symbol: 'XRP',
      logoUrl: 'https://s2.coinmarketcap.com/static/img/coins/16x16/52.png',
      marketCap: 34023170000,
      price: 0.868961,
      volume24H: 552649000,
      circulatingSupply: 39153852400,
      change1H: 0.51,
      change24H: 2.42,
      change7D: 7
    },
    {
      name: 'Bitcoin-Cash',
      symbol: 'BCH',
      logoUrl: 'https://s2.coinmarketcap.com/static/img/coins/16x16/1831.png',
      marketCap: 25877241900,
      price: 1512.63,
      volume24H: 1200020000,
      circulatingSupply: 17107450,
      change1H: 1.05,
      change24H: 4.94,
      change7D: 13
    },
    {
      name: 'Eos',
      symbol: 'EOS',
      logoUrl: 'https://s2.coinmarketcap.com/static/img/coins/16x16/1765.png',
      marketCap: 15134840800,
      price: 18.1712,
      volume24H: 1925680000,
      circulatingSupply: 832902656,
      change1H: 0.22,
      change24H: 2.45,
      change7D: 23
    }
  ]
}

export const getters = {
  getList: state => state.filteredCurrencies
}

export const actions = {
  async getCurrencies ({ commit }, payload) {
    try {
      const { data } = await Vue.axios.get('?Take=10&Page=0')
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
