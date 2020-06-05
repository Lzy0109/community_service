var app = getApp()
var common = require('../../service/common.js')
var md5 = require('../../utils/md5.js')
var SHA_256 = require('../../utils/SHA256.js')
import {
  wxLogin,
  cmLogin
} from '../../service/login.js'
Page({
  data: {
    animationData1: {},
    animationData2: {},
    hidden1: false,
    hidden2: true,
    warnMsg: '',
    isError: false
  },
  // 获取openid去数据库查找是否有该绑定微信的用户
  wx_login() {
    wxLogin()
  },
  // 社区账号登录 添加动画 多创建一个动画对象来实现来回切换(官方bug)
  cm_login() {
    var animation1 = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    animation1.opacity(0).step()
    this.setData({
      animationData1: animation1.export(),
    })
    var animation2 = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    animation2.opacity(1).step()
    this.setData({
      animationData2: animation2.export(),
    })
    setTimeout(function () {
      this.setData({
        hidden1: true,
        hidden2: false
      })
    }.bind(this), 400)
  },
  // 返回上一级 添加动画
  return_back() {
    var animation1 = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    animation1.opacity(0).step()
    this.setData({
      animationData2: animation1.export(),
    })
    var animation2 = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    animation2.opacity(1).step()
    this.setData({
      animationData1: animation2.export(),
    })
    setTimeout(function () {
      this.setData({
        hidden1: false,
        hidden2: true
      })
    }.bind(this), 400)
  },
  // 忘记密码
  forget() {
    wx.showModal({
      title: 'Tips',
      content: '请持有效身份证明前往物业中心处理',
      showCancel: false
    })
  },
  cmlogin_submit(e) {
    const login = e.detail.value
    // 获取输入的username和password
    const username = login.username
    const password = SHA_256.sha256_digest(login.password)
    // 发送网络请求
    cmLogin(username, password).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        // 登录成功 将住户id存入全局数据
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
      } else {
        common.errorStatus(result)
      }
    })
  }
})