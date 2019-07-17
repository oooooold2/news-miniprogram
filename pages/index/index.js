//index.js
//获取应用实例
import { getRequest, toast, formatTime } from '../../utils/util.js'
const app = getApp()

Page({
  data: {
    newsList : [
      { key: "gn", value: "国内", isActive: true },
      { key: "gj", value: "国际" },
      { key: "cj", value: "财经" },
      { key: "yl", value: "娱乐" },
      { key: "js", value: "军事" },
      { key: "ty", value: "体育" },
      { key: "other", value: "其他" }
    ],
    currentCat: "gn",
    topNews: {},
    otherNews: []
  },
  // 切换分类时发送请求，更新页面，并修改被选择分类的样式
  typeTapped(ev) {
    const category = ev.target.dataset.type
    if (category !== this.data.currentCat) {
      wx.showLoading({
        title: '请稍候',
      })
      getRequest("/api/news/list", {type: category})
        .then(this.setList)
        .then(wx.hideLoading)
      this.data.currentCat = category
      const list = this.data.newsList.map(item => ({ ...item, isActive: item.key === category}))
      this.setData({
        newsList: list
      })
    }
  },
  setList: function() {
    const resp = wx.getStorageSync('response')
    if (resp.data.code === 200 && resp.data.result.length > 0) {
      const newsList = resp.data.result
      this.setNews(newsList)
    } else {
      toast('无数据')
    }
  },
  onLoad: function() {
    getRequest("/api/news/list", {type: 'gn'})
    .then(this.setList)
  },
  setNews: function (list) {
    let [first, ...others] = list.map(item => ({ ...item, date: formatTime(new Date(item.date))}))
    this.setData({
      topNews: first,
      otherNews: others
    })
  },
  redirectToDetails(ev) {
    const id = ev.target.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  }
})
