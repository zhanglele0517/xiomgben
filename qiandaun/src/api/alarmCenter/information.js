import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url'

// 根据字典name获取字典信息
export const getValueByName = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/dictionaries/getValueByName`, { params })

// 获取树结构数据
export const getTreeData = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botReportDevice/getTreeData`, { params })

// 获取树结构数据
export const getRelacationUser = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botReportDevice/getRelacationUser`, { params })

// 根据设备类型获取设备信息
export const getDeviceByType = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botReportDevice/getDeviceByType`, { params })

// 获取测点
export const getPoint = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botReportDevice/getPoint`, { params })

// 树详情-报警类型下拉框
export const getReportType = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botReportDevice/getReportType`, { params })

// 获取设备类型
export const getDeviceType = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botReportDevice/getDeviceType`, { params })

// 获取报警规则详情
export const getBotDeviceInfo = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botReportDevice/getBotDeviceInfo`, { params })

// 获取报警规则详情--故障原因表格
export const getBotDeviceInfoCases = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botReportDevice/getBotDeviceInfoCases`, { params })

// 报价规则添加
export const saveBotReportDevice = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botReportDevice/saveBotReportDevice`, data)

// 报价规则编辑
export const editBotReportDevice = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botReportDevice/editBotReportDevice`, data)

// 删除某一个原因
export const deleteCase = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botReportCase/deleteCase`, data)

// 删除一个规则
export const deleteReportDevice = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/botReportDevice/deleteReportDevice`, { params })

