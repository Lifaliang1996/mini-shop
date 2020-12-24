import Cart from '../../store/cart/index'
import Address from '../../store/user/address'

Page({
  data: {
    goodsList: [],
    totalPrice: 0,
    address: {}
  },

  onLoad (options) {
    const address = Address.getAddress(options.addr_id)
    const goodsList = Cart.getCart().filter(g => g.checked)
    const totalPrice = goodsList.reduce((prev, cur) => {
      return prev + cur.goods_price * cur.num
    }, 0)
    this.setData({
      goodsList,
      totalPrice,
      address
    })
  },

  submitOrder () {
    wx.showToast({
      title: '暂不支持相关功能',
      icon: 'none'
    })
  }
})
