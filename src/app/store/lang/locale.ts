interface State {
  now: string
}

export default {
  state: {
    now: '',
  },
  getters: {
    nowLanguage: (state: State) => state.now,
  },
  mutations: {
    setLocale(state: State, payload: string) {
      state.now = payload
    },
  },
  actions: {
    setLocaleAsync(context: any, payload: string) {
      context.commit('setLocale', payload)
    },
  },
}
