// pages/profile/profile.js
var app = getApp()
var common = require('../../service/common.js')
import {
  getHouseholdById
} from '../../service/info.js'
Page({
  data: {
    household: {}
  },
  loginout() {
    // 退出登录 清空全局数据
    app.globalData.hh_id = ""
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  onLoad: function (options) {
    const id = app.globalData.hh_id
    getHouseholdById(id).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        this.setData({
          household: result.data
        })
      }
      if (result.status == 401) {
        common.systemGetError()
      }
      if (result.status == 500) {
        common.system_busy()
      }
    })
  }
})