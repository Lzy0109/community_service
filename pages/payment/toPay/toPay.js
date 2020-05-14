// pages/payment/toPay/toPay.js
var app = getApp()
var common = require('../../../service/common.js')
import {
  pay
} from '../../../service/payment.js'
Page({
  data: {
    pay_title: '缴费项目名称',
    pay_standard: '100.0',
    pay_household: '支付人姓名',
  },
  payment_click() {
    //发送网络请求
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
  },
  onLoad: function (options) {
    console.log(options.id)
    //发送网络请求获取缴费项目数据
    // this.setData({

    // })
    //获取用户id姓名 日期 设置状态 实际支付价钱
    //用于提交缴费记录
  }
})