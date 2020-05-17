import request from './network.js'

export class Activity {
  constructor(activity) {
    this.id = activity.id;
    this.image = activity.id;
    this.title = activity.title;
    this.content = activity.content;
    this.address = activity.address;
    this.number = activity.number;
    this.date = activity.date;
    this.publisher = activity.publisher;
    this.publishDate = activity.publishDate;
  }
}

export class Register {
  constructor(register) {
    this.act_id = register.act_id;
    this.hh_id = register.hh_id;
    this.telephone = register.telephone;
    this.nums = register.nums;
  }
}
//分页获取
export function getActivities() {
  return request({
    //获取所有activity的url
    url: '/activity'
  })
}
//根据id获取
export function getActivityById(id) {
  return request({
    url: '/activity/' + id,
  })
}
//根据住户id获取参加、已过期的活动
export function getMyClosedActivities(househld_id, date) {
  return request({
    url: ''
  })
}
//根据住户id获取参加、正在进行的活动
export function getMyOngoingActivities(househld_id, date) {
  return request({
    url: ''
  })
}
//是否报名
export function isRegister(hh_id,act_id) {
  return request({
    url: ''
  })
}

//提交报名
export function addRegister(register) {
  return request({
    url: '',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      act_id: register.act_id,
      hh_id: register.hh_id,
      telephone: register.telephone,
      nums: register.nums
    }
  })
}