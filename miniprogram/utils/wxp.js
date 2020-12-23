/*
 小程序 api promise
*/

function showModal (config) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      ...config,
      success: result => {
        if (result.confirm) {
          resolve()
        } else {
          reject()
        }
      },
      fail: reject
    })
  })
}

function chooseAddress () {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: resolve,
      fail: reject
    })
  })
}

export default {
  showModal,
  chooseAddress
}
