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
      this.setData({
        floorList
      })
    } catch (error) {}
  }
})
