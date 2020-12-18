// components/goods-sort/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    // 当前排序类型：0-综合 1-销量 2-价格升 3-价格降
    type: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeType (e) {
      let newType = e.currentTarget.dataset.type
      const oldType = this.data.type

      // 如果初次切换到 “价格” 选项，则是升，否则降
      if (newType >= 2) {
        newType = oldType === 2 ? 3 : 2
      }

      if (newType !== oldType) {
        this.triggerEvent('change', newType)
        this.setData({
          type: newType
        })
      }
    }
  }
})
