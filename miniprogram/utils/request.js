const BASEURL = 'https://api-hmugo-web.itheima.net/api/public/v1'

// 当前总请求个数
let count = 0

export default function request (params) {
  return new Promise((resolve, reject) => {
    count += 1
    if (count === 1) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
    }
    wx.request({
      method: 'GET',
      ...params,
      url: BASEURL + params.url,
      success: result => {
        const {data} = result
        if (data.meta.status === 200) {
          resolve(data.message)
        } else {
          reject(data.meta.msg)
        }
      },
      fail: error => {
        reject(error)
      },
      complete: () => {
        count -= 1
        if (count === 0) {
          wx.hideLoading()
        }
      }
    })
  })
}
