// pages/payment/toPay/toPay.js
var app = getApp()
var util = require('../../../utils/util.js')
var common = require('../../../service/common.js')
import {
  getPaymentById,
  Payment,
  pay
} from '../../../service/payment.js'
Page({
  data: {
    payment: {},
    showPayPwdInput: false,  // 是否展示密码输入层
    pwdVal: '',  // 输入的密码
    payFocus: true, // 文本框焦点
  },
  showInputLayer: function(){
    this.setData({ showPayPwdInput: true, payFocus: true });
  },
  // 隐藏支付密码输入层
  hidePayLayer: function(){
    var val = this.data.pwdVal;
    this.setData({ 
      showPayPwdInput: false, 
      payFocus: false, 
      pwdVal: ''
    })
  },
  // 获取焦点
  getFocus: function(){
    this.setData({ 
      payFocus: true 
    });
  },
  // 输入密码监听
  inputPwd: function(e){
      this.setData({ pwdVal: e.detail.value });
      if (e.detail.value.length >= 6) {
        this.hidePayLayer();
        wx.showLoading({
          title: '支付中',
        })
        // 封装数据
        const payment = new Payment(this.data.payment) 
        payment.id = this.data.payment.id;
        payment.householdId = this.data.payment.householdId;
        payment.charId = this.data.payment.charId;
        payment.charStandard = this.data.payment.charStandard;
        // 默认全款支付
        payment.payReal = this.data.payment.charStandard;
        payment.payStatus = 1;
        payment.payDate = util.formatTime(new Date())
        console.log(payment)
        // 发送网络请求
        pay(payment).then(res => {
          const result = res.data
          console.log(result)
          if (result.status == 200) {
            wx.navigateTo({
              url: '../payStatus/payStatus?resultType=success',
            })
          } else {
            common.errorStatus(result)
          }
        })
      }
  },
  onLoad: function (options) {
    const id = options.id
    console.log(id)
    // 发送网络请求获取缴费项目数据
    getPaymentById(id).then(res => {
      const result = res.data
      console.log(result)
      if (result.status == 200) {
        this.setData({
          payment: result.data
        })
      } else {
        common.errorStatus(result)
      }
    })
  }
})