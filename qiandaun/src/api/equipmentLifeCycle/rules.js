import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url'

// 获取规程信息
export const getList = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceContent/page`, { params })

// 编辑规程信息
export const saveDeviceContent = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceContent/addOrUpdate`, data)
