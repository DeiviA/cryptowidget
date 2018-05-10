<template>
  <div class="currency-wrapper">
    <div class="currency-bar">
      <router-link
        :to="{ name: 'all-crypto' }"
        class="currency-bar__back">
        <i class="fa fa-angle-left"/>
        <p>BACK</p>
      </router-link>
    </div>
    <div class="widget-body-wrapper">
      <div class="currency-container">
        <div class="currency-nav">
          <div class="currency-name">
            <div class="currency-name__ico">
              <img :src="cryptocurrency.logoUrl">
            </div>
            <p><span class="currency-name_bold">{{ cryptocurrency.name }}</span> ({{ cryptocurrency.symbol }})</p>
          </div>
          <div class="currency-links">
            <div
              v-for="link in links"
              :key="link.text"
              class="currency-link">
              <div class="currency-link__ico"><i :class="link.ico"/></div>
              <div class="currency-link__text">{{ link.text }}</div>
            </div>
          </div>
        </div>
        <div class="currency-info">
          <div class="currency-info__top">
            <div class="currency-info__top_left">
              <div class="currency-info__price">
                <span class="currency-info__price_bold">${{ cryptocurrency.price }}</span> USD
                <span :class="[cryptocurrency.change24H < 0 ? 'currency-info__price_red' : 'currency-info__price_green']">({{ cryptocurrency.change24H | addPlusSymbol }}%)</span>
              </div>
              <div class="currency-info__count">1.00000000 {{ cryptocurrency.symbol }}
                <span :class="[cryptocurrency.change1H < 0 ? 'currency-info__price_red' : 'currency-info__price_green']">({{ cryptocurrency.change1H | addPlusSymbol }}%)</span>
              </div>
            </div>
            <div class="currency-info__top_right">
              <button class="currency-info__button">Buy {{ cryptocurrency.name }}</button>
            </div>
          </div>
          <div class="currency-info__bottom">
            <div class="currency-info__row">
              <div class="currency-info__block">
                <p class="currency-info__block-title">Market cap</p>
                <p class="currency-info__block-marketCap">${{ cryptocurrency.marketCap | addComma}} USD</p>
                <p class="currency-info__block-count">{{ cryptocurrency.circulatingSupply | addComma}} {{ cryptocurrency.symbol }}</p>
              </div>
              <div class="currency-info__block">
                <p class="currency-info__block-title">Volume (24h)</p>
                <p class="currency-info__block-marketCap">${{ cryptocurrency.volume24H | addComma}} USD</p>
                <p class="currency-info__block-count">{{ cryptocurrency.circulatingSupply | addComma}} {{ cryptocurrency.symbol }}</p>
              </div>
            </div>
            <div class="currency-info__row">
              <div class="currency-info__block">
                <p class="currency-info__block-title">Circulating supply</p>
                <p class="currency-info__block-marketCap">{{ cryptocurrency.circulatingSupply | addComma}} {{ cryptocurrency.symbol }}</p>
              </div>
              <div class="currency-info__block">
                <p class="currency-info__block-title">Max Supply</p>
                <p class="currency-info__block-marketCap">{{ cryptocurrency.circulatingSupply | addComma}} {{ cryptocurrency.symbol }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SingleCrypto',
  filters: {
    addComma (val) {
      if (!val) return val
      let newVal = val.toString().split('.')[0]
      newVal = newVal.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return newVal
    },
    addPlusSymbol (val) {
      if (val < 0) return val
      return `+${val}`
    }
  },
  data () {
    return {
      cryptocurrency: {},
      links: [
        {
          text: 'website',
          ico: 'fa fa-link'
        },
        {
          text: 'website 2',
          ico: 'fa fa-link'
        },
        {
          text: 'explorer',
          ico: 'fa fa-search'
        },
        {
          text: 'explorer 2',
          ico: 'fa fa-search'
        },
        {
          text: 'explorer 3',
          ico: 'fa fa-search'
        },
        {
          text: 'message board',
          ico: 'fa fa-list-alt'
        },
        {
          text: 'message board 2',
          ico: 'fa fa-list-alt'
        },
        {
          text: 'Source code',
          ico: 'fa fa-server'
        }
      ]
    }
  },
  mounted () {
    this.cryptocurrency = this.$route.params.crypto
  }
}
</script>
<style lang="scss" scoped>
.currency-wrapper {
}

.currency-container {
  display: flex;
  justify-content: space-between;
  padding: 60px 80px 0 80px;
}

.currency {
  &-bar {
    color: #467291;
    display: flex;
    &__back {
      width: 56px;
      height: 30px;
      border-radius: 5px;
      background-color: #94a1b9;
      margin-bottom: 3px;
      color: white;
      font-size: 10px;
      letter-spacing: 0.3px;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        margin-left: 5px;
      }
    }
  }
  &-nav {
    height: 302px;
    width: 240px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
  &-name {
    font-size: 24px;
    margin-bottom: 20px;
    display: flex;
    white-space: nowrap;
    &_bold {
      font-weight: bold;
    }
    &__ico {
      width: 25px;
    }
  }
  &-links {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  &-link {
    display: flex;
    margin-bottom: 10px;
    text-transform: capitalize;
    color: #467291;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
    &__ico {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }
  &-info {
    height: 302px;
    width: 450px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    &__top {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      &_left {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
      &_right {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    &__price {
      font-size: 24px;
      &_bold {
        font-weight: bold;
      }
      &_red {
        color: #ef1217;
      }
      &_green {
        color: #22bb33;
      }
    }
    &__count {
      font-size: 16px;
    }
    &__button {
      width: 139px;
      height: 44px;
      border-radius: 4px;
      background-color: #36576f;
      color: white;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.2s;
      &:hover {
        background-color: #3a6c84;
      }
    }
    &__bottom {
      width: 100%;
    }
    &__row {
      display: flex;
      justify-content: space-between;
    }
    &__block {
      background-color: #f6f9fc;
      border-radius: 4px;
      padding: 10px;
      margin-top: 15px;
      width: 217px;
      &-title {
        color: #6a7c9c;
        margin-bottom: 10px;
      }
      &-marketCap {
        margin-bottom: 10px;
      }
      &-count {
        color: rgba(77, 77, 77, 0.8);
      }
    }
  }
}
</style>
