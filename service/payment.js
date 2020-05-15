import request from './network.js'

//获取我的未缴费项目
export function getMyUnPaid(householdId, payStatus) {
  return request({
    url: '/payment?householdId=' + householdId + '&payStatus=' + payStatus
  })
}
//获取我的已缴费项目
export function getMyIsPaid(householdId, payStatus) {
  return request({
    url: '/payment?householdId=' + householdId + '&payStatus=' + payStatus
  })
}
//根据住户id、Payment id获取
export function getPaymentById(hh_id,pay_id) {
  return request({
    url: '',
  })
}
//提交缴费
export function pay(payment) {
  return request({
    url: ''
  })
}