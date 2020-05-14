import request from './network.js'
//绑定微信
export function bindWx(hh_id) {
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey
      if (res.code) {
        wx.request({
          url: 'http://localhost:8080/bindWx',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            code: res.code,
            id: hh_id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
            const effort = res.data.data
            console.log(res)
            if (effort == 1) {
              wx.showToast({
                title: '绑定成功',
                success: function () {
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
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
//查询是否绑定
export function isBind(hh_id) {
  return new request({
    url: '/isBind/' + hh_id
  })
}
//验证旧密码
export function testOldPwd(hh_id,password) {
  return request({
    url: '',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {

    }
  })
}

export function updatePwd(hh_id,password) {
  return request({
    url: '',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      
    }
  })
}