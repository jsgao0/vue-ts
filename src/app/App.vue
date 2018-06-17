<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { apiDomain } from '@/env/env'
import { ReqGet, ReqPost, ReqPut, ReqPatch, ReqDelete } from '@/utils/request'
export default Vue.extend({
  created() {
    ReqGet(apiDomain.self, 'example', { a: '1' }).then((res: {}) =>
      console.log(res),
    )
    ReqPost(apiDomain.self, 'example', { b: 2 }).then((res: {}) => console.log(res))
    ReqPut(apiDomain.self, 'example', { c: 3 }).then((res: {}) => console.log(res))
    ReqPatch(apiDomain.self, 'example', { d: 4 }).then((res: {}) =>
      console.log(res),
    )
    ReqDelete(apiDomain.self, 'example', { e: 5 }).then((res: {}) =>
      console.log(res),
    )
  },
})
</script>

<style lang="scss">
@import './scss/variable.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
