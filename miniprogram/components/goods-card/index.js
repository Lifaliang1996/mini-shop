// components/goods-card/index.js
Component({
  options: {
    multipleSlots: true,
    styleIsolation: 'apply-shared'
  },

  properties: {
    goods: {
      type: Object,
      value: {}
    },
    border: {
      type: Boolean,
      value: false
    },
    round: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    emitNavigate () {
      this.triggerEvent('navigate', this.properties.goods.goods_id)
    }
  }
})
