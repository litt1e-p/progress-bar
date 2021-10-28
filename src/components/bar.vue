<template>
  <div class="pb-main" :class="{ 'pb-main-vt': mode === 'vertical'}">
    <div class="bar" :style="{background: bgColor}">
      <div v-if="mode === 'horizontal'" class="current" :style="{width: val + '%', background: tintColor}"></div>
      <div v-else class="current" :style="{height: val + '%', background: tintColor}"></div>
    </div>
      <div v-if="mode === 'horizontal'">
        <div :id="id" class="percent-mirror" :style="{display: showCountUp ? 'block' : 'none', color: textColor}">
        </div>
        <div class="percent" :style="{color: textColor}" v-if="!showCountUp">
          <slot name="percent" v-bind:percent="percent">
          {{(percent || 0) + '%'}}
          </slot>
        </div>
      </div>
      <div v-else>
        <div :id="id" class="percent-mirror" :style="{display: showCountUp ? 'block' : 'none', color: textColor}">
        </div>
        <div class="percent" :style="{color: textColor}" v-if="!showCountUp">
          <slot name="percent" v-bind:percent="percent">
          {{(percent || 0) + '%'}}
          </slot>
        </div>
      </div>
  </div>
</template>

<script>

import { CountUp } from 'countup.js/dist/countUp.withPolyfill.min.js'
import { isNumberic } from 'jstd'

export default {
  name: 'progressBar',
  props: {
    percent: {
      type: [String, Number],
      required: true,
      default: () => '0'
    },
    tintColor: {
      type: String,
      default: () => 'rgb(0, 130, 251)'
    },
    bgColor: {
      type: String,
      default: () => 'rgba(0, 138, 251, 0.102)'
    },
    textColor: {
      type: String,
      default: () => '#999'
    },
    showCountUp: {
      type: Boolean,
      default: () => true
    },
    mode: {
      type: String,
      default: 'horizontal' // vertical
    }
  },
  data () {
    return {
      val: '0',
      cu: void 0,
      id: void 0
    }
  },
  mounted () {
    this.in()
  },
  activated () {
    this.ca(this.percent)
  },
  methods: {
    in () {
      this.id = this.ha()
      this.ca(this.percent)
    },
    ha (n = 7) {
      return (Math.random() * 0xFFFFFF << n).toString(16)
    },
    ca (nv, ov = 0) {
      if (!isNumberic(nv)) {
        return
      }
      setTimeout(() => {
        this.cu = new CountUp(this.id, nv, { startVal: ov, suffix: '%', duration: 0.25 })
        this.se(nv <= 0 ? 0.001 : (nv > 100 ? 100 : nv))
      }, 500)
    },
    se (v) {
      if (this.cu && !this.cu.error && this.showCountUp) {
        this.cu.start()
      }
      this.val = v
    },
    up (sv, nv, ov) {
      this.se(sv)
      this.ca(nv, ov)
    }
  },
  watch: {
    percent (nv, ov) {
      this.up(0, nv, ov)
    }
  }
}
</script>

<style lang="less" scoped>
.pb-main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  .percent {
    opacity: 1;
    color: rgba(0, 138, 251, 0.102);
    text-align: left;
    font-size: 14px;
    margin-left: 0.25em;
    width: 2em;
    transition: color .25s linear;
  }
  .bar {
    height: 0.5em;
    width: 60%;
    border-width: 0;
    position: relative;
    border-radius: 0.25em;
    margin-left: 0.6em;
    .current {
      width: 0;
      border-width: 0;
      position: absolute;
      left: 0;
      top: 0;
      height: 0.5em;
      background: inherit;
      border: none;
      border-radius: 0.5em;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      transition: width .5s cubic-bezier(0.175, 0.885, 0.32, 1.155);
    }
  }
}
.pb-main-vt {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .percent {
    opacity: 1;
    color: rgba(0, 138, 251, 0.102);
    text-align: left;
    font-size: 14px;
    height: 2em;
    transition: color .25s linear;
  }
  .bar {
    width: 0.5em;
    height: 60%;
    border-width: 0;
    position: relative;
    border-radius: 0.25em;
    margin-top: 0.6em;
    margin-left: 0;
    .current {
      height: 0;
      border-width: 0;
      position: absolute;
      left: 0;
      top: unset;
      bottom: 0;
      width: 0.5em;
      background: inherit;
      border: none;
      border-radius: 0.5em;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      transition: height .5s cubic-bezier(0.175, 0.885, 0.32, 1.155);
    }
  }
}
</style>
