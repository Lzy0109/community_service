// pages/payment/toPay/toPay.js
var app = getApp()
var util = require('../../../utils/util.js')
var common = require('../../../service/common.js')
import {
  getPaymentById,
  Payment,
  pay
} from '../../../service/payment.js'
Page({
  data: {
    payment: {},
  },
  payment_click() {
    // 封装数据
    const payment = new Payment(this.data.payment) 
    payment.id = this.data.payment.id;
    payment.householdId = this.data.payment.householdId;
    payment.charId = this.data.payment.charId;
    payment.charStandard = this.data.payment.charStandard;
    // 默认全款支付
    payment.payReal = this.data.payment.charStandard;
    payment.payStatus = 1;
    payment.payDate = util.formatTime(new Date())
    console.log(payment)
    // 发送网络请求
    pay(payment).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        wx.showToast({
          title: '支付成功',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
          }
        })
      }
      if (result.status == 401) {
        common.systemPutError()
      }
      if (result.status == 500) {
        common.systemBusy()
      }
    })
  },
  onLoad: function (options) {
    const id = options.id
    console.log(id)
    // 发送网络请求获取缴费项目数据
    getPaymentById(id).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        this.setData({
          payment: result.data
        })
      }
      if (result.status == 401) {
        common.systemGetError()
      }
      if (result.status == 500) {
        common.systemBusy()
      }
    })
  }
})