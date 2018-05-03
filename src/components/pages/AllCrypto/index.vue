<template>
  <div class="widget-wrapper">
    <a-filter-bar/>
    <div class="widget-body-wrapper">
      <a-filter-dashboard/>
      <a-crypto-item/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AFilterBar from '@/components/shared/AFilterBar'
import AFilterDashboard from '@/components/shared/AFilterDashboard'
import ACryptoItem from '@/components/shared/ACryptoItem'

export default {
  name: 'AllCrypto',
  components: { AFilterBar, AFilterDashboard, ACryptoItem },
  data () {
    return {
      myStr: ''
    }
  },
  async mounted () {
    try {
      await this.getCurrencies()
    } catch (e) {
      console.log('error', e)
    }
  },
  methods: {
    ...mapActions(['getCurrencies'])
  }
}
</script>

<style lang="scss">
.widget-wrapper {
  padding-top: 50px;
  width: 920px;
  margin: 0 auto;
}
.widget-body-wrapper {
  width: 100%;
  border: 1px solid #d8e2eb;
  border-radius: 0 5px 5px 5px;
  overflow: hidden;
}

.table {
  &__index {
    display: flex;
    align-items: center;
    padding-left: 10px;
    width: 37px;
  }
  &__name {
    display: flex;
    align-items: center;
    padding-left: 10px;
    width: 181px;
  }
  &__item {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100px;
    padding-right: 10px;
  }
}
</style>
