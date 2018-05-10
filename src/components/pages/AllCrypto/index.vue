<template>
  <div>
    <a-filter-bar
      @getList="getCurrenciesList"
    />
    <div
      @click="hideFilters"
      class="widget-body-wrapper"
    >
      <a-filter-dashboard
        @sorting="sortValues"
        @filtering="filterValues"
        ref="filterDashboard"
      />
      <a-crypto-list
        v-if="isLoaded"
        :filteredCurrencies="filteredCurrencies"
      />
      <a-spinner v-else/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AFilterBar from '@/components/shared/AFilterBar'
import AFilterDashboard from '@/components/shared/AFilterDashboard'
import ACryptoList from '@/components/shared/ACryptoList'
import ASpinner from '@/components/shared/ASpinner'

export default {
  name: 'AllCrypto',
  components: { AFilterBar, AFilterDashboard, ACryptoList, ASpinner },
  data () {
    return {
      filteredCurrencies: [],
      isLoaded: false
    }
  },
  watch: {
    filteredCurrencies: function () {
      this.setFilteredCurrencies(this.filteredCurrencies)
    }
  },
  computed: {
    ...mapGetters(['filterQuery', 'unfilteredCurrencies', 'sortKey', 'getfilteredCurrencies'])
  },
  async mounted () {
    if (this.unfilteredCurrencies.length > 0) {
      this.isLoaded = true
      this.filteredCurrencies = this.getfilteredCurrencies
    } else {
      this.getCurrenciesList(5)
    }
  },
  methods: {
    ...mapActions(['getCurrencies', 'clearFilterQuery', 'clearSortKey', 'setFilteredCurrencies']),
    async getCurrenciesList (amount) {
      try {
        this.isLoaded = false
        this.clearFilterQuery()
        this.clearSortKey()
        this.filteredCurrencies = await this.getCurrencies({ Take: amount, Page: 0 })
        this.isLoaded = true
      } catch (e) {
        console.log('error', e)
      }
    },
    filterValues () {
      this.filteredCurrencies = this.unfilteredCurrencies.filter((currency) => {
        return Object.keys(this.filterQuery).every(key => {
          return (currency[key] >= this.filterQuery[key].min && currency[key] <= this.filterQuery[key].max)
        })
      })
    },
    sortValues ({ key, isSorted, isNumeric }) {
      if (isSorted) {
        this.filteredCurrencies.reverse()
        return
      }
      if (isNumeric) {
        this.filteredCurrencies.sort((a, b) => {
          return a[key] - b[key]
        })
      } else {
        this.filteredCurrencies.sort((a, b) => {
          if (a[key] < b[key]) return -1
          if (a[key] > b[key]) return 1
          return 0
        })
      }
    },
    hideFilters () {
      this.$refs.filterDashboard.hideAllDropDowns()
    }
  }
}
</script>

<style lang="scss">
.widget-body-wrapper {
  width: 100%;
  min-height: 278px;
  border: 1px solid #d8e2eb;
  border-radius: 0 5px 5px 5px;
  overflow: hidden;
  background-color: white;
}

.table {
  &__index {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 37px;
  }
  &__name {
    display: flex;
    align-items: center;
    padding-left: 10px;
    width: 181px;
  }
  &__symbol {
    width: 92px;
    padding-left: 10px;
    display: flex;
    align-items: center;
  }
  &__price {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 120px;
    padding-right: 10px;
  }
  &__market {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 120px;
    padding-right: 10px;
  }
  &__item {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 92px;
    white-space: nowrap;
    padding-right: 8px;
    &_wide {
      width: 120px;
      padding-right: 10px;
    }
  }
}
</style>
