// pages/payment/paidMore/paidMore.js
var app = getApp()
var common = require('../../../service/common.js')
import {
  getMyIsPaid
} from '../../../service/payment.js'
Page({
  data: {
    paid: []
  },
  onShow: function (options) {
    const hh_id = app.globalData.hh_id
    getMyIsPaid(hh_id, 1).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        this.setData({
          paid: result.data
        })
      } else {
        common.systemBusy()
      } 
    })
  }
})