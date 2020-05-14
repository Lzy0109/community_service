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
    //未缴费项目
    unpaid: [
      // {
      //   id: 3,
      //   name: '第三次社区缴费项目',
      //   desc: '第三次缴费项目描述',
      //   standard: 100,
      //   creationDate: '2020-20-20',
      //   note: ''
      // },
      // {
      //   id: 4,
      //   name: '第四次社区缴费项目',
      //   desc: '第四次缴费项目描述',
      //   standard: 100,
      //   creationDate: '2020-20-20',
      //   note: ''
      // },
      // {
      //   id: 5,
      //   name: '第五次社区缴费项目',
      //   desc: '第五次缴费项目描述',
      //   standard: 100,
      //   creationDate: '2020-20-20',
      //   note: ''
      // },
      // {
      //   id: 6,
      //   name: '第六次社区缴费项目',
      //   desc: '第六次缴费项目描述',
      //   standard: 100,
      //   creationDate: '2020-20-20',
      //   note: ''
      // }
    ],
  },
  openDialog(e) {
    console.log(e)
    const char_id = e.currentTarget.dataset.value
    //获取点击项目的title和desc
    this.setData({
      dialog_id: char_id, //点击的缴费项目id
      dialog_title: '点击的缴费项目',
      dialog_desc: '点击的缴费项目描述',
      show: true
    })
  },
  toPay(e) {
    //获取点击的pay_id
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
  onLoad: function (options) {
    const hh_id = app.globalData.hh_id
    getMyUnPaid(hh_id, 0).then(res => {
      const result = res.data
      if (result.status == 1) {
        this.setData({
          unpaid: result.data
        })
      } else {
        common.system_busy()
      }
    })
  }
})