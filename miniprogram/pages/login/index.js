import User from '../../store/user/index'

Page({
  data: {
    phone: '',
    password: '',
    disabled: true,
    isValid: true
  },

  loginByWx (e) {
    const userInfo = e.detail.userInfo
    if (userInfo) {
      User.userInfo.saveUserInfo(userInfo)
      wx.navigateBack()
    }
  },

  checkPhone () {
    console.log(1)
    const isValid = /^1\d{10}/.test(this.data.phone)
    this.setData({
      isValid
    })
  },

  loginByPhone () {
    wx.showLoading()
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '登录失败，账号或密码错误',
        icon: 'none'
    })
    }, 1500)
  }
})
