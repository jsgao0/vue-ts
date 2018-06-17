<template>
  <div class="home">
    <img src="/assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from '@/components/shared/HelloWorld/app.vue'

export default Vue.extend({
  name: 'home',
  components: {
    HelloWorld,
  },
})
</script>
