// pages/order/index.js
Page({
  data: {
    activeType: 'quanbudingdan'
  },

  onLoad (options) {
    this.setData({
      activeType: options.type
    })
  }
})
