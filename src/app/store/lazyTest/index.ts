interface State {
  lazyText: string
}
export default {
  state: {
    lazyText: '動態測試',
  },
  getters: {
    dynamicText: (state: State): string => state.lazyText,
  },
  mutations: {},
  actions: {},
}
