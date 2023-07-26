
import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url'

// 获取检修定期工作管理配置列表接口
export const getList = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceOverWorking/pageOption`, { params })

// 添加、编辑检修工作任务-配置
export const saveDeviceOverWorkingOption = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceOverWorking/saveOrupdateOption`, data)

// 添加、编辑检修工作任务-配置
export const deleteDeviceOverWorkingOption = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceOverWorking/deleteOption`, data)
