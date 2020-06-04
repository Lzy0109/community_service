// pages/activity/showClosed/showClosed.js
var common = require('../../../service/common.js')
var app = getApp()
import {
  getMyClosedActivities
} from '../../../service/activity.js'
Page({
  data: {
    pageNum: 1,
    pageSize: 4,
    closedActivities: []
  },
  // 跳转活动详情页
  toActivity(e) {
    const act_id = e.currentTarget.dataset.value
    wx.navigateTo({
      url: '/pages/activity/showActivityItem/showActivityItem?id=' + act_id,
    })
  },
  onLoad: function (options) {
    const pageNum = this.data.pageNum
    const pageSize = this.data.pageSize
    const hh_id = app.globalData.hh_id
    getMyClosedActivities(hh_id, pageNum, pageSize).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        this.setData({
          closedActivities: result.data.items
        })
      } else {
        common.errorStatus(result)
      }
    })
  },
  onReachBottom: function () {
    const hh_id = app.globalData.hh_id
    wx.showLoading({
      title: '玩命加载中',
    })
    // 发送网络请求请求分页数据 pageNum + 1
    const pageNum = this.data.pageNum + 1
    this.setData({
      pageNum
    })
    getMyClosedActivities(hh_id, pageNum, this.data.pageSize).then(res => {
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
          const list = this.data.closedActivities.concat(activities)
          this.setData({
            closedActivities: list
          })
        }
      }else {
        common.errorStatus(result)
      }
    })
  }
})