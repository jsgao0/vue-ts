import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import locale from './lang/locale'

Vue.use(Vuex)
export default new Store({
  modules: {
    locale,
  },
})
