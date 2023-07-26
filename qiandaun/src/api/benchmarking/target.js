import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url'

// 条件获取指标对标信息
export const getList = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/workConditionDivision/page`, { params })

// 获取机组下拉框
export const getMachine = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/workConditionDivision/getMachine`, { params })

// 获取#1测点
export const getPointOne = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/workConditionDivision/getPointOne`, { params })

// 获取#2测点
export const getPointTwo = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/workConditionDivision/getPointTwo`, { params })

// 获取设计值
export const getDesign = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/workConditionDivision/getDesign`, { params })

// 添加或编辑指标对标信息
export const saveOreditWorkConditionDivision = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/workConditionDivision/saveOreditWorkConditionDivision`, data)

// 删除指标对标信息
export const deleteWorkConditionDetail = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/workConditionDivision/deleteWorkConditionDetail`, { params })


