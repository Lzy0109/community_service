var app = getApp()
var common = require('../../service/common.js')
import {
  wxLogin,
  cmLogin
} from '../../service/login.js'
import {
  getHouseholdById
} from '../../service/info.js'
Page({
  data: {
    animationData1: {},
    animationData2: {},
    hidden1: false,
    hidden2: true,
    warnMsg: "",
    isError: false
  },
  //获取openid去数据库查找是否有该绑定微信的用户
  wx_login() {
    wxLogin()
  },
  //社区账号登录 添加动画 多创建一个动画对象来实现来回切换(官方bug)
  cm_login() {
    var animation1 = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    })
    animation1.opacity(0).step()
    this.setData({
      animationData1: animation1.export(),
    })
    var animation2 = wx.createAnimation({
      duration: 800,
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
    }.bind(this), 800)
  },
  //返回上一级 添加动画
  return_back() {
    var animation1 = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    })
    animation1.opacity(0).step()
    this.setData({
      animationData2: animation1.export(),
    })
    var animation2 = wx.createAnimation({
      duration: 800,
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
    }.bind(this), 800)
  },
  //忘记密码
  forget() {
    wx.showModal({
      title: 'Tips',
      content: '请持有效身份证明前往物业中心处理',
      showCancel: false
    })
  },
  cmlogin_submit(e) {
    const login_data = e.detail.value
    //获取输入的username和password
    const login_account = login_data.account
    const login_password = login_data.password
    //发送网络请求
    cmLogin(login_account,login_password).then(res => {
      const result = res.data
      console.log(result)
      if(result.status == 1){
        //登录成功 将住户id存入全局数据
        app.globalData.hh_id = result.data
        wx.showToast({
          title: '登录成功',
          success: function () {
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/home/home',
              })
            }, 1000)
          }
        })
      }else if(result.status == 0) {
        this.setData({
          //账号密码错提示
          warnMsg: "账号或密码错误",
          isError: true
        })
      }else {
        common.system_busy()
      }
    })
  }
})