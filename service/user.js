import request from './network.js'
// 封装RegisterData类
export class RegisterData {
  constructor(data){
    this.name = data.name;
    this.gender = data.gender;
    this.age = data.age;
    this.telephone = data.telephone;
    this.IDcard = data.IDcard;
    this.arrivalDate = data.arrivalDate;
    this.isOwner = 0;
    this.buildingId = data.buildingId;
    this.roomId = data.roomId;
    this.password = data.password
  }
}
// 验证旧密码
export function verifyPassword(hh_id, password) {
  return request({
    url: '/user/password',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      hh_id,
      password
    }
  })
}
// 修改密码
export function modifyPassword(hh_id, password) {
  return request({
    url: '/user/newPassword',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      hh_id,
      password
    }
  })
}
// 注册
export function resgister(registerData) {
  return request({
    url: '/household/register',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      name: registerData.name,
      account: registerData.account,
      gender: registerData.gender,
      age: registerData.age,
      telephone: registerData.telephone,
      IDcard: registerData.IDcard,
      arrivalDate: registerData.arrivalDate,
      isOwner: 0,
      buildingId: registerData.buildingId,
      roomId: registerData.roomId,
      password: registerData.password
    }
  })
}