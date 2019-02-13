// 注册账号
import http from './public'

export const register = (params) => {
  return http.fetchPost('/user/register', params)
}
export const uploadAvatar = (params) => {
  return http.fetchPost('/user/uploadAvatar', params)
}
// 用户信息
export const userInfo = (params) => {
  return http.fetchGet('/user/checkLogin', params)
}
