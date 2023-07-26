import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url'

// 获取设备信息列表
export const getList = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceInfoMain/botDeviceInfoMainList`, { params })

// 获取设备类型数据
export const getDeviceInfoMain = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceInfoMain/getBotType`, { params })

// 删除设备信息
export const delBotDeviceType = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceInfoMain/delBotDeviceInfoMain`, data)
