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
    selfReq
      .Get({ path: 'example', query: { id: '1' } })
      .then((res: {}) => console.log(res))
    selfReq.Post({ path: 'example' }).then((res: {}) => console.log(res))
    selfReq
      .Put({ path: 'example', payload: { data: {} } })
      .then((res: {}) => console.log(res))
    selfReq.Patch({ path: 'example' }).then((res: {}) => console.log(res))
    selfReq.Delete({ path: 'example' }).then((res: {}) => console.log(res))
  },
})
</script>
<style lang="scss">
@import './scss/global.scss';
</style>
