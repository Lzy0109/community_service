import request from './network.js'
// 分页获取
export function getNews(pageNum, pageSize) {
  return request({
    //  获取news的url
    url: '/news?pageNum=' + pageNum + '&pageSize=' + pageSize
  })
}
// 根据id获取
export function getNewsById(id) {
  return request({
    url: '/news/' + id
  })
}