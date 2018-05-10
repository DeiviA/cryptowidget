<template>
  <div class="dashboard-container">
    <div class="dashboard-elem table__index">
      <p>#</p>
    </div>
    <div
      v-for="(item, index) in filters"
      :key="item.text"
      :class="item.className"
      class="dashboard-elem">
      <p>{{ item.text }}
        <i
          @click.stop="sortValues(item)"
          class="small fa fa-unsorted"/>
        <i
          v-if="item.hasFilter"
          @click.stop="showDropDown(index)"
          :class="[ item.show || filterQuery[item.key] ? 'picked' : '' ]"
          class="small fa fa-filter"/>
      </p>
      <div
        v-if="item.show"
        class="drop-dawn-container">
        <a-drop-down
          @filtering="applyFilters"
          @hideDropDown="hideAllDropDowns"
          :filterElement="getMaxAndMin(item)"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import ADropDown from '@/components/shared/ADropDown'

export default {
  name: 'AFilterDashboard',
  components: { ADropDown },
  data () {
    return {
      filters: [
        {
          text: 'name',
          key: 'name',
          show: false,
          isSorted: false,
          hasFilter: false,
          className: 'table__name indent'
        },
        {
          text: 'symbol',
          key: 'symbol',
          show: false,
          isSorted: false,
          hasFilter: false,
          className: 'table__symbol'
        },
        {
          text: 'price (USD)',
          key: 'price',
          show: false,
          isSorted: false,
          hasFilter: true,
          className: 'table__item table__item_wide'
        },
        {
          text: 'market cap',
          key: 'marketCap',
          show: false,
          isSorted: false,
          hasFilter: true,
          className: 'table__item table__item_wide'
        },
        {
          text: 'vol (24h)',
          key: 'volume24H',
          show: false,
          isSorted: false,
          hasFilter: true,
          className: 'table__item'
        },
        {
          text: 'total Vol',
          key: 'change1H',
          show: false,
          isSorted: false,
          hasFilter: true,
          className: 'table__item'
        },
        {
          text: 'chg (24h)',
          key: 'change24H',
          show: false,
          isSorted: false,
          hasFilter: true,
          className: 'table__item'
        },
        {
          text: 'chg (7d)',
          key: 'change7D',
          show: false,
          isSorted: false,
          hasFilter: true,
          className: 'table__item'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['unfilteredCurrencies', 'filterQuery', 'sortKey'])
  },
  mounted () {
    if (this.sortKey) this.setSorted()
  },
  methods: {
    ...mapActions(['changeSortKey']),
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
      const isShowing = this.filters[index].show
      this.filters.forEach(filter => {
        filter.show = false
      })
      if (!isShowing) this.filters[index].show = true
    },
    hideAllDropDowns () {
      this.filters.forEach(filter => {
        filter.show = false
      })
    },
    setSorted () {
      this.filters.forEach(filter => {
        if (this.sortKey.key === filter.key) {
          filter.isSorted = !this.sortKey.isSorted
        }
      })
    },
    removeSortedStatus (item) {
      const isSorted = item.isSorted
      this.filters.forEach(filter => {
        filter.isSorted = false
      })
      if (!isSorted) item.isSorted = true
    },
    sortValues (item) {
      const { key, isSorted, hasFilter } = item
      let isNumeric = false
      if (hasFilter) isNumeric = true
      const payload = { key, isSorted, isNumeric }
      this.removeSortedStatus(item)
      this.changeSortKey(payload)
      this.$emit('sorting', payload)
    },
    applyFilters () {
      this.$emit('filtering')
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

.indent {
  padding-left: 42px;
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
