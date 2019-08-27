import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from '@/router'
import './styles/index.less'
import axios from '@/api'
import store from '@/store'

Vue.prototype.$http = axios

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  // 获取用户信息里的token
  // 如果没有token就返回登录页面
  const token = store.getUser().token
  if (to.path !== '/login' && !token) { return next('/login') }
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
