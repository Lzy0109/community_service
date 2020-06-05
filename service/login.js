import request from './network.js'
import { baseURL } from './config.js'
var app = getApp()
var common = require('./common.js')
// 微信登录
export function wxLogin() {
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId
      if (res.code) {
        wx.request({
          url: baseURL + "/wxLogin",
          method: 'POST',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            const result = res.data
            console.log(result)
            if (result.status == 200) {
              //存在该用户 将用户hh_id存入全局
              app.globalData.hh_id = result.data.id
              app.globalData.token = result.data.token
              wx.showToast({
                title: '登录成功',
              })
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/home/home',
                })
              }, 1000)
            }
            if (result.status == 401) {
              //该用户没有绑定微信 登录失败
              wx.showModal({
                title: '出错啦',
                content: '您的微信还没有绑定社区账号哦',
                showCancel: false
              })
            }
            if (result.status == 500) {
              common.errorStatus(result)
            }
          }
        })
      }
    }
  })
}
// 社区账号登录
export function cmLogin(username, password) {
  return request({
    url: '/login/household',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      username,
      password
    }
  })
}