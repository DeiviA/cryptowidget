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
      v-for="item in arr"
      :key="item"
      :class="[ item === 'price (USD)' || item === 'market cap' ? 'table__item_wide' : '']"
      class="dashboard-elem table__item">
      <p>{{ item }} <i class="small fa fa-unsorted"/> <i class="small fa fa-filter"/></p>
      <div
        v-if="item === 'market cap'"
        class="drop-dawn-container">
        <a-drop-down/>
      </div>
    </div>
  </div>
</template>

<script>
import ADropDown from '@/components/shared/ADropDown'

export default {
  name: 'AFilterDashboard',
  components: { ADropDown },
  data () {
    return {
      arr: ['price (USD)', 'market cap', 'vol (24h)', 'total Vol', 'chg (24h)', 'chg (7d)']
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
