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
        this.setData({
          news
        })
      }
      if (result.status == 401) {
        common.systemGetError()
      }
      if (result.status == 500) {
        common.systemBusy()
      }
    })
  }
})