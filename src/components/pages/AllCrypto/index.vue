<template>
  <div>
    <a-filter-bar/>
    <div class="widget-body-wrapper" @click="hideFilters">
      <a-filter-dashboard/>
      <a-crypto-list :filteredCurrencies="filteredCurrencies"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { eventBus } from '@/main'

import AFilterBar from '@/components/shared/AFilterBar'
import AFilterDashboard from '@/components/shared/AFilterDashboard'
import ACryptoList from '@/components/shared/ACryptoList'

export default {
  name: 'AllCrypto',
  components: { AFilterBar, AFilterDashboard, ACryptoList },
  data () {
    return {
      filteredCurrencies: []
    }
  },
  async mounted () {
    try {
      this.filteredCurrencies = await this.getCurrencies()
    } catch (e) {
      console.log('error', e)
    }
  },
  methods: {
    ...mapActions(['getCurrencies']),
    hideFilters () {
      eventBus.$emit('hideFilters')
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
