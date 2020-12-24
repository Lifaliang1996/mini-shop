import request from '../../utils/request'

Page({
  data: {
    // 搜索的关键词
    searchKey: '',
    // 搜索页面是否显示
    searchShow: false,
    // 热门搜索标签
    hotTags: [
      '华为',
      '洗发露',
      '小米',
      '饼干',
      '羽绒服',
      '袜子',
      '内衣',
      '手表',
      '裤子',
      '衣服',
      '这是一个不存在的商品'
    ],
    // 空状态是否显示
    emptyShow: false,
    goodsList: [],
    // 商品列表滚动距离
    scrollTop: 0,
    isRefreshing: false,
    // 置顶按钮是否显示
    btnTopShow: false
  },

  // 请求数据
  cid: '',
  pagenum: 1,
  pagesize: 10,

  // 后台总条数
  total: 0,
  // 商品列表的源数据
  goodsListRaw: [],
  // 当前排序方式
  type: 0,

  onLoad (options) {
    const { cid, key } = options
    if (!cid && !key) {
      this.setData({
        searchShow: true
      })
      return
    }
    if (cid) {
      this.cid = cid
    }
    if (key) {
      this.setData({
        searchKey: key
      })
    }
    this.getGoodsList()
  },

  async getGoodsList () {
    try {
      const reqData = {
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }
      if (this.cid) {
        reqData.cid = this.cid
      } else {
        reqData.query = this.data.searchKey
      }
      const data = await request({
        url: '/goods/search',
        data: reqData
      })
      const goodsList = data.goods
      if (goodsList.length) {
        this.pagenum += 1
        this.total = data.total
        this.goodsListRaw.push(...goodsList)
        this.setData({
          goodsList: this.data.goodsList.concat(goodsList)
        })
      } else {
        this.setData({
          emptyShow: true
        })
      }
    } catch (error) {}

    this.setData({
      isRefreshing: false
    })
  },

  // 加载更多
  getMoreGoodsList () {
    if (this.total <= this.pagenum * this.pagesize) {
      wx.showToast({
        title: 'o(╥﹏╥)o 没有更多了',
        icon: 'none'
      })
      return
    }

    this.getGoodsList()
  },

  // 点击导航栏返回按钮
  handleBack () {
    wx.navigateBack()
  },

  // 下拉刷新
  refreshGoodsList () {
    this.setData({
      isRefreshing: true
    })
    this.pagenum = 1
    this.goodsListRaw.length = 0
    this.setData({
      goodsList: []
    })
    this.getGoodsList()
  },

  /**
   * 搜索框获得焦点
   * 搜索页面覆盖商品列表
   */
  handleFocus () {
    this.setData({
      searchShow: true
    })
  },

  /**
   * 点击取消搜索
   * 搜索页面隐藏
   */
  handleCancelSearch () {
    this.setData({
      searchShow: false
    })
  },

  /**
   * 还原为初始状态
   */
  resetData () {
    this.goodsListRaw.length = 0
    this.cid = ''
    this.pagenum = 1
    this.setData({
      goodsList: [],
      emptyShow: false
    })
  },

  /**
   * 确认搜索：
   * 初始化状态
   * 根据关键词获取商品列表
   * 隐藏搜索框
   */
  handleSearch (e) {
    const key = e.detail
    if (!key) return
    this.resetData()
    this.scrollToTop()
    this.setData({
      searchShow: false
    })
    this.getGoodsList()
  },

  // 点击搜索 tag
  async handleTapTag (e) {
    const tag = e.currentTarget.dataset.tag
    this.resetData()
    this.setData({
      searchKey: tag,
      searchShow: false,
      scrollTop: 0
    })
    this.getGoodsList()
  },

  // 根据排序方式对商品进行排序
  sortGoodsList () {
    let goodsList

    switch (this.type) {
      case 0:
        goodsList = this.goodsListRaw
        break

      case 1:
        goodsList = [...this.goodsListRaw].sort(
          () => Math.random() - Math.random()
        )
        break

      case 2:
        goodsList = [...this.goodsListRaw].sort(
          (a, b) => a.goods_price - b.goods_price
        )
        break

      case 3:
        goodsList = [...this.goodsListRaw].sort(
          (a, b) => b.goods_price - a.goods_price
        )
        break
    }

    this.setData({
      goodsList
    })
  },

  // 排序方式发生改变
  handleSortTypeChange (e) {
    this.type = e.detail
    this.setData({
      scrollTop: 0
    })
    this.sortGoodsList()
  },

  // 滚动到顶部
  scrollToTop () {
    this.setData({
      scrollTop: 0
    })
  },

  handleScroll (e) {
    const scrollTop = e.detail.scrollTop
    if (scrollTop > 1000) {
      this.setData({
        btnTopShow: true
      })
    } else if (this.data.btnTopShow) {
      this.setData({
        btnTopShow: false
      })
    }
  },

  toGoodsDetailPage (e) {
    wx.navigateTo({ url: `/pages/goods-detail/index?goods_id=${e.detail}` })
  }
})
