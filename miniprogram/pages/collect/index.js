import User from '../../store/user/index'
import wxp from '../../utils/wxp'

Page({
  data: {
    activeType: 'goods',
    goodsList: [],
    slideButtons: [
      {
        type: 'warn',
        text: '取消收藏'
      }
    ]
  },

  onLoad (options) {
    this.setData({
      activeType: options.type
    })
    this.updateCollect()
  },

  updateCollect () {
    const goodsList = User.collect.getCollectList()
    this.setData({
      goodsList
    })
  },

  async removeCollect (e) {
    try {
      await wxp.showModal({ content: '是否移除此商品' })
      const goodsId = e.currentTarget.dataset.id
      User.collect.removeCollect(goodsId)
      this.updateCollect()
    } catch (error) {}
  },

  toGoodsDetailPage (e) {
    wx.navigateTo({ url: `/pages/goods-detail/index?goods_id=${e.detail}` })
  }
})