<template>
  <div class="pb-main" :class="{ 'pb-main-vt': mode === 'vertical'}">
    <div class="bar" :style="{background: bgColor}">
      <div v-if="mode === 'horizontal'" class="current" :style="{width: state.val + '%', background: tintColor}"></div>
      <div v-else class="current" :style="{height: state.val + '%', background: tintColor}"></div>
    </div>
      <div v-if="mode === 'horizontal'">
        <div :id="state.id" class="percent-mirror" :style="{display: showCountUp ? 'block' : 'none', color: textColor}">
        </div>
        <div class="percent" :style="{color: textColor}" v-if="!showCountUp">
          <slot name="percent" v-bind:percent="percent">
          {{(percent || 0) + '%'}}
          </slot>
        </div>
      </div>
      <div v-else>
        <div :id="state.id" class="percent-mirror" :style="{display: showCountUp ? 'block' : 'none', color: textColor}">
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

export default {
  name: 'progressBar'
}

</script>

<script setup>

import { reactive, onMounted, onActivated, watch } from 'vue'
import { CountUp } from 'countup.js/dist/countUp.withPolyfill.min.js'
import { isNumberic, hash } from 'jstd'

const props = defineProps({
  percent: {
    type: [String, Number],
    required: true,
    default: '0'
  },
  tintColor: {
    type: String,
    default: 'rgb(0, 130, 251)'
  },
  bgColor: {
    type: String,
    default: 'rgba(0, 138, 251, 0.102)'
  },
  textColor: {
    type: String,
    default: '#999'
  },
  showCountUp: {
    type: Boolean,
    default: true
  },
  mode: {
    type: String,
    default: 'horizontal' // vertical
  }
})

const state = reactive({
  val: '0',
  cu: void 0,
  id: void 0
})

onMounted(() => {
  _in()
})

onActivated(() => {
  ca(props.percent)
})

const _in = () => {
  state.id = hash()
  ca(props.percent)
}

const ca = (nv, ov = 0) => {
  if (!isNumberic(nv)) {
    return
  }
  setTimeout(() => {
    state.cu = new CountUp(state.id, nv, { startVal: ov, suffix: '%', duration: 0.25 })
    se(nv <= 0 ? 0.001 : (nv > 100 ? 100 : nv))
  }, 500)
}

const se = (v) => {
  if (state.cu && !state.cu.error && props.showCountUp) {
    state.cu.start()
  }
  state.val = v
}

const up = (sv, nv, ov) => {
  se(sv)
  ca(nv, ov)
}

watch(() => props.percent, (v, o) => {
  up(0, v, o)
})
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
