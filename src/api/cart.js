import http from './public'
// 获取购物车列表
export const getCartList = (params) => {
  return http.fetchPost('/cart/cartList', params)
}
// 加入购物车
export const addCart = (params) => {
  return http.fetchPost('/cart/addCart', params)
}
// 删除购物车
export const delCart = (params) => {
  return http.fetchPost('/cart/delCart', params)
}
// 删除购物车勾选商品
export const delCartChecked = (params) => {
  return http.fetchPost('/cart/delCartChecked', params)
}
// 编辑购物车
export const cartEdit = (params) => {
  return http.fetchPost('/cart/cartEdit', params)
}
// 全选
export const editCheckAll = (params) => {
  return http.fetchPost('/cart/editCheckAll', params)
}
// 删除整条购物车
export const cartDel = (params) => {
  return http.fetchPost('/cart/cartDel', params)
}
