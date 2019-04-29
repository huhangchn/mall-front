import http from './public'
// 登陆
export const userLogin = (params) => {
  return http.fetchPost('/member/login', params)
}
// 退出登陆
export const loginOut = (params) => {
  return http.fetchGet('/member/loginOut', params)
}

// 修改头像
// export const updateheadimage = (params) => {
//   return http.fetchPost('/member/updateheadimage', params)
// }
// 极验验证码
// export const geetest = (params) => {
//   return http.fetchGet('/member/geetestInit?t=' + (new Date()).getTime(), params)
// }

