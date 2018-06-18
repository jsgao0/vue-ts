<template>
  <div class="root">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <select v-model="language">
      <option disabled
              value="">Please select one</option>
      <option value="en">English</option>
      <option value="zh-tw">繁體中文</option>
    </select>
    <slot />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import en from '@/store/lang/en'
import zhTw from '@/store/lang/zh-tw'
import { register, unregister } from '@/utils/manageStoreModules'

export default Vue.extend({
  name: 'layout',
  computed: {
    language: {
      get(): string {
        return this.$store.getters.nowLanguage
      },
      set(val: string): void {
        switch (val) {
          case 'en':
            unregister(['zhTw'])
            register([
              {
                name: 'en',
                val: en,
              },
            ])
            this.$store.dispatch('setLocaleAsync', 'en')
            break
          case 'zh-tw':
            unregister(['en'])
            register([
              {
                name: 'zhTw',
                val: zhTw,
              },
            ])
            this.$store.dispatch('setLocaleAsync', 'zh-tw')
            break
        }
        return this.$store.getters.nowLanguage
      },
    },
  },
})
</script>

<style lang="scss">
@import '../scss/variable.scss';
.root {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color-darkGreen;
  nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: $text-color-darkGreen;
      &.router-link-exact-active {
        color: $text-color-lightGreen;
      }
    }
  }
}
</style>
