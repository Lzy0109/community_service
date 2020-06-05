// pages/feedback/addFeedback/addFeedback.js
var util = require('../../../utils/util.js') 
var app = getApp()
var common = require('../../../service/common.js')
import {
  addFeedback,
  Feedback
} from '../../../service/feedback.js'
Page({
  data: {
    content_input: 0,
    feedbackContent: '',
    warnMsg: '',
    isError: false,
  },
  // 反馈内容字数限制
  inputContent(e) {
    const value = e.detail.value
    const len = parseInt(value.length)
    if (len > 100) {
      return;
    } else {
      this.setData({
        content_input: len,
        feedbackContent: value
      })
    }
  },
  addFeedback(e) {
    // 提交表单时需要验证反馈内容是否为空，空则不可提交
    if (this.data.content_input == 0) {
      this.setData({
        warnMsg: "请输入反馈内容",
        isError: true
      })
    } else {
      const data = e.detail.value
      const feedback = new Feedback(data)
      // 获取提交时间和业主id
      feedback.date = util.formatTime(new Date()).split(' ')[0]
      feedback.householdId = app.globalData.hh_id
      addFeedback(feedback).then(res => {
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
})