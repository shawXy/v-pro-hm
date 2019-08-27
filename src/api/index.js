import axios from 'axios'
import store from '@/store'
import router from '../router'

// 配置axios默认地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 将token存储在请求头中
// axios.defaults.headers.Authorization = 'bearer' + store.getUser().token

// 请求拦截器：在请求前将token添加到请求头中
axios.interceptors.request.use(config => {
  axios.defaults.headers.Authorization = 'Bearer' + store.getUser().token
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器：token在后台只会存储2个小时，
// 当超过之后，需要后台返回错误码401表示，token失效，然后跳转login重新登录
axios.interceptors.response.use(res => {
  return res
}, err => {
  // console.log(err)
  if (err.response.status === 401) {
    store.delUser()
    router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
