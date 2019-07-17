// pages/details/details.js
import { getRequest, toast, formatTime } from '../../utils/util.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    source: '',
    date: '',
    readCount: 0,
    content: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options
    wx.showLoading({
      title: '请稍候',
    })
    getRequest('/api/news/detail', {id: id}, true)
      .then(() => {
        const resp = wx.getStorageSync('detail')
        console.log(resp)
        if (resp.data.code === 200 && resp.data.result) {
          const contents = resp.data.result
          const {title, source, date, readCount, content} = contents
          this.setData({
            title: title,
            source: source,
            date: formatTime(new Date(date)),
            readCount: readCount,
            content: content
          })
        } else {
          toast('无数据')
        }
      }).then(wx.hideLoading)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})