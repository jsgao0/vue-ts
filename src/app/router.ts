import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue')
const About = () => import(/* webpackChunkName: "About" */ '@/views/About.vue')
const Error = () => import(/* webpackChunkName: "Error" */ '@/views/Error.vue')
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
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '*',
      name: 'error',
      component: Error,
    },
  ],
})
