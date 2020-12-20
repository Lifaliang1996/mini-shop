import Cart from '../../store/cart'
import { showModal } from '../../utils/wx-promise'

const app = getApp()

Page({
  data: {
    slideButtons: [
      {
        type: 'warn',
        text: '删除'
      }
    ],
    checkedAll: false,
    totalNum: 0,
    totalPrice: 0
  },

  onShow () {
    this.updateData()
  },

  // 更新 checkedAll、totalPrice、totalNum 属性
  updateData () {
    const { cart } = app.store.getState()
    let totalNum = 0
    let totalPrice = 0

    cart.forEach(goods => {
      if (goods.checked) {
        totalNum += goods.num
        totalPrice += goods.price * goods.num
      }
    })

    const checkedAll = cart.length ? cart.every(goods => goods.checked) : false

    this.setData({
      totalNum,
      totalPrice,
      checkedAll
    })
  },

  changeGoodsNum (e) {
    const newNum = e.detail
    const goodsId = e.currentTarget.dataset.id
    Cart.changeNum(goodsId, newNum)
    this.updateData()
  },

  changeGoodsChecked (e) {
    const goodsId = e.currentTarget.dataset.id
    Cart.changeChecked(goodsId)
    this.updateData()
  },

  // 全选与反选
  changeCheckedAll () {
    const current = this.data.checkedAll
    Cart.changeCheckedAll(!current)
    this.updateData()
  },

  // 滑动单元格选择删除
  async slideButtonTap (e) {
    try {
      await showModal({ content: '是否移除此商品' })
      const goodsId = e.currentTarget.dataset.id
      Cart.removeGoods(goodsId)
      this.updateData()
    } catch (error) {}
  }
})
