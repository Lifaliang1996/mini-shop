import request from '../../utils/request'
import Cart from '../../store/cart/index'
import User from '../../store/user/index'

Page({
  data: {
    goodsName: '',
    goodsPrice: 0,
    goodsPic: [],
    goodsIntroduce: '',
    goodsAttrs: [],
    cartLength: 0,
    btnTopShow: false,
    isCollected: false
  },
  goodsId: '',
  isLogin: false,
  // 源数据
  goodsRaw: {},

  onLoad (options) {
    this.goodsId = options.goods_id
    this.updateCartLength()
    this.getGoodsDetail(options.goods_id)
  },

  onShow () {
    this.initIsLogin()
    if (this.isLogin) {
      this.updateIsCollected()
    }
  },

  // 返回顶部按钮是否显示
  onPageScroll (e) {
    if (e.scrollTop > 1000) {
      this.setData({
        btnTopShow: true
      })
    } else if (this.data.btnTopShow) {
      this.setData({
        btnTopShow: false
      })
    }
  },

  initIsLogin () {
    this.isLogin = !!User.userInfo.getUserInfo()
  },

  scrollToTop () {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },

  updateCartLength () {
    const cartLength = Cart.getCart().length || null
    this.setData({
      cartLength
    })
  },

  // 获取商品数据
  async getGoodsDetail (goods_id) {
    try {
      const goods = await request({
        url: '/goods/detail',
        data: {
          goods_id
        }
      })

      this.goodsRaw = goods
      this.setData({
        goodsName: goods.goods_name,
        goodsPrice: goods.goods_price,
        goodsPic: goods.pics.map(pic => pic.pics_big_url),
        goodsIntroduce: goods.goods_introduce,
        goodsAttrs: goods.attrs
      })
    } catch (error) {}
  },

  // 预览大图
  previewImage (e) {
    const current = e.currentTarget.dataset.index
    wx.previewImage({
      current,
      urls: this.data.goodsPic
    })
  },

  // 加入购物车
  addToCart () {
    const {
      goods_id,
      goods_name,
      goods_price,
      goods_small_logo
    } = this.goodsRaw
    Cart.addGoods({
      goods_id,
      goods_name,
      goods_price,
      goods_small_logo
    })
    this.updateCartLength()
  },

  updateIsCollected () {
    const isCollected = User.collect.isCollected(this.goodsId)
    this.setData({
      isCollected
    })
  },

  // 添加、取消收藏
  addOrRemoveCollect () {
    if (!this.isLogin) {
      wx.navigateTo({ url: '/pages/login/index' })
      return
    }
    if (this.data.isCollected) {
      User.collect.removeCollect(this.goodsRaw.goods_id)
      wx.showToast({
        title: '取消收藏成功',
        icon: 'success'
      })
    } else {
      const {
        goods_id,
        goods_name,
        goods_price,
        goods_small_logo
      } = this.goodsRaw
      User.collect.addCollect({
        goods_id,
        goods_name,
        goods_price,
        goods_small_logo
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
      })
    }
    this.updateIsCollected()
  },

  // 跳转到 Cart 页面
  switchToCart () {
    wx.switchTab({
      url: '/pages/cart/index'
    })
  },

  backPage () {
    wx.navigateBack()
  },

  toHomePage () {
    wx.switchTab({ url: '/pages/home/index' })
  },

  toGoodsListPage () {
    wx.navigateTo({ url: '/pages/goods-list/index' })
  }
})
