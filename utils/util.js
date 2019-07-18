const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const toast = text => {
  wx.showToast({
    title: text,
    icon: 'none',
    duration: 1000
  })
  setTimeout(wx.hideToast, 1000)
}

const getRequest = (url, data=null, isDetail=false) => {
  const path = `https://test-miniprogram.com${url}`
  return new Promise(resolve => {
    wx.request({
      url: path,
      method: 'GET',
      data: data,
      success(res) {
        wx.setStorage({
          key: isDetail ? 'detail' : 'response',
          data: res,
        })
        resolve()
      },
      fail() {
        toast('数据获取失败')
      }
    })
  })
}

const checkUndefined = list => list
  .map(item => 
    ({ ...item, 
    firstImage: item.firstImage === undefined ? 'https://s3-us-west-1.amazonaws.com/udacity-content/rebrand/svg/logo.min.svg' : item.firstImage,
    source: item.source === undefined ? '未知来源' : item.source}))

module.exports = {
  formatTime: formatTime,
  getRequest: getRequest,
  toast: toast,
  checkUndefined: checkUndefined
}
