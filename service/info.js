import request from './network.js'

export class Household {
  constructor(household) {
    this.name = household.name;
    this.gender = household.gender;
    this.age = household.age;
    this.telephone = household.telephone;
    this.IDcard = household.IDcard;
    this.arrivalDate = household.arrivalDate;
    this.isOwner = 0,
    this.buildingId = household.buildingId;
    this.roomId = household.roomId;
  }
}
//获取我的个人信息
export function getHouseholdById(id) {
  return request({
    url: '/household/' + id,
  })
}
//修改个人信息
export function updateHousehold(household) {
  return request({
    url: '/household',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      _method: 'PUT',
      id: household.id,
      name: household.name,
      gender: household.gender,
      age: household.age,
      telephone: household.telephone,
      IDcard: household.idcard,
      arrivalDate: household.arrivalDate,
      isOwner: household.isOwner,
      buildingId: household.buildingId,
      roomId: household.roomId,
    }
  })
}