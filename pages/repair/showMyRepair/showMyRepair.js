// pages/repair/showMyRepair/showMyRepair.js
var app = getApp()
var common = require('../../../service/common.js')
import {
  getMyRepairs
} from '../../../service/repair.js'
Page({
  data: {
    pageNum: 1,
    pageSize: 3,
    warnMsg: '暂无回复信息,请耐心等待~',
    isError: false,
    repairs: []
  },
  // 查看回复
  replyClick(e) {
    const reply = e.currentTarget.dataset.value
    // 如果还没有回复消息
    if (reply == '' || reply == null) {
      this.setData({
        isError: true
      })
    } else {
      wx.showModal({
        title: '回复信息',
        content: reply,
        showCancel: false
      }) 
    }
  },
  onLoad: function (options) {
    const hh_id = app.globalData.hh_id
    const pageNum = this.data.pageNum
    const pageSize = this.data.pageSize
    getMyRepairs(hh_id, pageNum, pageSize).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        this.setData({
          repairs: result.data.items
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
    getMyRepairs(hh_id, pageNum, this.data.pageSize).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        wx.hideLoading()
        const totalPages = result.data.totalPages
        const repairs = result.data.items
        if (pageNum > totalPages) {
          // 如果当前页数大于总页数 则提示已显示所有数据
          wx.showToast({
            title: '没有更多了',
          })
        } else {
          // 拼接数据 list.concat(data)
          const list = this.data.repairs.concat(repairs)
          this.setData({
            repairs: list
          })
        }
      } else {
        common.errorStatus(result)
      }
    })
  }
})