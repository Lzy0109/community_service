import request from './network.js'
// 封装Payment类
export class Payment {
  constructor(payment) {
    this.id = payment.id;
    this.householdId = payment.householdId;
    this.charId = payment.charId;
    this.charStandard = payment.charStandard;
    this.payReal = payment.payReal;
    this.payStatus = payment.payStatus;
    this.payDate = payment.payDate;
  }
}
// 获取我的未缴费项目
export function getMyUnPaid(householdId, payStatus) {
  return request({
    url: '/payment?householdId=' + householdId + '&payStatus=' + payStatus
  })
}
// 获取我的已缴费项目
export function getMyIsPaid(householdId, payStatus) {
  return request({
    url: '/payment?householdId=' + householdId + '&payStatus=' + payStatus
  })
}
// 根据Payment id获取
export function getPaymentById(id) {
  return request({
    url: '/payment/' + id,
  })
}
// 缴费操作
export function pay(payment) {
  return request({
    url: '/payment',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      _method: 'PUT',
      id: payment.id,
      charId: payment.charId,
      householdId: payment.householdId,
      charStandard: payment.charStandard,
      payReal: payment.payReal,
      payStatus: payment.payStatus,
      payDate: payment.payDate
    }
  })
}