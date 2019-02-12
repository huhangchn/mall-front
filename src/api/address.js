// 获取用户地址
import http from './public'

export const addressList = (params) => {
  return http.fetchPost('/user/addressList', params)
}
// 通过id获取地址
export const getAddress = (params) => {
  return http.fetchPost('/user/address', params)
}
// 修改收货地址
export const addressUpdate = (params) => {
  return http.fetchPost('/user/updateAddress', params)
}
// 添加收货地址
export const addressAdd = (params) => {
  return http.fetchPost('/user/addAddress', params)
}
// 删除收货地址
export const addressDel = (params) => {
  return http.fetchPost('/user/delAddress', params)
}
