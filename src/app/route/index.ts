import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import(/* webpackChunkName: "Home" */ './Home.vue')
const Error = () => import(/* webpackChunkName: "Error" */ './Error.vue')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/zh-tw',
      name: 'zh-tw',
      component: Home,
    },
    {
      path: '/en',
      name: 'en',
      component: Home,
    },
    {
      path: '*',
      name: 'error',
      component: Error,
    },
  ],
})
