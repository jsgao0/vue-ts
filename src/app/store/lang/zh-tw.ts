import lang from '@/langs/zh-tw.json'

interface State {
  lang: {
    [keys: string]: string | undefined
  }
}

export default {
  state: {
    lang,
  },
  getters: {
    text: (state: State): ((text: string) => string) => (
      text: string,
    ): string => state.lang[text] || '',
  },
  mutations: {},
  actions: {},
}
