import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/login.vue'
import Home from '../components/home.vue'
import NotFound from '../components/404.vue'

import Welcome from '../views/welcome.vue'
import Article from '../views/article.vue'
import Image from '../views/image.vue'
import Publish from '../views/publish.vue'
import Comment from '../views/comment.vue'
import Fans from '../views/fans.vue'
import Setting from '../views/setting.vue'

import Test from '@/test'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: Image },
        { path: '/publish', name: 'publish', component: Publish },
        { path: '/comment', name: 'comment', component: Comment },
        { path: '/fans', name: 'fans', component: Fans },
        { path: '/setting', name: 'setting', component: Setting }
      ]
    },
    { path: '/test', name: 'test', component: Test },
    { path: '*', name: 'notFound', component: NotFound }
  ]
})
