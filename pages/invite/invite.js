// pages/invite/invite.js
var common = require('../../service/common.js')
var app = getApp()
import {
  getAccessToken
} from '../../service/invite.js'
import {
  getHouseholdById
} from '../../service/info.js'
Page({
  data: {
    access_token: '',
    buildingId: '',
    buildingName: '',
    roomId: '',
    roomNum: '',
    name: '',
    QRCode: ''
  },
  createQRCode() {
    // 获取access_token
    getAccessToken().then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        this.setData({
          access_token: result.data.access_token
        })
      } else {
        common.errorStatus(result)
      }
      wx.request({
        url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token='
         + this.data.access_token,
        method: 'POST',
        responseType: 'arraybuffer',
        data: {
          'scene': 'roomId=' + this.data.roomId,
          'path': 'pages/register/register',
          'width': 430
        },
        header: {
          'content-type': 'image/jpeg'
        },
        success: res => {
          console.log(res)
          const src = wx.arrayBufferToBase64(res.data)
          this.setData({
            QRCode: 'data:image/jpeg;base64,' + src
          })
        }
      })
    })
  },
  onLoad: function (options) {
    // 获取楼栋、房间号、业主姓名
    getHouseholdById(app.globalData.hh_id).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        this.setData({
          name: result.data.name,
          buildingId: result.data.buildingId,
          buildingName: result.data.buildingName,
          roomId: result.data.roomId,
          roomNum: result.data.roomNum
        })
      } else {
        common.errorStatus(result)
      }
    })   
  }
})