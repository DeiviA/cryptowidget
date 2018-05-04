<template>
  <div class="filters-wrapper">
    <div
      v-for="item in arr"
      :key="item"
      class="tab"
    >
      <p>{{ item }}</p>
      <i class="small fa fa-sort-down"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AFilterBar',
  data () {
    return {
      arr: ['All', 'Coins', 'Token']
    }
  }
}
</script>

<style lang="scss" scoped>
.filters-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.small {
  font-size: 12px;
}

.tab {
  width: 80px;
  height: 33px;
  background-color: rgba(54, 87, 111, 0.1);
  margin-right: 1px;
  border-radius: 5px 5px 0 0;
  color: #36576f;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &__active {
    width: 80px;
    height: 33px;
    background-color: #36576f;
  }
}
</style>
