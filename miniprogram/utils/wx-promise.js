/**
 * 
 * @param {object} config 同原生 wx.showModal
 */
export function showModal ({ title = '提示', content = '提示的内容' }) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      success (res) {
        if (res.confirm) {
          resolve()
        } else if (res.cancel) {
          reject()
        }
      },
      fail () {
        reject()
      }
    })
  })
}
