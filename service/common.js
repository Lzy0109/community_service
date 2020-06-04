// 系统繁忙
export function systemBusy() {
  
}
// 发送错误
export function systemPutError() {
  wx.showModal({
    title: '出错啦',
    content: '填写信息有误',
    showCancel: false
  })
}
// 获取错误
export function systemGetError() {
  wx.showModal({
    title: '出错啦',
    content: '找不到该条记录',
    showCancel: false
  })
}
// 根据非200的状态码返回对应的信息
export function errorStatus(result) {
  const status = result.status
  // 逻辑错误
  if(status == 401) {
    wx.showModal({
      title: '出错啦',
      content: result.message,
      showCancel: false
    })
  }
  // 没有登录或权限
  if(status == 403) {
    wx.showModal({
      title: '请先登录',
      content: '您还没有登录',
      success(res) {
        if(res.confirm) {
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  }
  // 系统繁忙
  if(status == 500) {
    wx.showModal({
      title: '系统异常',
      content: '系统繁忙请稍后再试',
      showCancel: false
    })
  }
}