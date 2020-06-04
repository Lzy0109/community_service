// pages/info/showInfo/showInfo.js
var app = getApp()
var common = require('../../../service/common.js')
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
      if (result.status == 200) {
        const household = result.data
        household.arrivalDate = household.arrivalDate.split('T')[0]
        this.setData({
          household: household
        })
      } else {
        common.errorStatus(result)
      }
    })
  }
})