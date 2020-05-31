// pages/payment/PayDetail/PayDetail.js
var app = getApp()
var common = require('../../../service/common.js')
import {
  getPaymentById
} from '../../../service/payment.js'
Page({
  data: {
    payment: {}
  },
  onLoad: function (options) {
    const pay_id = options.id
    // 加载具体缴费项目信息
    getPaymentById(pay_id).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        this.setData({
          payment: result.data
        })
      }
      if (result.status == 401) {
        common.systemError()
      }
      if (result.status == 500) {
        common.systemBusy()
      }
    })
  }
})