<template>
  <div class="dashboard-container">
    <div class="dashboard-elem table__index">
      <p># <i class="small fa fa-unsorted"/></p>
    </div>
    <div class="dashboard-elem table__name">
      <div class="dashboard__logo"></div>
      <p>Name <i class="small fa fa-unsorted"/></p>
    </div>
    <div class="dashboard-elem table__symbol">
      <p>Symbol <i class="small fa fa-unsorted"/></p>
    </div>
    <div
      v-for="(item, index) in filters"
      :key="item.text"
      :class="[ item.text === 'price (USD)' || item.text === 'market cap' ? 'table__item_wide' : '']"
      class="dashboard-elem table__item">
      <p>{{ item.text }} <i class="small fa fa-unsorted"/> <i @click.stop="showDropDown(index)" :class="[ item.show || filterQuery[item.key] ? 'picked' : '' ]" class="small fa fa-filter"/></p>
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
      filters: [
        {
          text: 'price (USD)',
          key: 'price',
          show: false
        },
        {
          text: 'market cap',
          key: 'marketCap',
          show: false
        },
        {
          text: 'vol (24h)',
          key: 'volume24H',
          show: false
        },
        {
          text: 'total Vol',
          key: 'change1H',
          show: false
        },
        {
          text: 'chg (24h)',
          key: 'change24H',
          show: false
        },
        {
          text: 'chg (7d)',
          key: 'change7D',
          show: false
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
