// pages/invite/invite.js
var common = require('../../service/common.js')
import {
  getAccessToken
} from '../../service/invite.js'
import {
  getHouseholdById
} from '../../service/info.js'
var app = getApp()
Page({
  data: {
    access_token: '',
    buildingId: 1,
    roomId: 1,
    name: '',
    QRCode: ''
  },
  createQRCode() {
    wx.request({
      url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token='
       + this.data.access_token,
      method: 'POST',
      responseType: 'arraybuffer',
      data: {
        "scene": "buildingId=" + this.data.buildingId + "&roomId=" + this.data.roomId,
        "path": "pages/register/register",
        "width": 430
      },
      header: {
        'content-type': 'image/jpeg'
      },
      success: res => {
        console.log(res)
        const src = wx.arrayBufferToBase64(res.data)
        this.setData({
          QRCode: "data:image/jpeg;base64," + src
        })
      }
    })
  },
  onLoad: function (options) {
    //获取楼栋、房间号、业主姓名
    getHouseholdById(app.globalData.hh_id).then( res => {
      const household = res.data.data
      this.setData({
        name: household.name
      })
    }),
    //获取access_token
    getAccessToken().then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 1) {
        this.setData({
          access_token: result.data.access_token
        })
      } else {
        common.system_busy()
      }
    })
  }
})