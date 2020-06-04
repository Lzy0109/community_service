import request from '../service/network.js'
var app = getApp()
// 绑定微信
export function bindWx(hh_id) {
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey
      if (res.code) {
        wx.request({
          url: 'http://localhost:8080/bindWx',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': app.globalData.token
          },
          data: {
            code: res.code,
            id: hh_id
          },
          success: res => {
            const effort = res.data.data
            console.log(res.data)
            if (effort == 1) {
              wx.showToast({
                title: '绑定成功',
                success: function () {
                  setTimeout(function () {
                    wx.redirectTo({
                      url: './bindwx',
                    })
                  }, 2000)
                } 
              })
            } else {
              wx.showModal({
                title: '出错啦',
                content: '出错啦',
              })
            }
          },
          fail() {
            wx.showModal({
              title: '出错啦',
              content: '系统繁忙，请稍后再试',
              showCancel: false
            })
          }
        })
      }
    }
  })
}
// 解除微信绑定
export function unbindWx(hh_id) {
  return request ({
    url: '/unbindWx/' + hh_id
  })
}
// 查询是否绑定
export function isBind(hh_id) {
  return request({
    url: '/isBind/' + hh_id
  })
}