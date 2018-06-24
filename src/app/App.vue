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
    switch (location.pathname.split('/')[1]) {
      case 'zh-tw':
        this.$store.dispatch('setLocaleAsync', 'zh-tw')
        break
      default:
        this.$store.dispatch('setLocaleAsync', 'en')
    }
  },
})
</script>
<style lang="scss">
@import './scss/global.scss';
</style>
