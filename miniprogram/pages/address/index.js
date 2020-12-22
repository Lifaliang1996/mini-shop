import User from '../../store/user/index'
import wxp from '../../utils/wxp'

Page({
  data: {
    addrList: []
  },

  onShow () {
    this.updateAddress()
  },

  updateAddress () {
    const addrList = User.address.getAddressList()
    this.setData({
      addrList
    })
  },

  async getAddrByWx () {
    try {
      const address = await wxp.chooseAddress()
      delete address.errMsg
      User.address.addAddress(address)
      this.updateAddress()
    } catch (error) {}
  },

  async removeAddress (e) {
    try {
      await wxp.showModal({ title: '确定要删除此地址吗' })
      User.address.removeAddress(e.currentTarget.dataset.id)
      this.updateAddress()
      wxp.showToast({
        title: '删除成功',
        icon: 'success'
      })
    } catch (error) {}
  },

  async setDefaultAddress (e) {
    try {
      User.address.setDefault(e.currentTarget.dataset.id)
      this.updateAddress()
      wxp.showToast({
        title: '设置成功',
        icon: 'success'
      })
    } catch (error) {}
  },

  // 跳转到地址编辑页
  toEditPage () {
    wx.navigateTo({
      url: '/pages/address-edit/index'
    })
  }
})
