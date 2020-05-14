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
    feedbackContent: '',
    warnMsg: "请输入反馈内容",
    isError: false,
  },
  //反馈内容字数限制
  inputContent(e) {
    const value = e.detail.value
    const len = parseInt(value.length)
    if (len > 100) {
      return;
    }else {
      this.setData({
        feedbackContent: value
      })
    }
  },
  //提交表单
  addFeedback(e) {
    //提交表单时需要验证反馈内容是否为空，空则不可提交
    if(this.data.feedbackContent == ""){
      this.setData({
        isError: true
      })
    }else{
      const data = e.detail.value
      const feedback = new Feedback(data)
      //需要获取提交时间和业主
      feedback.date = util.formatTime(new Date()).split(' ')[0]
      feedback.householdId = app.globalData.hh_id
      console.log(feedback)
      //提交网络请求
      addFeedback(feedback).then(res => {
        const result = res.data
        console.log(result)
        if (result.status == 1) {
          wx.showToast({
            title: '提交成功',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            }
          })
        }else {
          common.system_busy()
        }
      })
    }
  }
})