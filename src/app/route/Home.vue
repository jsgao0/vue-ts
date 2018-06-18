<template>
  <div class="home">
    <img :src="logoPng">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <p>{{ language }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from '@/components/shared/HelloWorld/app.vue'
import { assetsPath } from '@/env/env'

export default Vue.extend({
  components: {
    HelloWorld,
  },
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
