// pages/register/register.js
var util = require('../../utils/util.js')
var common = require('../../service/common.js')
var SHA_256 = require('../../utils/SHA256.js')
import {
  RegisterData, 
  resgister
} from '../../service/user.js'
Page({
  data: {
    register: {},
    animationData1: {},
    animationData2: {},
    hidden1: false,
    hidden2: true,
    isDisplay1: 'none',
    isDisplay2: 'none',
    isDisplay3: 'none',
    isDisplay4: 'none',
    isDisplay5: 'none',
    isDisplay6: 'none',
    warnMsg: '',
    isError: false,
    genderIndex: 0,
    gender: ['男', '女'],
    date: '2017-09-01',  //创建时间
    buildingId: 0,
    buildingName: '',
    roomId: 0,
    roomNum: '',
    password: '',
    next_btn: '下一步',
    hidden: false
  },
  // 检验姓名
  testName(e) {
    const name = e.detail.value
    if (util.checkName(name)) {
      this.setData({
        isDisplay1: ''
      })
    } else {
      this.setData({
        warnMsg: '输入姓名格式不正确',
        isError: true,
        isDisplay1: 'none'
      })
    }
  },
  // 检验身份证
  testIDcard(e) {
    const IDcard = e.detail.value
    if (util.checkIDcard(IDcard)) {
      this.setData({
        isDisplay2: ''
      })
    } else {
      this.setData({
        warnMsg: '输入身份证格式不正确',
        isError: true,
        isDisplay2: 'none'
      })
    }
  },
  // 检验年龄
  testAge(e) {
    const age = e.detail.value
    if (util.checkAge(age)) {
      this.setData({
        isDisplay3: ''
      })
    } else {
      this.setData({
        warnMsg: '输入年龄不正确',
        isError: true,
        isDisplay3: 'none'
      })
    }
  },
  // 检验联系电话
  testTel(e) {
    const phone = e.detail.value
    if (!util.checkPhone(phone)) {
      this.setData({
        warnMsg: '联系电话格式不正确',
        isError: true,
        isDisplay4: 'none'
      })
    } else {
      this.setData({
        isDisplay4: ''
      })
    }
  },
  // 监听日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 监听性别
  bindGenderChange: function (e) {
    this.setData({
      genderIndex: e.detail.value
    })
  },
  // 检测密码
  testPwd(e) {
    const pwd = e.detail.value
    const effort = util.checkPwd(pwd)
    if (effort == 0) {
      this.setData({
        warnMsg: '请输入密码',
        isError: true,
        isDisplay5: 'none'
      })
    } 
    else if (effort == -1) {
      this.setData({
        warnMsg: '输入密码仅限6位字符',
        isDisplay5: 'none',
        isError: true
      })
    } 
    else {
      this.setData({
        warnMsg: '',
        isError: false,
        isDisplay5: '',
        password: pwd
      })
    }
  },
  // 确认密码
  testAgain(e) {
    const inputPwd = e.detail.value
    if (this.data.password == '') {
      this.setData({
        warnMsg: '请输入密码',
        isDisplay6: 'none',
        isError: true
      })
    }else if(inputPwd != this.data.password) {
      this.setData({
        warnMsg: '前后输入密码不一致',
        isDisplay6: 'none',
        isError: true
      })
    }else {
      this.setData({
        warnMsg: '',
        isDisplay6: '',
        isError: false
      })
    }
  },
  next() {
    const FLAG = (this.data.isDisplay1 == '') &&
                 (this.data.isDisplay2 == '') &&
                 (this.data.isDisplay3 == '') &&
                 (this.data.isDisplay4 == '')
    if (!FLAG) {
      this.setData({
        warnMsg: '请先将信息填写完整',
        isError: true
      })
    } 
    else {
        // 动画效果
        if (this.data.hidden1 == false) {
          var animation1 = wx.createAnimation({
          duration: 400,
          timingFunction: 'ease',
        })
        animation1.opacity(0).step()
        this.setData({
          animationData1: animation1.export(),
        })
        var animation2 = wx.createAnimation({
          duration: 400,
          timingFunction: 'ease',
        })
        animation2.opacity(1).step()
        this.setData({
          animationData2: animation2.export(),
        })
        setTimeout(function () {
          this.setData({
            hidden1: true,
            hidden2: false,
            next_btn: '返回上一级'
          })
        }.bind(this), 400)
      } 
      else {
        var animation1 = wx.createAnimation({
          duration: 400,
          timingFunction: 'ease',
        })
        animation1.opacity(0).step()
        this.setData({
          animationData2: animation1.export(),
        })
        var animation2 = wx.createAnimation({
          duration: 400,
          timingFunction: 'ease',
        })
        animation2.opacity(1).step()
        this.setData({
          animationData1: animation2.export(),
        })
        setTimeout(function () {
          this.setData({
            hidden1: false,
            hidden2: true,
            next_btn: '下一步'
          })
        }.bind(this), 400)
      }
    }
  },
  // 提交表单
  submitRegister(e) {
    const FLAG = (this.data.isDisplay1 == "" && this.data.isDisplay2 == "") &&
                 (this.data.isDisplay3 == "" && this.data.isDisplay4 == "") &&
                 (this.data.isDisplay5 == "" && this.data.isDisplay6 == "")
    if (!FLAG) {
      wx.showModal({
        title: '出错啦',
        content: '请确认输入信息是否正确',
        showCancel: false
      })
    } else {
      const data = e.detail.value
      // 封装数据
      const register = new RegisterData(data)
      register.gender = this.data.gender[this.data.genderIndex]
      register.buildingId = this.data.buildingId
      register.roomId = this.data.roomId
      register.account = register.telephone
      // 密码加密
      register.password = SHA_256.sha256_digest(register.password)
      this.setData({
        register
      })
      // 提交表单并跳转登录页
      resgister(register).then(res => {
        const result = res.data
        if (result.status == 200) {
          wx.showToast({
            title: '注册成功',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.redirectTo({
                  url: '../login/login'
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
    // 获取query参数
    this.setData({
      buildingId: options.buildingId,
      buildingName: options.buildingName,
      roomNum: options.roomNum,
      roomId: options.roomId
    })
  }
})