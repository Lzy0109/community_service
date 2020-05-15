// pages/activity/showActivityItem/showActivityItem.js
var util = require('../../../utils/util.js')
var common = require('../../../service/common.js')
var app = getApp()
import {
  getActivityById,
  isRegister
} from '../../../service/activity.js'
Page({
  data: {
    activity: {},
    btn_tips: '我要报名',
    btn_disabled: false
  },
  toRegister() {
    wx.navigateTo({
      url: '/pages/activity/addRegister/addRegister?act_id=' + this.data.activity.id,
    })
  },
  onLoad: function (options) {
    const act_id = options.id;
    //发送网络请求
    getActivityById(act_id).then(res => {
      const result = res.data
      console.log(result)
      if(result.status == 1){
        const activity = res.data.data
        this.setData({
          activity,
        })
        //根据日期判断按钮的显示样式
        const currentDate = util.formatTime(new Date()).split(' ')[0]
        const act_date = activity.date
        if (act_date < currentDate) {
          this.setData({
            btn_tips: '活动已过期',
            btn_disabled: true
          })
        }
        //判断这个活动有无报名
        // const hh_id = app.globalData.hh_id
        // if (isRegister(hh_id,act_id)){
        //   this.setData({
        //     btn_tips: '已报名',
        //     btn_disabled: true
        //   })
        // }
      }else {
        common.system_busy()
      }
    })
  }
})