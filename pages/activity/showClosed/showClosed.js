// pages/activity/showClosed/showClosed.js
var common = require('../../../service/common.js')
var app = getApp()
import {
  getMyClosedActivity
} from '../../../service/activity.js'
Page({
  data: {
    closedActivities: [
      {
        id: 1,
        name: 'activity name',
        nums: 3,
        date: '2020-20-20'
      },
      {
        id: 2,
        name: 'activity name',
        nums: 2,
        date: '2121-21-21'
      }
    ]
  },
  //跳转活动详情页
  toActivity(e) {
    const act_id = e.currentTarget.dataset.value
    wx.navigateTo({
      url: '/pages/activity/showActivityItem/showActivityItem?id=' + act_id,
    })
  },
  onLoad: function (options) {
    const hh_id = app.globalData.hh_id
    // getMyClosedActivity(hh_id,/*参数未定*/).then(res => {
    //   const result = res.data
    //   if(result.status == 1) {
    //     this.setData({
    //       closedActivities: result.data
    //     })
    //   }else {
    //     common.system_busy()
    //   }
    // })
  }
})