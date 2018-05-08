<template>
  <div class="filters-wrapper">
    <div
      v-for="item in tabs"
      :key="item"
      class="tab-container"
    >
      <div class="tab">
        <p>{{ item }}</p>
        <i class="small fa fa-sort-down"/>
      </div>
      <div class="tab-content">
        <p class="tab-content__pg" @click="getCurrenciesList(100)">Top 100</p>
        <p class="tab-content__pg" @click="getCurrenciesList(1500)">Full list</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AFilterBar',
  data () {
    return {
      tabs: ['All', 'Coins', 'Token']
    }
  },
  methods: {
    getCurrenciesList (amount) {
      this.$emit('getList', amount)
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

.tab-container {
  position: relative;
  border-radius: 5px 5px 0 0;
  &:hover {
    background-color: #36576f;
    .tab {
      color: white;
    }
  }
  &:hover .tab-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
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
  cursor: pointer;
  &__active {
    width: 80px;
    height: 33px;
    background-color: #36576f;
  }
  &-content {
    display: none;
    min-width: 150px;
    position: absolute;
    background-color: #36576f;
    color: white;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    &__pg {
      padding: 10px 15px;
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
}
</style>
