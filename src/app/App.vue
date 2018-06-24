<template>
  <layout>
    <router-view/>
  </layout>
</template>
<script lang="ts">
import Vue from 'vue'
import layout from '@/layouts/flex.vue'

export default Vue.extend({
  components: {
    layout,
  },
  created() {
    this.$store.dispatch(
      'setLocaleAsync',
      location.pathname.split('/')[1] || 'en',
    )
  },
})
</script>
<style lang="scss">
@import './scss/global.scss';
</style>
