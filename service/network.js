import { baseURL } from './config.js'
var app = getApp()
// 封装request
export default function(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'content-type': options.header != null ? options.header['content-type'] : 'application/json',
        // Shiro令牌
        'Authorization': app.globalData.token
      },
      success: resolve,
      fail: reject
    })
  })
}