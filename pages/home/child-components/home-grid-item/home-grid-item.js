// pages/home/child-components/home-grid-item/home-grid-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgPath: String,
    name: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(){
      this.triggerEvent('itemClick', {}, {})
    }
  }
})
