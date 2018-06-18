import store from '@/store/index'

interface RegisterModule {
  name: string
  val: {
    state?: {}
    getters?: {}
    mutations?: {}
    actions?: {}
  }
}

export const register = (modules: RegisterModule[]) => {
  modules.forEach((e) => {
    store.registerModule([e.name], e.val)
  })
}
export const unregister = (modules: string[]) => {
  modules.forEach((e) => {
    store.unregisterModule([e])
  })
}
