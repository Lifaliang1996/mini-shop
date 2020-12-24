import User from '../../store/user/index'
import Footmark from '../../store/footmark/index'

Page({
  data: {
    userInfo: null,
    collectGoodsNum: 0,
    collectShopNum: 0,
    footmarkNum: 0
  },

  onShow () {
    this.updateUserInfo()
    if (this.data.userInfo) {
      this.updateCollect()
    }
    this.updateFootmark()
  },

  onShareAppMessage () {
    return {
      title: '大白熊的小小店',
      path: '/pages/home/index',
      imageUrl: '../../assets/images/share.jpg'
    }
  },

  updateUserInfo () {
    const userInfo = User.userInfo.getUserInfo()
    if (userInfo) {
      this.setData({
        userInfo
      })
    }
  },

  updateCollect () {
    const collectGoodsNum = User.collect.getCollectList().length
    this.setData({
      collectGoodsNum
    })
  },

  updateFootmark () {
    const footmarkNum = Footmark.getFootmark().length
    this.setData({
      footmarkNum
    })
  },

  toOrderPage (e) {
    if (!this.data.userInfo) {
      wx.navigateTo({ url: '/pages/login/index' })
    } else {
      const { type } = e.currentTarget.dataset
      wx.navigateTo({
        url: `/pages/order/index?type=${type}`
      })
    }
  },

  toCollectPage (e) {
    if (!this.data.userInfo) {
      wx.navigateTo({ url: '/pages/login/index' })
    } else {
      const { type } = e.currentTarget.dataset
      wx.navigateTo({
        url: `/pages/collect/index?type=${type}`
      })
    }
  },

  toFootmarkPage () {
    wx.navigateTo({ url: '/pages/footmark/index'} )
  },

  // 拨打客服电话
  makePhoneCall (e) {
    const { phone } = e.currentTarget.dataset
    wx.makePhoneCall({
      phoneNumber: phone
    })
  }
})
