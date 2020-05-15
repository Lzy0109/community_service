// pages/news/showNews/showNews.js
var common = require('../../../service/common.js')
import {
  getNews
} from '../../../service/news.js'

Page({
  data: {
    //第一次加载
    pageNum: 1,
    //加载数据个数
    pageSize: 4,
    news: [
      {
        id: 1,
        title: '智能社区第一次新闻',
        image: '/assets/test/test.jpg'
      },
      {
        id: 2,
        title: '智能社区第二次新闻',
        image: '/assets/test/test.jpg'
      },
      {
        id: 3,
        title: '智能社区第三次新闻',
        image: '/assets/test/test.jpg'
      },
      {
        id: 4,
        title: '智能社区第四次新闻',
        image: '/assets/test/test.jpg'
      }
    ]
  },
  onLoad: function (options) {
    //获取新闻数据
    // getNews().then(res => {
    //   const result = res.data
    //   console.log(result)
    //   if(result.status == 1){
    //     const news = result.data
    //     //对内容的显示进行处理
    //     for (var index in news) {
    //       news[index].content = news[index].content.substring(0, 10) + "..."
    //     }
    //     this.setData({
    //       news,
    //     })
    //   }else{
    //     common.system_busy()
    //   }
    // })
  },
  onReachBottom: function () {
    wx.showLoading({
      title: '玩命加载中',
    })
    //发送网络请求请求分页数据 pageNo + 1 
    //拼接数据 list.concat(data)
    //如果获得的数据为空 则提示已显示所有数据
    wx.showToast({
      title: '没有更多了',
    })
    wx.hideLoading()
  }
})