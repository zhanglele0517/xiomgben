import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url' 



//   煤种数据库-分页获取
export const getList = (params) => request.get(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/coalTypeData/page`, { params })



//删除

export const deleteOrupdate = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/coalTypeData/delete`, data)




//添加或编辑
export const saveOrupdate = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/coalTypeData/saveOrupdate`, data)