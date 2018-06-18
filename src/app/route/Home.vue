<template>
  <div class="home">
    <img :src="logoPng">
    <p>{{ language }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { assetsPath } from '@/env/env'

export default Vue.extend({
  data() {
    return {
      logoPng: `${assetsPath}/logo.png`,
    }
  },
  computed: {
    language(): string {
      return `${this.$store.getters.text('Default Language：en')}`
    },
  },
})
</script>
