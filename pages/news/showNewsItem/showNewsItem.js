// pages/news/showNewsItem/showNewsItem.js
var common = require('../../../service/common.js')
import {
  getNewsById
} from '../../../service/news.js'
Page({
  data: {
    news: {}
  },
  onLoad: function (options) {
    const id = options.id
    getNewsById(id).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        const news = result.data
        news.content = news.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
        this.setData({
          news
        })
      } else {
        common.errorStatus(result)
      }
    })
  }
})