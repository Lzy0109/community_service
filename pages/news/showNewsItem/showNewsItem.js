// pages/news/showNewsItem/showNewsItem.js
var common = require('../../../service/common.js')
import {
  getNewsById
} from '../../../service/news.js'
Page({
  data: {
    news: {
      id: '1',
      image: '/assets/test/test.jpg',
      title: '第一次社区新闻的标题',
      content: `<h1 style="text-align: center;">第三次测试的标题</h1>
<p style="text-align: center;">发布时间：2020年5月13日 17点34分</p>
<hr />
<p style="text-align: right;">这是第三次测试的摘要内容。</p>
<p style="text-align: right;">作者：测试员3号</p>
<p>      第一段测试内容。很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长。</p>
<p style="text-align: center;"><img alt="居中" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" height="250" width="333" /></p>
<p style="text-align: center;">（1）这是个居中的图。</p>
<p>      这是第二段内容。比第一段就长那么亿点点。真的就是一点点。点点点点点点点点点点点点点点点点点点点点点点点点点点点点点点点点点点点点点点点点。</p>
<p>      这是第三段内容。结束了。</p>
<hr />
<p><span style="text-decoration: line-through;"><strong>图片测试（这是带有删除线的文字）</strong></span></p>
<p><span style="color: #993366;">字体颜色测试</span></p>
<p><span style="color: #ffffff; background-color: #000000;">带上背景色</span></p>
<p><em>斜体</em></p>
<p><span style="text-decoration: underline;"><em>下划线</em></span></p>
<p><img alt="居左" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" height="150" width="200" /></p>
<p>（2）这是个居左的图</p>
<p style="text-align: right;"><img alt="居右" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" height="150" width="200" /></p>
<hr />
<p style="text-align: center;">图片下的文字编辑</p>`, 
      author: '发布作者',
      date: '2020-20-20'
    }
  },
  onLoad: function (options) {
    const id = options.id
    console.log(id)
    getNewsById(id).then(res => {
      const result = res.data
      if(result.status == 1){
        const news = result.data
        this.setData({
          news
        })
      }else {
        common.system_busy()
      }
    })
  }
})