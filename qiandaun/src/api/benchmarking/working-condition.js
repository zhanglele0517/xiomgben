import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url'

// 获取所属设计事件下拉框
export const getDesign = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/workConditionDetail/getDesign`, { params })

// 获取机组下拉框
export const getMachine = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/workConditionDetail/getMachine`, params)

// 条件获取工况表格
export const getList = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/workConditionDetail/getList`, { params })

// 添加工况
export const saveWorkConditionDetail = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/workConditionDetail/saveWorkConditionDetail`, data)

// 编辑工况
export const editWorkConditionDetail = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/workConditionDetail/editWorkConditionDetail`, data)

// 删除工况
export const deleteDesign = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/workConditionDetail/deleteDesign`, { params })
