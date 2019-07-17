// pages/components/navBar.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isSimple: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    navHeight: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back: function() {
      wx.navigateBack()
    }
  },
  attached: () => {
  }
})
