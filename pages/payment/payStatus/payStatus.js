// pages/payment/paySuccess/paySuccess.js
Page({
  data: {
    resultType: '',
    resultContent: '',
    url: ''
  },
  returnClick() {
    wx.navigateBack({
      delta: 2
    })
  },
  onLoad: function (options) {
    var resultType = options.resultType;
    if (resultType == 'success') {
      this.setData({
        resultType: "success",
        resultContent: "支付成功",
        url: ''
      });
    } else {
      this.setData({
        resultType: "warn",
        resultContent: "支付失败",
        url: ''
      });
     }
  }
})