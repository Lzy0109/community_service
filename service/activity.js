import request from './network.js'
// 封装Register类
export class Register {
  constructor(register) {
    this.act_id = register.act_id;
    this.hh_id = register.hh_id;
    this.telephone = register.telephone;
    this.num = register.num;
  }
}
// 分页获取
export function getActivities(pageNum, pageSize) {
  return request({
    url: '/activity?pageNum=' + pageNum + '&pageSize=' + pageSize
  })
}
// 根据id获取
export function getActivityById(id, hh_id) {
  return request({
    url: '/household/activity/' + id + '?hh_id=' + hh_id,
  })
}
// 根据住户id获取参加、已过期的活动
export function getMyClosedActivities(hh_id, pageNum, pageSize) {
  return request({
    url: '/household/activity/overdue',
    data: {
      hh_id,
      pageNum,
      pageSize
    }
  })
}
// 根据住户id获取参加、正在进行的活动
export function getMyOngoingActivities(hh_id, pageNum, pageSize) {
  return request({
    url: '/household/activity/underway',
    data: {
      hh_id,
      pageNum,
      pageSize
    }
  })
}
// 提交报名
export function addRegister(register) {
  return request({
    url: '/activityRegister',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      act_id: register.act_id,
      hh_id: register.hh_id,
      telephone: register.telephone,
      num: register.num
    }
  })
}
// 取消活动预约
export function deleteRegister(id) {
  return request({
    url: '/activityRegister/' + id,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      _method: 'DELETE'
    }
  })
}