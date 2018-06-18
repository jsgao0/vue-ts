<template>
  <div>
    <h1>flexbox layout</h1>
    <slot />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'layout'
})
</script>

<style lang="scss">
@import '../scss/variable.scss';
html {
  background: $bg-color-brown;
  color: $text-color-black;
}
</style>
