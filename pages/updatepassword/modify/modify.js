// pages/modifyPwd/update/update.js
var util = require('../../../utils/util.js')
var app = getApp()
var common = require('../../../service/common.js')
var SHA_256 = require('../../../utils/SHA256.js')
import {
  updatePwd, modifyPassword
} from '../../../service/user.js'
Page({
  data: {
    warnMsg: '',
    isError: false,
    isDisplay1: 'none',
    isDisplay2: 'none',
    newPassword: ''
  },
  testPwd(e) {
    const password = e.detail.value
    const status = util.checkPwd(password)
    if (status == 0) {
      this.setData({
        warnMsg: '请输入新密码',
        isError: true,
        isDisplay1: 'none'
      })
    }
    if (status == -1) {
      this.setData({
        warnMsg: '输入密码应为6位字符',
        isError: true,
        isDisplay1: 'none'
      })
    }
    if (status == 1) {
      this.setData({
        isDisplay1: '',
        isError: false,
        // 密码加密
        newPassword: SHA_256.sha256_digest(password)
      })
    }
  },
  testAgain(e) {
    const inputPassword = SHA_256.sha256_digest(e.detail.value)
    if(inputPassword != this.data.newPassword) {
      this.setData({
        warnMsg: "输入的密码与新密码不一致",
        isDisplay2: 'none',
        isError: true
      })
    }else {
      this.setData({
        isDisplay2: '',
        isError: false
      })
    }
  },
  submitPassword() {
    const FLAG = (this.data.isDisplay1 == "") &&
                 (this.data.isDisplay2 == "") &&
                 (this.data.isError == false)
    if (!FLAG) {
      this.setData({
        warnMsg: "请检查输入是否完整/准确",
        isError: true
      })
    } else {
      // 发送网络请求
      modifyPassword(app.globalData.hh_id, this.data.newPassword).then(res => {
        const result = res.data
        if (result.status == 200) {
          wx.showToast({
            title: '修改成功',
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 2
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