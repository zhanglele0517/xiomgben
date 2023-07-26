import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url'

// 获取系统配置
export const getList = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botSystemOpction/page`, { params })

// 添加或编辑系统配置
export const saveSystemOpction = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botSystemOpction/saveOrupdate`, data)

// 删除系统配置
export const deleteSystemOpction = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botSystemOpction/delete`, data)
