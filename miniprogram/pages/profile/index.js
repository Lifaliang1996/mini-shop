import User from '../../store/user/index'
import wxp from '../../utils/wxp'

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

  onShareAppMessage () {
    return {
      title: '大白熊的小小店',
      path: '/pages/home/index',
      imageUrl: '../../assets/images/share.jpg'
    }
  },

  initUserInfo () {
    const userInfo = User.userInfo.getUserInfo()
    if (userInfo) {
      this.setData({
        userInfo
      })
    }
  },

  async toOrderPage (e) {
    try {
      if (!this.data.userInfo) {
        await wxp.showModal({
          content: '登录后可查看订单'
        })
        wx.navigateTo({ url: '/pages/login/index' })
      } else {
        const { type } = e.currentTarget.dataset
        wx.navigateTo({
          url: `/pages/order/index?type=${type}`
        })
      }
    } catch (error) {}
  },

  // 拨打客服电话
  makePhoneCall (e) {
    const { phone } = e.currentTarget.dataset
    wx.makePhoneCall({
      phoneNumber: phone
    })
  }
})
