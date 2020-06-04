// pages/modifyPwd/testOld/testOld.js
var app = getApp()
var util = require('../../../utils/util.js')
var common = require('../../../service/common.js')
var SHA_256 = require('../../../utils/SHA256.js')
import {
  verifyPassword
} from '../../../service/user.js'
Page({
  data: {
    warnMsg: '',
    isError: false,
    isDisplay: 'none',
    oldPassword: ''
  },
  testPwd(e) {
    const password = e.detail.value
    const status = util.checkPwd(password)
    if (status == 0) {
      this.setData({
        warnMsg: '请输入旧密码',
        isError: true,
        isDisplay: 'none'
      })
    }
    if (status == -1) {
      this.setData({
        warnMsg: '输入密码应为6位字符',
        isError: true,
        isDisplay: 'none'
      })
    }
    if (status == 1) {
      this.setData({
        isDisplay: '',
        isError: false,
        // 密码加密
        oldPassword: SHA_256.sha256_digest(password)
      })
    }
  },
  submitOldPwd() {
    const FLAG = (this.data.isError == false) && (this.data.isDisplay == '')
    if (!FLAG) {
      this.setData({
        warnMsg: "请检查输入是否完整/准确",
        isError: true
      })
    } else {
      // 发送网络请求
      verifyPassword(app.globalData.hh_id, this.data.oldPassword).then(res => {
        const result = res.data
        console.log(result)
        if (result.status == 200) {
          wx.navigateTo({
            url: '/pages/updatepassword/modify/modify',
          })
        } else {
          common.errorStatus(result)
        }
      })
    }
  }
})