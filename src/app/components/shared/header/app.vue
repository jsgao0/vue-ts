<template>
  <header class="col-12">
    <img class="logo-spin"
         :src="logoPng">
    <slot></slot>
  </header>
</template>
<script lang="ts">
import Vue from 'vue'
import { assetsPath } from '@/env/env'

export default Vue.extend({
  name: 'v-header',
  data() {
    return {
      logoPng: `${assetsPath}/logo.png`,
    }
  },
})
</script>

<style lang="scss">
@import '../../../scss/variable.scss';

header {
  background: $bg-color-black;
  color: $text-color-white;
  position: relative;
  .logo-spin {
    position: absolute;
    left: 30px;
    top: 10px;
    width: 45px;
    animation: circle-spin linear 9s infinite normal;
    &:hover {
      animation-play-state: paused;
    }
  }
}
@keyframes circle-spin {
  0% {
    transform: rotate(0deg);
  }
  11% {
    transform: rotate(120deg);
  }
  33% {
    transform: rotate(120deg);
  }
  44% {
    transform: rotate(240deg);
  }
  66% {
    transform: rotate(240deg);
  }
  77% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
