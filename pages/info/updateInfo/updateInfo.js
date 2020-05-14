// pages/info/updateInfo/updateInfo.js
var util = require('../../../utils/util.js')
var common = require('../../../service/common.js')
import {
  updateHousehold,
  getHouseholdById
} from '../../../service/info.js'
var app = getApp()
Page({
  data: {
    warnMsg: "Warn Msg",
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
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      genderIndex: e.detail.value
    })
  },
  testAge(e) {
    const age = e.detail.value
    if(!util.checkAge(age)) {
      this.setData({
        warnMsg: "输入年龄不正确",
        isError: true,
        age_flag: 0
      })
    }else {
      this.setData({
        age_flag: 1,
        isError:false
      })
    }
  },
  testPhone(e) {
    const phone = e.detail.value
    if(!util.checkPhone(phone)) {
      this.setData({
        warnMsg: "输入联系电话格式不正确",
        isError: true,
        tel_flag: 0
      })
    }else {
      this.setData({
        tel_flag: 1,
        isError: false
      })
    }
  },
  submitUpdate(e) {
    const data = e.detail.value;
    if (this.data.preGender == this.data.gender[data.gender] 
    && this.data.preAge == data.age 
    && this.data.preTel == data.telephone){
      //无修改信息
      wx.showModal({
        title: '出错啦',
        content: '您好像还没有修改信息',
        showCancel: false
      })
    }else if(this.data.age_flag == 1 && this.data.tel_flag == 1) {
      //信息合法 封装household提交
      const household = this.data.household
      household.gender = this.data.gender[data.gender]
      household.age = data.age
      household.telephone = data.telephone
      //发送网络请求修改信息
      updateHousehold(household).then(res => {
        console.log(res)
        const result = res.data
        if(result.status == 1){
          wx.showToast({
            title: '修改成功',
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
          common.system.busy()
        }
      })
    }else {
      this.setData({
        warnMsg: "请确定修改信息合法性",
        isError: true
      })
    }
  },
  onLoad: function (options) {
    //加载household信息
    const household = JSON.parse(options.household)
    //设置性别显示
    if (household.gender == "男") {
      this.setData({
        genderIndex: 0,
      })
    }else {
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