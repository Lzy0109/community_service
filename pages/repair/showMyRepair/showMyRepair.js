// pages/repair/showMyRepair/showMyRepair.js
var app = getApp()
var common = require('../../../service/common.js')
import {
  getMyRepairs
} from '../../../service/repair.js'
Page({
  data: {
    warnMsg: "暂无回复信息,请耐心等待~",
    isError: false,
    repairs: []
  },
  //查看回复
  replyClick(e) {
    const reply = e.currentTarget.dataset.value
    //如果还没有回复消息
    if (reply == "") {
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
  onLoad: function (options) {
    const id = app.globalData.hh_id
    getMyRepairs(id).then(res => {
      const result = res.data
      console.log(result)
      if(result.status == 1){
        this.setData({
          repairs: result.data
        })
      }else {
        common.system_busy()
      }
    })
  }
})