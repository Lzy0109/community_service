// pages/feedback/showMyFeedback/showMyFeedback.js
var app = getApp()
var common = require('../../../service/common.js')
import {
  getMyFeedbacks
} from '../../../service/feedback.js'
Page({
  data: {
    warnMsg: "暂无回复信息,请耐心等待~",
    isError: false,
    feedbacks: []
  },
  //查看回复
  replyClick(e) {
    const reply = e.currentTarget.dataset.value
    //如果还没有回复消息
    if(reply == ""){
      this.setData({
        isError: true
      })
    }else{
      wx.showModal({
        title: '回复信息',
        content: reply,
        showCancel: false
      })
    }
  },
  //加载我的所有反馈信息
  onLoad: function (options) {
    const hh_id = app.globalData.hh_id
    //获取我的反馈
    getMyFeedbacks(hh_id).then(res => {
      const result = res.data
      console.log(result)
      if(result.status == 1){
        this.setData({
          feedbacks: result.data
        })
      }else {
        common.system_busy()
      }
    })
  }
})