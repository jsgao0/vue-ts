<template>
  <div>
    <h1>{{ noPage }}</h1>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    noPage(): string {
      return this.$store.getters.text('Not Found...')
    },
  },
})
</script>
