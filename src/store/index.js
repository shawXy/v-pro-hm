const KEY = 'pro-hm'
export default {
  // 存储用户信息
  setUser (user) {
    const userinfo = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, userinfo)
  },
  // 获取用户信息
  getUser () {
    // 如果是空字符串就返回空对象
    const userInfo = window.sessionStorage.getItem(KEY) || '{}'
    return JSON.parse(userInfo)
  },
  // 清空用户信息
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
