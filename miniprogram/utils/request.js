const BASEURL = 'https://api-hmugo-web.itheima.net/api/public/v1'

export default function request (params) {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: BASEURL + params.url,
      method: 'GET',
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
      }
    })
  })
}
