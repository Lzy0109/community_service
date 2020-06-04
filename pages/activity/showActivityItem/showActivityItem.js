// pages/activity/showActivityItem/showActivityItem.js
var util = require('../../../utils/util.js')
var common = require('../../../service/common.js')
var app = getApp()
import {
  getActivityById
} from '../../../service/activity.js'
Page({
  data: {
    activity: {},
    btn_tips: '',
    btn_disabled: false
  },
  toRegister() {
    wx.navigateTo({
      url: '/pages/activity/addRegister/addRegister?act_id=' + this.data.activity.id,
    })
  },
  onLoad: function (options) {
    const id = options.id;
    const hh_id = app.globalData.hh_id
    getActivityById(id, hh_id).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        const activity = res.data.data
        activity.content = activity.content.replace('< img ', '<img style="max-width:100%;height:auto"')
        this.setData({
          activity,
        })
        if(activity.register === 0) {
          this.setData({
            btn_tips: '我要报名',
            btn_disabled: false
          })
        } else {
          this.setData({
            btn_tips: '已报名',
            btn_disabled: true
          })
        }
        // 根据日期判断按钮的显示样式
        const currentDate = util.formatTime(new Date()).split(' ')[0]
        const deadline = activity.deadline
        if (deadline < currentDate) {
          this.setData({
            btn_tips: '截止报名',
            btn_disabled: true
          })
        }
      } else {
        common.errorStatus(result)
      }
    })
  }
})