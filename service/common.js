export function system_busy() {
  wx.showModal({
    title: '出错啦',
    content: '系统繁忙请稍后再试',
    showCancel: false
  })
}