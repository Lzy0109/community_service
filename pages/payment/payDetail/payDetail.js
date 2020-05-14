// pages/payment/PayDetail/PayDetail.js
var app = getApp()
var common = require('../../../service/common.js')
import {
  getPaymentById
} from '../../../service/payment.js'
Page({
  data: {
    pay_title: '缴费项目名称',
    pay_standard: '200.0',
    pay_household: '支付人姓名',
    pay_datetime: '2020-10-20',
    pay_status: 1,
    pay_desc: 'desc',
    payment: {}
  },
  onLoad: function (options) {
    const pay_id = options.id
    const hh_id = app.globalData.hh_id
    //加载具体缴费项目信息
    getPaymentById(hh_id,pay_id).then(res => {
      const result = res.data
      if(result.status == 1) {
        this.setData({
          payment: result.data
        })
      }else {
        common.system_busy()
      }
    })
  }
})