// pages/info/child-components/info-item/info-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iconPath: String,
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
