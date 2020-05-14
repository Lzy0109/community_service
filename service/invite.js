import request from './network.js'

//获取access_token(用于生成QRCode)
export function getAccessToken() {
  return new request({
    url: '/getAccessToken',
    method: 'POST'
  })
}