// pages/bindwx/bindwx.js
var app = getApp()
var common = require('../../service/common.js')
import {
  bindWx,
  unbindWx,
  isBind
} from '../../service/bind.js'
Page({
  data: {
    bind_flag: true,
    tips: '',
    btn_name: ''
  },
  bindWx(e) {
    // 确认授权
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      // 发送网络请求，绑定微信
      bindWx(app.globalData.hh_id)
    }
  },
  cancelClick() {
    wx.showModal({
      title: '解除微信绑定',
      content: '您是否要解除微信绑定',
      success (res) {
        if (res.confirm) {
          unbindWx(app.globalData.hh_id).then(res => {
            const result  = res.data
            console.log(result)
            if(result.status == 200) {
              wx.showToast({
                title: '解除成功',
                success: function() {
                  setTimeout(function () {
                    wx.redirectTo({
                      url: './bindwx',
                    })
                  }, 1000)
                }
              })
            } else {
              common.errorStatus(result)
            }
          })
        }
      }
    })
  },
  onShow: function (options) {
    // 后台查询是否有绑定
    isBind(app.globalData.hh_id).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        this.setData({
          tips: '您已绑定微信！',
          btn_name: '更换绑定',
          bind_flag: true
        })
      }
      if (result.status == 401) {
        this.setData({
          tips: '您还没有绑定微信！',
          btn_name: '绑定微信',
          bind_flag: false
        })
      }
      if (result.status == 500) {
        common.errorStatus(result)
      }
    })
  }
})