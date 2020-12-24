const CART_KEY = 'CART'

/**
 * 将购物车数据储存到缓存
 */
function saveCartToLocal () {
  try {
    wx.setStorageSync(CART_KEY, cart)
  } catch (error) {}
}

/**
 * 从缓存中读取购物车数据
 * @return {Array<object>} cart 购物车数据
 */
function getCartByLocal () {
  try {
    return wx.getStorageSync(CART_KEY)
  } catch (error) {}
}

/**
 * 获取购物车商品列表
 * @return {Array<object>} goodsList 购物车商品列表
 */
function getCart () {
  return cart
}

/**
 * 添加商品到购物车
 * @param {object} goods 添加的商品
 */
function addGoods (goods) {
  const oldGoods = cart.find(g => g.goods_id === goods.goods_id)

  if (oldGoods) {
    // 购物车中已有，增加数量
    oldGoods.num += 1
  } else {
    // 购物车中没有，新加入
    goods.num = 1
    goods.checked = true
    cart.push(goods)
  }

  saveCartToLocal(cart)

  wx.showToast({
    title: '加入成功',
    icon: 'success',
    mask: true
  })
}

/**
 * 将商品从购物车移除
 * @param {number | string} goodsId
 */
function removeGoods (goodsId) {
  const index = cart.findIndex(g => g.goods_id === goodsId)
  if (index !== -1) {
    cart.splice(index, 1)
    saveCartToLocal()
  }
}

/**
 * 更改单个商品的数量
 * @param {number | string} goodsId
 * @param {number} newNum
 */
function changeNum (goodsId, newNum) {
  const oldGoods = cart.find(g => g.goods_id === goodsId)
  if (oldGoods) {
    oldGoods.num = newNum
    saveCartToLocal()
  }
}

/**
 * 更改单个商品的选中状态
 * @param {number | string} goodsId
 */
function changeChecked (goodsId) {
  const oldGoods = cart.find(g => g.goods_id === goodsId)
  if (oldGoods) {
    oldGoods.checked = !oldGoods.checked
    saveCartToLocal()
  }
}

/**
 * 更改所有商品的选中状态
 * @param {boolean} value
 */
function changeCheckedAll (value) {
  cart.forEach(goods => (goods.checked = !!value))
  saveCartToLocal()
}

// 内部维护的购物车数据
const cart = getCartByLocal() || []

export default {
  getCart,
  addGoods,
  changeNum,
  removeGoods,
  changeChecked,
  changeCheckedAll
}
