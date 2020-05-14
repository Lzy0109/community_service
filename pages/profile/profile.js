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
    //退出登录 清空全局数据
    console.log("退出登录 清空全局数据")
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
      if(result.status == 1){
        this.setData({
          household: result.data
        })
      }else {
        common.system_busy()
      }
    })
  }
})