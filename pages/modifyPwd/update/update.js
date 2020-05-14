// pages/modifyPwd/update/update.js
var util = require('../../../utils/util.js')
var app = getApp()
var common = require('../../../service/common.js')
import {
  updatePwd
} from '../../../service/user.js'
Page({
  data: {
    warnMsg: "Warn Msg",
    isError: false,
    isDisplay1: "none",
    isDisplay2: "none",
    newPwd: ''
  },
  testPwd(e) {
    const pwd = e.detail.value
    const status = util.checkPwd(pwd)
    if (status == 0) {
      this.setData({
        warnMsg: '请输入新密码',
        isError: true,
        isDisplay1: "none"
      })
    }else if (status == -1) {
      this.setData({
        warnMsg: '输入密码应为6位字符',
        isError: true,
        isDisplay1: "none"
      })
    }else {
      this.setData({
        isDisplay1: '',
        isError: false,
        newPwd: pwd
      })
    }
  },
  testAgain(e) {
    const inputPwd = e.detail.value
    if(inputPwd != this.data.newPwd){
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
  submitNewPwd() {
    if (this.data.isDisplay1 == "" &&
      this.data.isDisplay2 == "" &&
      this.data.isError == false) {
      console.log("完成验证，可以提交")
      //发送网络请求
      const hh_id = app.globalData.hh_id
      const password = this.data.newPwd
      updatePwd(hh_id, password).then( res => {
        const result = res.data
        if(result.status == 1){
          wx.showToast({
            title: '修改成功',
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 2
                })
              }, 2000)
            }
          })
        }else {
          common.system_busy()
        }
      })
    }else {
      this.setData({
        warnMsg: "请检查输入是否完整/准确",
        isError: true
      })
    }
  }
})