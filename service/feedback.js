import request from './network.js'
// 封装Feedback类
export class Feedback {
  constructor(feedback) {
    this.householdId = feedback.householdId;
    this.content = feedback.content;
    this.date = feedback.date;
    this.status = 0;
    this.reply = "";
  }
}
// 新增反馈信息
export function addFeedback(feedback) {
  return request({
    url: '/feedback',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: {
      householdId: feedback.householdId,
      content: feedback.content,
      date: feedback.date,
      status: feedback.status,
      reply: feedback.reply
    }
  })
}
// 获取我的反馈信息
export function getMyFeedbacks(householdId, pageNum, pageSize) {
  return request({
    url: '/feedback?householdId=' + householdId + 
          '&pageNum=' + pageNum + 
          '&pageSize=' + pageSize,
  })
}