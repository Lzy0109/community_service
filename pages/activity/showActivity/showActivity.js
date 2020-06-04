// pages/activity/showActivity/showActivity.js
var common = require('../../../service/common.js')
import {
  getActivities
} from '../../../service/activity.js'
Page({
  data: {
    pageNum: 1,
    pageSize: 4,
    activities: []
  },
  onLoad: function (options) {
    const pageNum = this.data.pageNum
    const pageSize = this.data.pageSize
    getActivities(pageNum, pageSize).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        const activities = result.data.items
        this.setData({
          activities,
        })
      } else {
        common.errorStatus(result)
      }
    })
  },

  onReachBottom: function () {
    wx.showLoading({
      title: '玩命加载中',
    })
    // 发送网络请求请求分页数据 pageNum + 1
    const pageNum = this.data.pageNum + 1
    this.setData({
      pageNum
    })
    getActivities(pageNum, this.data.pageSize).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        wx.hideLoading()
        const totalPages = result.data.totalPages
        const activities = result.data.items
        if (pageNum > totalPages) {
          // 如果当前页数大于总页数 则提示已显示所有数据
          wx.showToast({
            title: '没有更多了',
          })
        } else {
          // 拼接数据 list.concat(data)
          const list = this.data.activities.concat(activities)
          this.setData({
            activities: list
          })
        }
      } else {
        common.errorStatus(result)
      }
    })
  }
})