import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url'

// 获取设备类型
export const getList = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceType/getBotDeviceTypeTree`, { params })

// 添加设备类型
export const addBotDeviceType = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceType/addBotDeviceType`, data)

// 编辑设备类型
export const updateBotDeviceType = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceType/updateBotDeviceType`, data)

// 删除设备类型
export const delBotDeviceType = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceType/delBotDeviceType`, data)
