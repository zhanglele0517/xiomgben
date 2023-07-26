import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url'

// 获取参数名称
export const getPoint = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botAlarmRecordWarning/getPoint`, { params })

// 条件获取预警记录
export const getList = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botAlarmRecordWarning/getList`, { params })
