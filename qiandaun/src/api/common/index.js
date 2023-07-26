
import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url'

// 查询人员
export const getRelacationUser = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/common/getRelacationUser`, { params })

// 查询设备
export const getDevices = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/common/getDevices`, { params })

// 上传文件
export const upload = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/common/upload`, data, {
  headers: { 'content-type': 'application/x-www-form-urlencoded' }
})
