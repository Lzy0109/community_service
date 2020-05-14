// pages/bindwx/bindwx.js
var app = getApp()
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
    console.log(e)
    //确认授权
    if(e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      //发送网络请求，绑定微信
      bindWx(app.globalData.hh_id)
    }
  },
  onLoad: function (options) {
    //后台查询是否有绑定
    isBind(app.globalData.hh_id).then(res => {
      console.log(res)
      const effort = res.data.data
      //如果有
      if (effort == 1) {
        this.setData({
          tips: '您已绑定微信！',
          btn_name: '更换绑定'
        })
      }
    })
  }
})