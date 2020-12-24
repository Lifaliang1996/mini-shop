import Cart from '../../store/cart/index'
import User from '../../store/user/index.js'
import wxp from '../../utils/wxp'

Page({
  data: {
    slideButtons: [
      {
        type: 'warn',
        text: '删除'
      }
    ],
    goodsList: [],
    checkedAll: false,
    totalNum: 0,
    totalPrice: 0,
    // 地址选择面板是否展示
    actionSheetShow: false,
    // 收货地址列表
    addressList: [],
    // 当前选择的收货地址
    currentAddr: {},
    isLogin: false
  },

  onShow () {
    this.updateData()
    this.initIsLogin()
    if (!this.data.currentAddr.id) {
      this.initAddress()
    }
  },

  initIsLogin () {
    const userInfo = User.userInfo.getUserInfo()
    this.setData({
      isLogin: !!userInfo
    })
  },

  initAddress () {
    const addressList = User.address.getAddressList()
    this.setData({
      addressList,
      currentAddr: addressList[0] || {}
    })
  },

  // 更改地址
  changeCurrentAddr (e) {
    const id = e.detail.value
    const currentAddr = this.data.addressList.find(addr => addr.id === id)
    this.setData({
      currentAddr
    })
    this.hideActionSheet()
  },

  // 显示地址选择上拉框
  showActionSheet () {
    this.setData({
      actionSheetShow: true
    })
  },

  // 隐藏地址选择上拉框
  hideActionSheet (isShow = true) {
    this.setData({
      actionSheetShow: false
    })
  },

  // 更新 checkedAll、totalPrice、totalNum 属性
  updateData () {
    const goodsList = Cart.getCart()
    let totalNum = 0
    let totalPrice = 0

    goodsList.forEach(goods => {
      if (goods.checked) {
        totalNum += goods.num
        totalPrice += goods.goods_price * goods.num
      }
    })

    const checkedAll = goodsList.length
      ? goodsList.every(goods => goods.checked)
      : false

    this.setData({
      goodsList,
      totalNum,
      totalPrice,
      checkedAll
    })
  },

  changeGoodsNum (e) {
    const newNum = e.detail
    const goodsId = e.currentTarget.dataset.id
    Cart.changeNum(goodsId, newNum)
    this.updateData()
  },

  changeGoodsChecked (e) {
    const goodsId = e.currentTarget.dataset.id
    Cart.changeChecked(goodsId)
    this.updateData()
  },

  // 全选与反选
  changeCheckedAll () {
    const current = this.data.checkedAll
    Cart.changeCheckedAll(!current)
    this.updateData()
  },

  // 滑动单元格选择删除
  async slideButtonTap (e) {
    try {
      await wxp.showModal({ content: '是否移除此商品' })
      const goodsId = e.currentTarget.dataset.id
      Cart.removeGoods(goodsId)
      this.updateData()
    } catch (error) {}
  },

  toPayPage () {
    wx.navigateTo({ url: `/pages/pay/index?addr_id=${this.data.currentAddr.id}`} )
  },

  toGoodsDetailPage (e) {
    wx.navigateTo({ url: `/pages/goods-detail/index?goods_id=${e.detail}` })
  }
})
