// 首页接口
import http from './public'

export const getHomeContent = (params) => {
  return http.fetchGet('/home/content', params)
}
