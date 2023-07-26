import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url'

// 获取机组
export const getMachine = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceInfoMain/getMachine`, { params })

// 获取厂家供应信息
export const getManufactor = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceInfoMain/getManufactor`, { params })

// 获取设备信息
export const getBotDeviceInfoMainDetail = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceInfoMain/getInfoData`, { params })

// 添加设备信息
export const addBotDeviceInfoMain = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceInfoMain/addBotDeviceInfoMain`, data)

// 修改设备信息
export const updateBotDeviceInfoMain = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceInfoMain/updateBotDeviceInfoMain`, data)

