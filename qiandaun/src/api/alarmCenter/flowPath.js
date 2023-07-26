import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url'

// 条件获取报警记录
export const getList = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botAlarmRecord/getList`, { params })

// 查询关联人员
export const getRelacationUser = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botAlarmRecord/getRelacationUser`, { params })

// 确认处理
export const trueHandle = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botAlarmRecord/trueHandle`, { params })

// 确认评价
export const trueEvaluate = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botAlarmRecord/trueEvaluate`, { params })

// 确认响应
export const trueResponse = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botAlarmRecord/trueResponse`, { params })
