// pages/activity/addRegister/addRegister.js
var util = require('../../../utils/util.js')
var common = require('../../../service/common.js')
var app = getApp()
import {
  Register,
  addRegister
} from '../../../service/activity.js'
Page({
  data: {
    act_id: '',
    warnEsg: '',
    isError: false,
    isDisplay: 'none',
    index: 0,
    nums: [1, 2, 3, 4, 5]
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  testTel(e) {
    const phone = e.detail.value
    if (!util.checkPhone(phone)) {
      this.setData({
        warnMsg: '输入手机号格式不正确',
        isError: true,
        isDisplay: 'none'
      })
    } else {
      this.setData({
        isDisplay: '',
        isError: false
      })
    }
  },
  submit(e) {
    const FLAG = (this.data.isDisplay == '') && (this.data.isError == false)
    if (!FLAG) {
      this.setData({
        warnMsg: '请检查输入是否完整/准确',
        isError: true
      })
    } else {
      const data = e.detail.value
      // picker获取的是下标 重新设置为选取到的值
      data.num = this.data.nums[this.data.index]
      const register = new Register(data)
      // 设置报名住户id和报名活动id
      register.hh_id = app.globalData.hh_id
      register.act_id = this.data.act_id
      addRegister(register).then(res => {
        const result = res.data
        console.log(result)
        if (result.status == 200) {
          wx.showToast({
            title: '报名成功',
            duration: 2000,
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
  },
  onLoad: function (options) {
    this.setData({
      act_id: options.act_id
    })
  }
})