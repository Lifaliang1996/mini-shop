import wxp from '../../utils/wxp'
import User from '../../store/user/index'

Page({
  data: {
    userName: '',
    telNumber: '',
    provinceName: '',
    cityName: '',
    countyName: '',
    detailInfo: '',
    nationalCode: '',
    postalCode: '',
    isDefault: false,
    // id 有值是编辑，否则是新增
    id: ''
  },

  onLoad (option) {
    const { addressId } = option
    if (addressId) {
      this.initAddrForm(addressId)
    }
  },

  // 传入 ID 是编辑，否则是新增
  initAddrForm (addressId) {
    const address = User.address.getAddress(addressId)
    if (!address) return

    const {
      id,
      userName,
      telNumber,
      provinceName,
      cityName,
      countyName,
      detailInfo,
      nationalCode,
      postalCode
    } = address

    this.setData({
      id,
      userName,
      telNumber,
      provinceName,
      cityName,
      countyName,
      detailInfo,
      nationalCode,
      postalCode
    })
  },

  // 修改省市区
  changeRegion (e) {
    const res = e.detail
    this.setData({
      provinceName: res.value[0],
      cityName: res.value[1],
      countyName: res.value[2],
      nationalCode: res.code[2],
      postalCode: res.postcode
    })
  },

  changeIsDefault (e) {
    this.setData({
      isDefault: e.detail
    })
  },

  saveAddress () {
    const address = {
      userName: this.data.userName,
      telNumber: this.data.telNumber,
      provinceName: this.data.provinceName,
      cityName: this.data.cityName,
      countyName: this.data.countyName,
      detailInfo: this.data.detailInfo,
      nationalCode: this.data.nationalCode,
      postalCode: this.data.postalCode
    }
    const { id, isDefault } = this.data
    if (id) {
      // 修改
      address.id = id
      User.address.updateAddress(address, isDefault)
    } else {
      // 添加
      User.address.addAddress(address, isDefault)
    }
    wx.navigateBack()
  },

  async removeAddress () {
    try {
      const id = this.data.id
      await wxp.showModal({ title: '确定要删除此地址吗' })
      User.address.removeAddress(id)
      wx.showToast({
        title: '删除成功',
        icon: 'success'
      })
      wx.navigateBack()
    } catch (error) {}
  }
})
