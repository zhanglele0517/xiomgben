import request from '@/utils/request'
import moduleBaseUrl from '@/utils/module-base-url'
import qs from 'qs'

// 登录
export const login = (data) => request.post(`${moduleBaseUrl.VUE_APP_BASE_API_BASICS}/sysUser/login`, qs.stringify(data), {
  headers: { 'content-type': 'application/x-www-form-urlencoded' }
})
