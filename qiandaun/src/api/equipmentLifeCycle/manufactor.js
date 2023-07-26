import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url'

// 获取生产厂家
export const getList = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botManufactor/page`, { params })

// 添加或编辑生产厂家
export const saveOrUpdateBotManufactor = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botManufactor/saveOrUpdateBotManufactor`, data)

// 删除生产厂家
export const deleteBotManufactor = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botManufactor/delete`, data)
