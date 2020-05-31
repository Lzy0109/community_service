import {
  baseURL
} from './config.js'
// 封装request
export default function(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: options.header || {'content-type': 'application/json'},
      success: resolve,
      fail: reject
    })
  })
}