<template>
  <div>
    <h1>{{ noPage }}</h1>
    <p>{{ dynamicText }}</p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import store from '@/store/index'
import lazyTest from '@/store/lazyTest/'

store.registerModule(['lazyTest'], lazyTest)
export default Vue.extend({
  name: 'error',
  computed: {
    ...mapGetters({
      dynamicText: 'dynamicText',
    }),
    noPage(): string {
      return this.$store.getters.text('Not Found...')
    },
  },
})
</script>
