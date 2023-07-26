import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url'
import qs from 'qs'

// 条件获取设计值表格
export const getList = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/workConditionDesign/getList`, { params })

// 添加设计值
export const saveWorkConditionDesign = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/workConditionDesign/saveWorkConditionDesign`, data)

// 删除设计值
export const deleteWorkConditionDesign = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/workConditionDesign/deleteWorkConditionDesign`, qs.stringify(data), {
  headers: { 'content-type': 'application/x-www-form-urlencoded' }
})
