import request from './network.js'
var app = getApp()
// 封装RegisterData类
export class RegisterData {
  constructor(data){
    this.name = data.name;
    this.gender = data.gender;
    this.age = data.age;
    this.telephone = data.telephone;
    this.IDcard = data.IDcard;
    this.arrivalDate = data.arrivalDate;
    this.isOwner = 0;
    this.buildingId = data.buildingId;
    this.roomId = data.roomId;
    this.password = data.password
  }
}

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
// 查询是否绑定
export function isBind(hh_id) {
  return new request({
    url: '/isBind/' + hh_id
  })
}
// 验证旧密码
export function testOldPwd(hh_id, password) {
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
// 修改密码
export function updatePwd(hh_id, password) {
  return request({
    url: '',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      
    }
  })
}
// 注册
export function resgister(registerData) {
  return request({
    url: '/household',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      name: registerData.name,
      account: registerData.account,
      gender: registerData.gender,
      age: registerData.age,
      telephone: registerData.telephone,
      IDcard: registerData.IDcard,
      arrivalDate: registerData.arrivalDate,
      isOwner: 0,
      buildingId: registerData.buildingId,
      roomId: registerData.roomId,
      password: registerData.password
    }
  })
}