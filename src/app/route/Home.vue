<template>
  <div class="home">
    <p>{{ language }}</p>
    <list-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import listView from '@/components/todolist/listView/app.vue'
import { register } from '@/utils/manageStoreModules'
import todolist from '@/store/todolist/'
register([
  {
    name: 'todolist',
    val: todolist,
  },
])
export default Vue.extend({
  components: { listView },
  computed: {
    language(): string {
      return `${this.$store.getters.text('Default Language：en')}`
    },
  },
  created() {
    this.$store.dispatch('getTodoListAsync')
  },
})
</script>
