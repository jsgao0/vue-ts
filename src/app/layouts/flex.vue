<template>
  <div class="root flex ali-center jus-center">
    <v-header>
      <h1>Vue.ts</h1>
      <select v-model="language">
        <option value="en">English</option>
        <option value="zh-tw">繁體中文</option>
      </select>
    </v-header>
    <slot />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import vHeader from '@/components/shared/header/app.vue'
import en from '@/store/lang/en'
import zhTw from '@/store/lang/zh-tw'
import { register, unregister } from '@/utils/manageStoreModules'

export default Vue.extend({
  name: 'Layout',
  components: {
    vHeader,
  },
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
  background: $bg-color-white;
  color: $text-color-darkGreen;
  font-family: $font-family;
  text-align: center;
}
</style>
