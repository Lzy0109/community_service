// pages/info/updateInfo/updatePwd/updatePwd.js
Page({
  data: {
    warnMsg: "Warn Msg",
    isError: false,
    isDisplay1: "none",
    isDisplay2: "none",
    isDisplay3: "none",
    oldPwd: '',
    newPwd: ''
  },
  testOld() {
    //input失去焦点时检测与旧密码是否一致 一致就打勾isDisplay设置为空 否则返回ErrorMsg
    //判断不合法时
    this.setData({
      warnMsg: "输入的密码与旧密码不一致",
      isError: true
    })
    //判断合法时
    this.setData({
      isDisplay1: ""
    })
  },
  testNew() {
    //input失去焦点时检测新密码合法性 否则返回ErrorMsg
    //判断不合法时
    this.setData({
      warnMsg: "输入的密码不合法",
      isError: true
    })
    //判断合法时
    this.setData({
      isDisplay2: ""
    })
  },
  testNewAgain() {
    //input失去焦点时检测与新密码是否一致 否则返回ErrorMsg
    //判断不合法时
    this.setData({
      warnMsg: "输入的密码与新密码不一致",
      isError: true
    })
    //判断合法时
    this.setData({
      isDisplay3: ""
    })
  },
  updatePwd() {
    if (this.data.isDisplay1 == "" && 
        this.data.isDisplay2 == "" && 
        this.data.isDisplay3 == ""){
      console.log("完成验证，可以提交")
      wx.showToast({
        title: '修改成功',
        success: function() {
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          },2000)
        }
      })
    }else{
      this.setData({
        warnMsg: "请检查输入是否完整/准确",
        isError: true
      })
    }
  },
  onLoad: function (options) {
    //获取旧密码
  }
})