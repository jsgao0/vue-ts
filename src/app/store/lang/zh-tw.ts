import lang from '@/langs/zh-tw.json'
export default {
  state: {
    lang,
  },
  getters: {
    text: (state: any): any => (text: string): string => state.lang[text],
  },
  mutations: {},
  actions: {},
}
