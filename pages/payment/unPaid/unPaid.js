// pages/payment/unpaidMore/unpaidMore.js
var app = getApp()
var common = require('../../../service/common.js')
import {
  getMyUnPaid
} from '../../../service/payment.js'
Page({
  data: {
    dialog_id: '',
    dialog_title: '',
    dislog_desc: '',
    show: false,
    buttons: [
      {
        type: 'default',
        text: '取消',
        value: 0
      },
      {
        type: 'primary',
        text: '去支付',
        value: 1
      }
    ],
    // 未缴费项目
    unpaid: [],
  },
  openDialog(e) {
    console.log(e)
    const charId = e.currentTarget.dataset.value
    const payment = this.data.unpaid.find((item) => {
      return item.charId == charId
    })
    console.log(payment)
    // 获取点击项目的title和desc
    this.setData({
      dialog_id: payment.id, // 点击的缴费项目id
      dialog_title: payment.chargeName,
      dialog_desc: payment.description,
      show: true
    })
  },
  toPay(e) {
    // 获取点击的pay_id
    if (e.detail.index == 1) {
      this.setData({
        show: false
      })
      wx.navigateTo({
        url: '/pages/payment/toPay/toPay?id=' + this.data.dialog_id,
      })
    }
    if (e.detail.index == 0) {
      this.setData({
        show: false
      })
    }
  },
  onShow: function (options) {
    const hh_id = app.globalData.hh_id
    getMyUnPaid(hh_id, 0).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        this.setData({
          unpaid: result.data
        })
      } else {
        common.errorStatus(result)
      }
    })
  }
})