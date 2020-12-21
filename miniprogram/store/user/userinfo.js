const KEY = 'USER_INFO'

/**
 * 将用户信息储存到缓存
 * @param {object} userInfo
 */
function saveUserInfo (userInfo) {
  try {
    wx.setStorageSync(KEY, userInfo)
  } catch (error) {}
}

/**
 * 从缓存中读取用户信息
 * @return {object} 用户信息
 */
function getUserInfo () {
  try {
    return wx.getStorageSync(KEY)
  } catch (error) {}
}

export default {
  getUserInfo,
  saveUserInfo
}
