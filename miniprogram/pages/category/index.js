import request from '../../utils/request'

// 缓存分类数据：{ time, data }
const CATEGORY_DATA = 'CATEGORY_DATA'

Page({
  data: {
    categoryList: [],
    // 当前选中的分类
    activeIndex: 0,
    // 右侧分类详情
    categoryContent: [],
    // 右侧详情滚动距顶部距离
    scrollTop: 0
  },

  onLoad () {
    this.getCategoryList()
  },

  /**
   * 获取分类数据，有缓存且没过期（10分钟），则用缓存，否则请求
   */
  async getCategoryList () {
    try {
      let { time, data: categoryList } = wx.getStorageSync(CATEGORY_DATA)
      if (!categoryList || Date.now() - time > 600000) {
        categoryList = await request({ url: '/categories' })
        // 缓存数据
        wx.setStorage({
          key: CATEGORY_DATA,
          data: { time: Date.now(), data: categoryList }
        })
      }

      const categoryContent = categoryList[0].children
      this.setData({
        categoryList,
        categoryContent
      })
    } catch (error) {}
  },

  // 当前选中的分类发生改变
  handleActiveChange (e) {
    const activeIndex = e.detail
    const categoryContent = this.data.categoryList[activeIndex].children
    this.setData({
      activeIndex,
      categoryContent,
      scrollTop: 0
    })
  }
})
