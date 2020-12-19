import request from '../../utils/request'

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
  }
})
