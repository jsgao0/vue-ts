import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import zhTw from './lang/zh-tw'

Vue.use(Vuex)
export default new Store(zhTw)
