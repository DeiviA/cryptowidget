<template>
  <div class="crypto-wrapper">
    <div
      v-if="filteredCurrencies.length === 0"
      class="no-results">
      <p>No search results</p>
    </div>
    <div v-else>
      <div
        v-for="(item, index) in filteredCurrencies"
        :key="item.name + index"
        class="crypto"
      >
        <div class="crypto-item table__index">
          <p>{{ index + 1 }}</p>
        </div>
        <router-link
          :to="{ name: 'single-crypto', params: { crypto: item } }"
          class="crypto-item table__name"
        >
          <div class="crypto-item__logo">
            <img
              :src="item.logoUrl"
              class="crypto-item__img">
          </div>
          <p class="crypto-item__name">{{ item.name }}</p>
        </router-link>
        <div class="crypto-item table__symbol">
          <p>{{ item.symbol }}</p>
        </div>
        <div class="crypto-item table__price">
          <p>${{ item.price | shorten }}</p>
        </div>
        <div class="crypto-item table__market">
          <p>${{ item.marketCap | convert }}</p>
        </div>
        <div class="crypto-item table__item">
          <p>${{ item.volume24H | convert }}</p>
        </div>
        <div class="crypto-item table__item">
          <p :class="[item.change1H < 0 ? 'crypto-item_red' : 'crypto-item_green']">{{ item.change1H | addPlusSymbol }}%</p>
        </div>
        <div class="crypto-item table__item">
          <p :class="[item.change24H < 0 ? 'crypto-item_red' : 'crypto-item_green']">{{ item.change24H | addPlusSymbol }}%</p>
        </div>
        <div class="crypto-item table__item">
          <p :class="[item.change7D < 0 ? 'crypto-item_red' : 'crypto-item_green']">{{ item.change7D | addPlusSymbol }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AFilterDashboard',
  props: {
    filteredCurrencies: {
      type: Array,
      required: true
    }
  },
  filters: {
    convert (val) {
      let newVal = val.toString().split('.')[0]
      newVal = newVal.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      const newValArray = newVal.split('.')
      if (newValArray.length === 4) newVal = `${newValArray[0]}.${newValArray[1].slice(0, 2)}B`
      if (newValArray.length === 3) newVal = `${newValArray[0]}.${newValArray[1].slice(0, 2)}M`
      if (newValArray.length === 2) newVal = `${newValArray[0]}.${newValArray[1].slice(0, 2)}T`
      return newVal
    },
    shorten (val) {
      let newVal = val.toString()
      if (newVal.length > 9) newVal = newVal.slice(0, 9)
      return newVal
    },
    addPlusSymbol (val) {
      if (val < 0) return val
      return `+${val}`
    }
  }
}
</script>

<style lang="scss" scoped>
.crypto-wrapper {
  min-height: 230px;
}

.crypto {
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #d8e2eb;
  transition: background-color 0.2s;
  &-item {
    border-right: 1px solid #d8e2eb;
    &_red {
      color: #ef1217;
    }
    &_green {
      color: #22bb33;
    }
    &__name {
      color: #467291;
      font-weight: 600;
    }
    &__logo {
      width: 32px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__img {
      width: 20px;
      height: 20px;
    }
    &__price {
    }
  }
  &:hover {
    background-color: #f6f9fc;
  }
}

.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 230px;
  font-size: 24px;
}
</style>
