<template>
  <div class="dashboard-container">
    <div class="dashboard-elem table__index">
      <p>#</p>
    </div>
    <div class="dashboard-elem table__name">
      <div class="dashboard__logo"></div>
      <p>Name <i
        @click.stop="sortByLetters('name', isSortedName)"
        class="small fa fa-unsorted"/></p>
    </div>
    <div class="dashboard-elem table__symbol">
      <p>Symbol <i
        @click.stop="sortByLetters('symbol', isSortedSymbol)"
        class="small fa fa-unsorted"/></p>
    </div>
    <div
      v-for="(item, index) in filters"
      :key="item.text"
      :class="[ item.key === 'price' || item.key === 'marketCap' ? 'table__item_wide' : '']"
      class="dashboard-elem table__item">
      <p>{{ item.text }}
        <i
          @click.stop="sortValues(item)"
          class="small fa fa-unsorted"/>
        <i
          @click.stop="showDropDown(index)"
          :class="[ item.show || filterQuery[item.key] ? 'picked' : '' ]"
          class="small fa fa-filter"/>
      </p>
      <div
        v-if="item.show"
        class="drop-dawn-container">
        <a-drop-down :filterElement="getMaxAndMin(item)"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { eventBus } from '@/main'

import ADropDown from '@/components/shared/ADropDown'

export default {
  name: 'AFilterDashboard',
  components: { ADropDown },
  data () {
    return {
      isSortedName: false,
      isSortedSymbol: false,
      filters: [
        {
          text: 'price (USD)',
          key: 'price',
          show: false,
          isSorted: false
        },
        {
          text: 'market cap',
          key: 'marketCap',
          show: false,
          isSorted: false
        },
        {
          text: 'vol (24h)',
          key: 'volume24H',
          show: false,
          isSorted: false
        },
        {
          text: 'total Vol',
          key: 'change1H',
          show: false,
          isSorted: false
        },
        {
          text: 'chg (24h)',
          key: 'change24H',
          show: false,
          isSorted: false
        },
        {
          text: 'chg (7d)',
          key: 'change7D',
          show: false,
          isSorted: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['unfilteredCurrencies', 'filterQuery'])
  },
  mounted () {
    eventBus.$on('hideFilters', () => {
      this.filters.forEach(filter => {
        filter.show = false
      })
    })
  },
  methods: {
    getMaxAndMin (filter) {
      let min = Infinity
      let max = -Infinity
      if (this.unfilteredCurrencies.length > 0) {
        this.unfilteredCurrencies.forEach(item => {
          if (item[filter.key] < min) min = item[filter.key]
          if (item[filter.key] > max) max = item[filter.key]
        })
        const elem = { max, min, text: filter.text, key: filter.key }
        return elem
      }
      return { max: 1000000000000, min: 0 }
    },
    showDropDown (index) {
      this.filters.forEach(filter => {
        filter.show = false
      })
      this.filters[index].show = true
    },
    sortValues (item) {
      const { key, isSorted } = item
      eventBus.$emit('sorting', { key, isSorted, isNumeric: true })
      this.filters.forEach(filter => {
        filter.isSorted = false
      })
      if (!isSorted) item.isSorted = true
    },
    sortByLetters (key, isSorted) {
      eventBus.$emit('sorting', { key, isSorted, isNumeric: false })
      this.isSortedName = false
      this.isSortedSymbol = false
      if (!isSorted && key === 'name') this.isSortedName = true
      if (!isSorted && key === 'symbol') this.isSortedSymbol = true
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: flex-start;
  background-color: #f6f9fc;
}

.small {
  font-size: 12px;
  cursor: pointer;
}

.picked {
  color: rgb(106, 124, 156);
}

.dashboard {
  &-elem {
    display: flex;
    align-items: center;
    font-weight: 600;
    line-height: 2.14;
    font-size: 14px;
    text-transform: capitalize;
    color: rgba(106, 124, 156, 0.7);
    border-right: 1px solid #d8e2eb;
    position: relative;
  }
  &__logo {
    width: 32px;
    height: 40px;
  }
}
</style>
