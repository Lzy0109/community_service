// pages/repair/addRepair/addRepair.js
var util = require('../../../utils/util.js')
var app = getApp()
var common = require('../../../service/common.js')
import { 
  addRepair,
  Repair
} from '../../../service/repair.js'
Page({
  data: {
    content_input: 0,
    repairContent: '',
    warnMsg: '',
    isError: false,
    // bindblur监听并显示
    isDisplay1: 'none',
    isDisplay2: 'none',
  },
  // 检验姓名合法性
  testName(e) {
    const name = e.detail.value
    // 验证姓名无误 打勾
    if (util.checkName(name)) {
      this.setData({
        isDisplay1: ''
      })
    } else {
      // 有误 报错
      this.setData({
        warnMsg: '输入姓名格式不正确',
        isError: true,
        isDisplay1: 'none'
      })
    }
  },
  // 检验联系电话合法性
  testTel(e) {
    const phone = e.detail.value
    if (!util.checkPhone(phone)) {
      //有误 报错
      this.setData({
        warnMsg: '联系电话格式不正确',
        isError: true,
        isDisplay2: 'none'
      })
    } else {
      // 验证联系电话无误 打勾
      this.setData({
        isDisplay2: ''
      })
    }
  },
  // 报修内容字数限制
  inputContent(e) {
    const value = e.detail.value
    const len = parseInt(value.length)
    if (len > 100) {
      return;
    } else {
      this.setData({
        content_input: len,
        repairContent: value
      })
    }
  },
  // 提交表单
  addRepair(e) {
    if (this.data.content_input == 0) {
      this.setData({
        warnMsg: '报修信息为空',
        isError: true
      })
    }else {
      const FLAG = (this.data.isDisplay1 == "") && (this.data.isDisplay2 == "") 
      const data = e.detail.value
      const repair = new Repair(data)
      // 获取提交日期和住户id
      repair.householdId = app.globalData.hh_id
      repair.date = util.formatTime(new Date()).split(' ')[0]
      if (!FLAG) {
        this.setData({
          warnMsg: '请正确填写报修信息',
          isError: true
        })
      } else {
        // 发送网络请求 提交repair
        addRepair(repair).then(res => {
          const result = res.data
          console.log(result)
          if (result.status == 200) {
            wx.showToast({
              title: '提交成功',
              duration: 2000,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
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
  }
})