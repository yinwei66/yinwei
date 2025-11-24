import request from '@/util/request'

// 用户登录
export function userLogin(data) {
    return request({
      url: '/dev-api/login',
      method: 'post',
      data: data
    })
}

// 查询用户信息
export function userInfo() {
    return request({
      url: '/dev-api/getInfo',
      method: 'get'
    })
}
export function car() {
    return request({
      url: '/dev-api/bs-car/car/list',
      method: 'get'
    })
}
export function xgzt(data) {
    return request({
      url: '/dev-api/bs-smart-charger-biz/CarState/',
      method: 'put',
	  data:data
    })
}
export function clzt(data) {
    return request({
      url: '/dev-api/bs-smart-charger-biz/CarState/'+data,
      method: 'get'
    })
}
export function carsj(data) {
    return request({
      url: '/dev-api/bs-vehicle-owner/carInfo/getByCarId/'+data,
      method: 'get'
    })
}
export function sjhq() {
    return request({
      url: '/dev-api/bs-vehicle-owner/maintenance-plan/randomList',
      method: 'get'
    })
}
export function hqxqs(data) {
    return request({
      url: '/dev-api/bs-vehicle-owner/maintenance-appointment/page',
      method: 'get',
	  params:data
    })
}
export function wbfwz(data) {
    return request({
      url: '/dev-api/bs-vehicle-owner/maintenance-service-station/list',
      method: 'post',
	  data:data
    })
}
export function zf(data) {
    return request({
      url: '/dev-api/bs-vehicle-owner/maintenance-pay',
      method: 'post',
	  data:data
    })
}
export function wbxz(data) {
    return request({
      url: '/dev-api/bs-vehicle-owner/maintenance-appointment',
      method: 'post',
	  data:data
    })
}
export function xg(data) {
    return request({
      url: '/dev-api/bs-vehicle-owner/maintenance-pay',
      method: 'put',
	  data:data
    })
}