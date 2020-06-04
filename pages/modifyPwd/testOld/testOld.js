// pages/modifyPwd/testOld/testOld.js
var app = getApp()
var util = require('../../../utils/util.js')
var common = require('../../../service/common.js')
var SHA_256 = require('../../../utils/SHA256.js')
import {
  testOldPwd
} from '../../../service/user.js'
Page({
  data: {
    warnMsg: '',
    isError: false,
    isDisplay: 'none',
    oldPwd: ''
  },
  testPwd(e) {
    const pwd = e.detail.value
    const status = util.checkPwd(pwd)
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
        oldPwd: pwd
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
      const hh_id = app.globalData.hh_id
      // 密码加密
      const password = SHA_256.sha256_digest(this.data.oldPwd)
      testOldPwd(hh_id, password).then(res => {
        const result = res.data
        console.log(result)
        if (result.status == 200) {
          wx.navigateTo({
            url: '/pages/modifyPwd/update/update',
          })
        } else {
          common.errorStatus(result)
        }
      })
    }
  }
})