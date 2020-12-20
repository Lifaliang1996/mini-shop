import request from '../../utils/request'
import Cart from '../../store/cart'
const app = getApp()

Page({
  data: {
    goodsName: '',
    goodsPrice: 0,
    goodsPic: [],
    goodsIntroduce: '',
    goodsAttrs: []
  },

  // 源数据
  goodsRaw: {},

  onLoad (options) {
    this.getGoodsDetail(options.goods_id)
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
    const goods = this.goodsRaw
    Cart.addGoods({
      goodsId: goods.goods_id,
      name: goods.goods_name,
      price: goods.goods_price,
      pic: goods.goods_small_logo
    })
    console.log(app.store.getState())
  },

  // 跳转到 Cart 页面
  switchToCart () {
    wx.switchTab({
      url: '/pages/cart/index'
    })
  }
})
