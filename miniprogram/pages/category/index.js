import request from '../../utils/request'

// 缓存分类数据：{ time, data }
const CATEGORY_DATA = 'CATEGORY_DATA'

Page({
  data: {
    // 当前选中的分类
    activeIndex: 0,
    // 左侧大分类
    leftCategories: [],
    // 右侧分类详情
    rightContent: [],
    // 右侧详情滚动距顶部距离
    scrollTop: 0
  },

  // 请求的原始数据
  cateRawData: {},

  onLoad () {
    this.getCategoryList()
  },

  /**
   * 获取分类数据，有缓存且没过期（10分钟），则用缓存，否则请求
   */
  async getCategoryList () {
    try {
      let { time, data: categoryList } = wx.getStorageSync(CATEGORY_DATA)

      // 无缓存或缓存已过期，请求数据并缓存
      if (!categoryList || Date.now() - time > 600000) {
        categoryList = await request({ url: '/categories' })
        // 缓存数据
        wx.setStorage({
          key: CATEGORY_DATA,
          data: { time: Date.now(), data: categoryList }
        })
      }

      this.cateRawData = categoryList

      const leftCategories = categoryList.map(category => category.cat_name)
      const rightContent = categoryList[0].children
      this.setData({
        leftCategories,
        rightContent
      })
    } catch (error) {}
  },

  // 当前选中的分类发生改变
  handleActiveChange (e) {
    const activeIndex = e.detail
    const rightContent = this.cateRawData[activeIndex].children
    this.setData({
      activeIndex,
      rightContent,
      scrollTop: 0
    })
  },

  toGoodsListPage () {
    wx.navigateTo({ url: '/pages/goods-list/index' })
  }
})
