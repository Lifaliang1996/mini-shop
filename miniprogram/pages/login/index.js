import User from '../../store/user/index'

Page({
  data: {},

  loginByWx (e) {
    const userInfo = e.detail.userInfo
    if (userInfo) {
      User.userInfo.saveUserInfo(userInfo)
      wx.navigateBack()
    }
  }
})
