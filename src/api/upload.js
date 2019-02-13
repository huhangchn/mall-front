// 上传图片
import http from './public'

export const uploadFile = (params) => {
  return http.fetchPost('/upload/uploadFile', params)
}
