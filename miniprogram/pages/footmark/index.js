import Footmark from '../../store/footmark/index'

Page({
  data: {
    goodsList: [],
    slideButtons: [
      {
        type: 'warn',
        text: '扫除足迹'
      }
    ]
  },

  onLoad () {
    this.updateFootmark()
  },

  updateFootmark () {
    const goodsList = Footmark.getFootmark()
    this.setData({
      goodsList
    })
  },

  removeFootmark (e) {
    const goodsId = e.currentTarget.dataset.id
    Footmark.removeFootmark(goodsId)
    this.updateFootmark()
  },

  toGoodsDetailPage (e) {
    wx.navigateTo({ url: `/pages/goods-detail/index?goods_id=${e.detail}` })
  }
})
