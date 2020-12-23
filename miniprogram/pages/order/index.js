// pages/order/index.js
Page({
  data: {
    activeType: 'daifukuan'
  },

  onLoad (options) {
    this.setData({
      activeType: options.type
    })
  }
})
