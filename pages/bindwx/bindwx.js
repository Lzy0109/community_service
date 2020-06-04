// pages/bindwx/bindwx.js
var app = getApp()
var common = require('../../service/common.js')
import {
  bindWx,
  isBind
} from '../../service/user.js'
Page({
  data: {
    isBind: false,
    tips: '您还没有绑定微信!',
    btn_name: '绑定微信'
  },
  bindWx(e) {
    // 确认授权
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      // 发送网络请求，绑定微信
      bindWx(app.globalData.hh_id)
    }
  },
  onLoad: function (options) {
    // 后台查询是否有绑定
    isBind(app.globalData.hh_id).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        this.setData({
          tips: '您已绑定微信！',
          btn_name: '更换绑定'
        })
      }
      if (result.status == 401) {
        this.setData({
          tips: '您还没有绑定微信！',
          btn_name: '绑定微信'
        })
      }
      if (result.status == 500) {
        common.errorStatus(result)
      }
    })
  }
})