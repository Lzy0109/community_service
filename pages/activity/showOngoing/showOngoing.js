// pages/activity/showOngoing/showOngoing.js
var common = require('../../../service/common.js')
var app = getApp()
import {
  deleteRegister,
  getMyOngoingActivities
} from '../../../service/activity.js'
Page({
  data: {
    pageNum: 1,
    pageSize: 4,
    ongoingActivities: []
  },
  // 跳转活动详情页
  toActivity(e) {
    const act_id = e.currentTarget.dataset.value
    wx.navigateTo({
      url: '/pages/activity/showActivityItem/showActivityItem?id=' + act_id,
    })
  },
  // 取消活动预约
  cancelClick(e) {
    const id = e.currentTarget.dataset.value
    wx.showModal({
      title: '取消活动预约',
      content: '是否确认取消活动预约',
      success(res) {
        if (res.confirm) {
          deleteRegister(id).then(res => {
            const result = res.data
            console.log(result)
            if (result.status == 200) {
              wx.showLoading({
                title: '玩命加载中',
                success: function () {
                  setTimeout(function () {
                    const pages = getCurrentPages()
                    const perpage = pages[pages.length - 1]
                    perpage.onLoad()  
                  }, 1000)
                }
              })
              setTimeout(function () {
                wx.hideLoading()
                }, 1000)
            }
            if (result.status == 500) {
              common.systemBusy()
            }
          })
        }
      }
    })
  },
  onLoad: function (options) {
    const pageNum = this.data.pageNum
    const pageSize = this.data.pageSize
    const hh_id = app.globalData.hh_id
    getMyOngoingActivities(hh_id, pageNum, pageSize).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        this.setData({
          ongoingActivities: result.data.items
        })
      } else {
        common.systemBusy()
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
    getMyOngoingActivities(hh_id, pageNum, this.data.pageSize).then(res => {
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
          const list = this.data.ongoingActivities.concat(activities)
          this.setData({
            ongoingActivities: list
          })
        }
      } else {
        common.systemBusy()
      }
    })
  }
})