// pages/payment/paidMore/paidMore.js
var app = getApp()
var common = require('../../../service/common.js')
import {
  getMyIsPaid
} from '../../../service/payment.js'
Page({
  data: {
    paid: [
      // {
      //   id: 1,
      //   name: '第一次社区缴费项目',
      //   desc: '第一次缴费项目描述',
      //   standard: 100,
      //   creationDate: '2020-20-20',
      //   note: ''
      // },
      // {
      //   id: 2,
      //   name: '第二次社区缴费项目',
      //   desc: '第二次缴费项目描述',
      //   standard: 100,
      //   creationDate: '2020-20-20',
      //   note: ''
      // },
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
      // }
    ]
  },
  onLoad: function (options) {
    const hh_id = app.globalData.hh_id
    getMyIsPaid(hh_id,1).then(res => {
      const result = res.data
      console.log(result)
      if(result.status == 1) {
        this.setData({
          paid: result.data
        })
      }else {
        common.system_busy()
      } 
    })
  }
})