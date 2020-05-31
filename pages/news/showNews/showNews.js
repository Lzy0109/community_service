// pages/news/showNews/showNews.js
var common = require('../../../service/common.js')
import {
  getNews
} from '../../../service/news.js'

Page({
  data: {
    pageNum: 1,
    pageSize: 4,
    animationData: {},
    news: []
  },

  onLoad: function (options) {
    // 获取新闻数据
    const pageNum = this.data.pageNum
    const pageSize = this.data.pageSize
    getNews(pageNum, pageSize).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        const news = result.data.items
        this.setData({
          news,
        })
      } else {
        common.systemBusy()
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
    getNews(pageNum, this.data.pageSize).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        wx.hideLoading()
        const totalPages = result.data.totalPages
        const news = result.data.items
        if (pageNum > totalPages) {
          // 如果当前页数大于总页数 则提示已显示所有数据
          wx.showToast({
            title: '没有更多了',
          })
        } else {
          // 拼接数据 list.concat(data)
          const list = this.data.news.concat(news)
          this.setData({
            news: list
          })
        }
      } else {
        common.systemBusy()
      }
    })
  }
})