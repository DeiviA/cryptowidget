<template>
  <div class="dropdown-wrapper" @click.stop>
    <div class="dropdown-arrow"></div>
    <div class="dropdown-header">
      <span>{{ filterElement.text }}</span>
      <span
        @click="clearFilter"
        class="dropdown-header__clear">CLEAR</span>
    </div>
    <div class="dropdown-body">
      <div class="dropdown-body__row">
        <div class="dropdown-body__block">
          <p class="dropdown__label">From</p>
          <input v-model="minVal" type="text" class="dropdown__input">
        </div>
        <div class="dropdown-body__block">
          <p class="dropdown__label">To</p>
          <input v-model="currentValue" type="text" class="dropdown__input">
        </div>
      </div>
      <div class="dropdown-body__row">
        <div class="dropdown-body__slider-container">
          <vue-slide-bar
            v-model="currentValue"
            :min="+minVal"
            :max="+maxVal"
            :processStyle="slider.processStyle"
            :lineHeight="slider.lineHeight"
          >
            <template slot="tooltip" slot-scope="tooltip">
              <div class="dropdown-body__tooltip">
                <div class="dropdown-body__tooltip_circle"></div>
              </div>
            </template>
          </vue-slide-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlideBar from 'vue-slide-bar'
import debounce from 'debounce'
import { mapActions, mapGetters } from 'vuex'

import { eventBus } from '@/main'

export default {
  name: 'ADropDown',
  components: { VueSlideBar },
  props: {
    filterElement: {
      type: Object,
      required: true
    }
  },
  mounted () {
    const oldFilter = this.filterQuery[this.filterElement.key]
    this.maxVal = this.filterElement.max
    this.minVal = oldFilter ? oldFilter.min : this.filterElement.min
    this.currentValue = oldFilter ? oldFilter.max : this.filterElement.max
  },
  data () {
    return {
      currentValue: 470644499,
      minVal: 0,
      maxVal: 1000,
      slider: {
        lineHeight: 2,
        processStyle: {
          backgroundColor: '#36576f'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['filterQuery'])
  },
  watch: {
    currentValue: debounce(function () {
      this.applyFilter()
    }, 700),
    minVal: debounce(function () {
      this.applyFilter()
    }, 700)
  },
  methods: {
    ...mapActions(['addFilterQuery', 'removeFilterQuery']),
    applyFilter () {
      this.addFilterQuery({ key: this.filterElement.key, min: +this.minVal, max: this.currentValue })
      eventBus.$emit('filtering')
    },
    clearFilter () {
      this.removeFilterQuery({ key: this.filterElement.key })
      eventBus.$emit('filtering')
      eventBus.$emit('hideFilters')
    }
  }
}
</script>

<style lang="scss">
.dropdown-wrapper {
  width: 240px;
  position: absolute;
  top: 46px;
  right: 0;
  border: 1px solid #d8e2eb;
  border-radius: 5px;
  overflow: hidden;
}

.dropdown {
  &-arrow {
  }
  &-header {
    height: 30px;
    width: 100%;
    background-color: #36576f;
    padding: 0 10px;
    color: white;
    display: flex;
    justify-content: space-between;
    &__clear {
      cursor: pointer;
    }
  }
  &-body {
    width: 100%;
    /// height: 82px;
    padding: 10px;
    background-color: white;
    &__row {
      display: flex;
      justify-content: space-between;
    }
    &__block {
    }
    &__slider-container {
      width: 100%;
      position: relative;
    }
    &__tooltip {
      width: 14px;
      height: 14px;
      background-color: #36576f;
      position: absolute;
      bottom: -36px;
      left: 0;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &_circle {
        width: 6px;
        height: 6px;
        border-radius: 100%;
        background-color: #f7882f;
      }
    }
  }
  &__input {
    width: 104px;
    height: 28px;
    border-radius: 4px;
    font-size: 16px;
    line-height: 1.88;
    text-align: right;
    padding: 0 10px;
    border: solid 1px #d8e2eb;
  }
}
</style>
