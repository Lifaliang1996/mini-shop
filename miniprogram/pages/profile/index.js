import User from '../../store/user/index'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  onShow () {
    this.initUserInfo()
  },

  initUserInfo () {
    const userInfo = User.userInfo.getUserInfo()
    if (userInfo) {
      this.setData({
        userInfo
      })
    }
  }
})
