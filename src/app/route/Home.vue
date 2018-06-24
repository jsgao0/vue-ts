<template>
  <div class="home">
    <p>{{ language }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    language(): string {
      return `${this.$store.getters.text('Default Language：en')}`
    },
  },
})
</script>
