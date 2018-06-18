<template>
  <header class="col-12">
    <slot></slot>
  </header>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'v-header',
})
</script>

<style lang="scss">
@import '../../../scss/variable.scss';

header {
  background: $bg-color-black;
  color: $text-color-white;
}
</style>
