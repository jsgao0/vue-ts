<template>
  <layout>
    <router-view/>
  </layout>
</template>
<script lang="ts">
import Vue from 'vue'
import { apiDomain } from '@/env/env'
import { ReqGet, ReqPost, ReqPut, ReqPatch, ReqDelete } from '@/utils/request'
import layout from '@/layouts/example.vue'
import { register } from '@/utils/manageStoreModules'
import locale from '@/store/lang/locale'
import en from '@/store/lang/en'

register([
  {
    name: 'locale',
    val: locale,
  },
  {
    name: 'en',
    val: en,
  },
])

export default Vue.extend({
  components: {
    layout,
  },
  created() {
    this.$store.dispatch('setLocaleAsync', 'en')
    ReqGet(apiDomain.self, 'example', { id: '1' }).then((res: {}) =>
      console.log(res),
    )
    ReqPost(apiDomain.self, 'example', { data: new Date() }).then((res: {}) =>
      console.log(res),
    )
    ReqPut(apiDomain.self, 'example', { data: {} }).then((res: {}) =>
      console.log(res),
    )
    ReqPatch(apiDomain.self, 'example', { d: 4 }).then((res: {}) =>
      console.log(res),
    )
    ReqDelete(apiDomain.self, 'example', { e: 5 }).then((res: {}) =>
      console.log(res),
    )
  },
})
</script>
