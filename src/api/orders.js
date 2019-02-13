import http from './public'

// 生成订单
export const submitOrder = (params) => {
  return http.fetchPost('/orders/addOrder', params)
}
// 支付
export const payMent = (params) => {
  return http.fetchPost('/orders/payOrder', params)
}
// 获取用户订单
export const orderList = (params) => {
  return http.fetchGet('/orders/orderList', params)
}
// 获取单个订单详情
export const getOrderDet = (params) => {
  return http.fetchGet('/orders/orderDetail', params)
}
// 取消订单
export const cancelOrder = (params) => {
  return http.fetchPost('/orders/cancelOrder', params)
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchGet('/orders/delOrder', params)
}
