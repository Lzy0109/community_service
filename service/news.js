import request from './network.js'

export class News {
  constructor(news) {
    this.id = news.id;
    this.image = news.image;
    this.title = news.title;
    this.content = news.content;
    this.author = news.author;
    this.date = news.date;
  }
}
//分页获取
export function getNews(pageNo,pageSize) {
  return request({
    //获取news的url
    url: ''
  })
}
//根据id获取
export function getNewsById(id) {
  return request({
    url: ''
  })
}