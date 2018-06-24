<template>
  <layout>
    <router-view/>
  </layout>
</template>
<script lang="ts">
import Vue from 'vue'
import { selfReq } from '@/utils/request'
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
    selfReq.Get({ path: 'list/1' }).then((res: {}) => console.log(res))
    selfReq
      .Post({ path: 'list', payload: { name: '1', description: '1' } })
      .then((res: {}) => console.log(res))
    selfReq
      .Put({ path: 'list/1', payload: { name: '2', description: '2' } })
      .then((res: {}) => console.log(res))
    selfReq.Patch({ path: 'list/1', payload: { name: '3', description: '3' } }).then((res: {}) => console.log(res))
    selfReq.Delete({ path: 'list/1' }).then((res: {}) => console.log(res))
  },
})
</script>
<style lang="scss">
@import './scss/global.scss';
</style>
