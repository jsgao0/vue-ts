import { shallowMount } from '@vue/test-utils'
import HelloWorld from './app.vue'
describe('global/paginate', () => {
  it('測試範例', () => {
    const text = 'Welcome to Your Vue.js + TypeScript App'
    const wrapper = shallowMount(HelloWorld, {
      propsData: {
        msg: text,
      },
    })
    expect(wrapper.find('.hello h1').text()).toEqual(text)
  })
})
