import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url'

// 获取检修定期工作管理列表接口
export const getList = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceOverWorking/page`, { params })

// 编辑检修工作任务
export const saveDeviceOverWorking = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceOverWorking/saveOrupdate`, data)

// 删除检修工作任务
export const deleteDeviceOverWorking = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botDeviceOverWorking/delete`, data)
