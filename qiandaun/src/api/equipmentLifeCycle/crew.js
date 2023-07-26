import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url'

// 获取机组
export const getList = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/commonUnit/page`, { params })

// 添加或编辑机组
export const saveOrupdate = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/commonUnit/saveOrupdate`, data)

// 删除机组
export const deleteOrupdate = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/commonUnit/delete`, data)
