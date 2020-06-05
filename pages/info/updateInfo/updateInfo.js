// pages/info/updateInfo/updateInfo.js
var util = require('../../../utils/util.js')
var common = require('../../../service/common.js')
import {
  updateHousehold
} from '../../../service/info.js'
var app = getApp()
Page({
  data: {
    warnMsg: '',
    age_flag: 1,
    tel_flag: 1,
    isError: false,
    household: {},
    genderIndex: 0,
    gender: ['男','女'],
    preGender: '',
    preAge: '',
    preTel: ''
  },
  bindGenderChange: function(e) {
    this.setData({
      genderIndex: e.detail.value
    })
  },
  // 检验年龄
  testAge(e) {
    const age = e.detail.value
    if (!util.checkAge(age)) {
      this.setData({
        warnMsg: '输入年龄不正确',
        isError: true,
        age_flag: 0
      })
    } else {
      this.setData({
        age_flag: 1,
        isError:false
      })
    }
  },
  // 检验电话
  testPhone(e) {
    const phone = e.detail.value
    if (!util.checkPhone(phone)) {
      this.setData({
        warnMsg: '输入联系电话格式不正确',
        isError: true,
        tel_flag: 0
      })
    } else {
      this.setData({
        tel_flag: 1,
        isError: false
      })
    }
  },
  submitUpdate(e) {
    const data = e.detail.value;
    const UPDATE_EMPTY = (this.data.preGender == this.data.gender[data.gender]) &&
                         (this.data.preAge == data.age) &&
                         (this.data.preTel == data.telephone)
    const FLAG = (this.data.age_flag == 1) && (this.data.tel_flag == 1)
    if (UPDATE_EMPTY) {
      // 无修改信息
      wx.showModal({
        title: '出错啦',
        content: '您好像还没有修改信息',
        showCancel: false
      })
    }
    if (!FLAG) {
      this.setData({
        warnMsg: "请确定修改信息合法性",
        isError: true
      })
    } else {
      // 信息合法 封装household提交
      const household = this.data.household
      household.gender = this.data.gender[data.gender]
      household.age = data.age
      household.telephone = data.telephone
      updateHousehold(household).then(res => {
        const result = res.data
        console.log(result)
        if (result.status == 200) {
          wx.showToast({
            title: '修改成功',
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
  },
  onLoad: function (options) {
    // 加载household信息
    const household = JSON.parse(options.household)
    // 设置性别显示
    if (household.gender == "男") {
      this.setData({
        genderIndex: 0,
      })
    } else {
      this.setData({
        genderIndex: 1,
      })
    }
    this.setData({
      household: household,
      preGender: household.gender,
      preAge: household.age,
      preTel: household.telephone
    })
  }
})