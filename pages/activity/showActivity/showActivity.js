// pages/activity/showActivity/showActivity.js
var common = require('../../../service/common.js')
import {
  getActivities
} from '../../../service/activity.js'

Page({
  data: {
    activities: []
  },
  onLoad: function (options) {
    //发送网络请求
    getActivities().then(res => {
      const result = res.data
      console.log(result)
      if(result.status == 1) {
        const activities = res.data.data
        //对内容的省略显示进行处理
        for (var index in activities) {
          activities[index].content = activities[index].content.substring(0, 10) + "..."
        }
        this.setData({
          activities,
        })
      }else {
        common.system_busy()
      }
    })
  }
})