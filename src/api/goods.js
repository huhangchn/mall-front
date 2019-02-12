import http from './public'

// 商品列表
export const getAllGoods = (params) => {
  return http.fetchGet('/goods/allGoods', params)
}
// 商品详情
export const productDet = (params) => {
  return http.fetchGet('/goods/productDet', params)
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
