export default {
  state: {
    lazyText: '動態測試',
  },
  getters: {
    dynamicText: (state: any): string => state.lazyText,
  },
  mutations: {},
  actions: {},
}
