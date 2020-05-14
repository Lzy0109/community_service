// pages/info/showInfo/showInfo.js
var app = getApp()
var common = require('../../../service/info.js')
import {
  getHouseholdById
} from '../../../service/info.js'
Page({
  data: {
    household: {}
  },
  toUpdateInfo() {
    const household = JSON.stringify(this.data.household)
    wx.navigateTo({
      url: '/pages/info/updateInfo/updateInfo?household=' + household,
    })
  },
  onShow: function(options) {
    const hh_id = app.globalData.hh_id
    getHouseholdById(hh_id).then(res => {
      const result = res.data
      console.log(result)
      if(result.status == 1) {
        this.setData({
          household: result.data
        })
      }else {
        common.system.busy()
      }
    })
  }
})