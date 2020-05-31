import request from './network.js'
// 获取房间信息
export function getRoomById(id) {
  return request({
    url: '/room/' + id
  })
}