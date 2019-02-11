import http from './public'

// 商品列表
export const getAllGoods = (params) => {
  return http.fetchGet('/goods/allGoods', params)
}
// 获取用户地址
export const addressList = (params) => {
  return http.fetchPost('/member/addressList', params)
}
// 通过id获取地址
export const getAddress = (params) => {
  return http.fetchPost('/member/address', params)
}
// 修改收货地址
export const addressUpdate = (params) => {
  return http.fetchPost('/member/updateAddress', params)
}
// 添加收货地址
export const addressAdd = (params) => {
  return http.fetchPost('/member/addAddress', params)
}
// 删除收货地址
export const addressDel = (params) => {
  return http.fetchPost('/member/delAddress', params)
}
// 生成订单
export const submitOrder = (params) => {
  return http.fetchPost('/member/addOrder', params)
}
// 支付
export const payMent = (params) => {
  return http.fetchPost('/member/payOrder', params)
}
// 获取用户订单
export const orderList = (params) => {
  return http.fetchGet('/member/orderList', params)
}
// 获取单个订单详情
export const getOrderDet = (params) => {
  return http.fetchGet('/member/orderDetail', params)
}
// 取消订单
export const cancelOrder = (params) => {
  return http.fetchPost('/member/cancelOrder', params)
}
// 商品详情
export const productDet = (params) => {
  return http.fetchGet('/goods/productDet', params)
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchGet('/member/delOrder', params)
}
// 商品列表
export const getSearch = (params) => {
  return http.fetchGet('/goods/search', params)
}
// 顶部搜索
export const searchByKey = (params) => {
  return http.fetchGet('/goods/searchByKey', params)
}
// 快速搜索
export const getQuickSearch = (params) => {
  return http.fetchGet('/goods/quickSearch', params)
}
// 获取属性列表
export const getAttributeList = (params) => {
  return http.fetchGet('/goods/attributeList', params)
}
export const searchByCondition = (params) => {
  return http.fetchPost('/goods/search', params)
}
export const productSaleInfo = (params) => {
  return http.fetchGet('/goods/productSaleInfo', params)
}
export const getBrandList = (params) => {
  return http.fetchGet('/goods/brandList', params)
}
export const getCategoryList = (params) => {
  return http.fetchGet('/goods/categoryList', params)
}
export const productDetBySkuId = (params) => {
  return http.fetchGet('/goods/productDetBySkuId', params)
}
export const goodsIdBySkuId = (params) => {
  return http.fetchGet('/goods/goodsIdBySkuId', params)
}
