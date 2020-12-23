// pages/home/index.js
import request from '../../utils/request'

Page({
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
  },

  onLoad () {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },

  /**
   * 获取轮播图数据
   */
  async getSwiperList () {
    try {
      const swiperList = await request({ url: '/home/swiperdata' })
      this.setData({
        swiperList
      })
    } catch (error) {}
  },

  /**
   * 获取导航块数据
   */
  async getCateList () {
    try {
      const cateList = await request({ url: '/home/catitems' })
      this.setData({
        cateList
      })
    } catch (error) {}
  },

  /**
   * 获取楼层导航数据
   */
  async getFloorList () {
    try {
      const floorList = await request({ url: '/home/floordata' })
      floorList.forEach(floor => {
        floor.product_list.forEach(prod => {
          prod.keyword = prod?.navigator_url?.match(/.+query=(.+)/)[1]
        })
      })
      this.setData({
        floorList
      })
    } catch (error) {}
  },

  toGoodsListPage () {
    wx.navigateTo({ url: '/pages/goods-list/index' })
  }
})
