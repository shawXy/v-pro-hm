import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/login.vue'
import Home from '../components/home.vue'
import NotFound from '../components/404.vue'

import Welcome from '../views/welcome.vue'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ]
    },
    { path: '*', name: 'notFound', component: NotFound }
  ]
})
