import request from '../../utils/request'

Page({
  data: {
    goodsList: [],
    scrollTop: 0,
    isRefreshing: false
  },

  // 请求参数
  requestData: {
    query: '',
    // cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 后台总条数
  total: 0,
  // 商品列表的源数据
  goodsListRaw: [],
  // 当前排序方式
  type: 0,

  onLoad (option) {
    if (option.cid) {
      this.requestData.cid = option.cid
    }
    if (option.query) {
      this.requestData.query = option.query
    }
    this.getGoodsList()
  },

  async getGoodsList () {
    try {
      const data = await request({
        url: '/goods/search',
        data: this.requestData
      })
      this.requestData.pagenum += 1
      this.total = data.total
      this.goodsListRaw.push(...data.goods)

      this.setData({
        goodsList: this.data.goodsList.concat(data.goods)
      })
    } catch (error) {}

    this.setData({
      isRefreshing: false
    })
  },

  // 加载更多
  getMoreGoodsList () {
    const { pagenum, pagesize } = this.requestData

    if (this.total <= pagenum * pagesize) {
      wx.showToast({
        title: 'o(╥﹏╥)o 没有更多了',
        icon: 'none'
      })
      return
    }

    this.getGoodsList()
  },

  // 下拉刷新
  refreshGoodsList () {
    this.setData({
      isRefreshing: true
    })
    this.requestData.pagenum = 1
    this.goodsListRaw.length = 0
    this.setData({
      goodsList: []
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
  handleChange (e) {
    this.type = e.detail
    this.sortGoodsList()
    this.setData({
      scrollTop: 0
    })
  }
})
