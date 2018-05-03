<template>
  <div>
    <div
      v-for="(item, index) in getList"
      :key="item.name + index"
      class="crypto"
    >
      <div class="crypto-item table__index">
        <p>{{ index + 1 }}</p>
      </div>
      <div class="crypto-item table__name">
        <div class="crypto-item__logo">
          <img
            :src="item.logoUrl"
            class="crypto-item__img">
        </div>
        <p class="crypto-item__name">{{ item.name }}</p>
      </div>
      <div class="crypto-item table__item">
        <p>{{ item.symbol }}</p>
      </div>
      <div class="crypto-item table__item">
        <p>{{ item.price }}</p>
      </div>
      <div class="crypto-item table__item">
        <p>${{ item.marketCap | shorten }}</p>
      </div>
      <div class="crypto-item table__item">
        <p>${{ item.volume24H | shorten }}</p>
      </div>
      <div class="crypto-item table__item">
        <p>{{ item.change1H }}</p>
      </div>
      <div class="crypto-item table__item">
        <p>{{ item.change24H }}</p>
      </div>
      <div class="crypto-item table__item">
        <p>{{ item.change7D }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AFilterDashboard',
  filters: {
    shorten (val) {
      let newVal = val.toString().split('.')[0]
      console.log('array', newVal)
      newVal = newVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      console.log('newVal', newVal, 'olldVal', val)
      const newValArray = newVal.split('.')
      if (newValArray.length === 4) {
        newVal = `${newValArray[0]}.${newValArray[1].slice(0, 2)}B`
      } else if (newValArray.length === 3) {
        newVal = `${newValArray[0]}.${newValArray[1].slice(0, 2)}M`
      } else if (newValArray.length === 2) {
        newVal = `${newValArray[0]}.${newValArray[1].slice(0, 2)}T`
      }
      return newVal
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      getList: 'getList'
    })
  }
}
</script>

<style lang="scss" scoped>
.crypto {
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #d8e2eb;
  &-item {
    border-right: 1px solid #d8e2eb;
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
}
</style>
