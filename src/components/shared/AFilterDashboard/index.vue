<template>
  <div class="dashboard-container">
    <div class="dashboard-elem table__index">
      <p>#</p>
    </div>
    <div class="dashboard-elem table__name">
      <p>Name</p>
    </div>
    <div
      v-for="item in arr"
      :key="item"
      class="dashboard-elem table__item">
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AFilterDashboard',
  data () {
    return {
      arr: ['Symbol', 'Price (USD)', 'Market Cap', 'Vol (24h)', 'Total Vol', 'Chg (24h)', 'Chg (7d)']
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

.dashboard {
  &-elem {
    display: flex;
    align-items: center;
    font-weight: 600;
    line-height: 2.14;
    color: rgba(106, 124, 156, 0.7);
    border-right: 1px solid #d8e2eb;
  }
}
</style>
