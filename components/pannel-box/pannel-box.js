// components/pannel-box/pannel-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    content: String,
    imgPath: String
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
    itemClick() {
      this.triggerEvent('itemClick', {}, {})
    }
  }
})
