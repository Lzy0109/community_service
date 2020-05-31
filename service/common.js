// 系统繁忙
export function systemBusy() {
  wx.showModal({
    title: '系统异常',
    content: '系统繁忙请稍后再试',
    showCancel: false
  })
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