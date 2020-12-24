const KEY = 'FOOTMARK'

/**
 * 将足迹储存到缓存
 */
function saveFootmarkToLocal () {
  try {
    wx.setStorageSync(KEY, _footmark)
  } catch (error) {}
}

/**
 * 从缓存中读取足迹
 * @return {Array<object>} 足迹列表
 */
function getFootmarkByLocal () {
  try {
    return wx.getStorageSync(KEY)
  } catch (error) {}
}

/**
 * 从内存中获取足迹列表
 * @return {Array<object>} 足迹列表
 */
function getFootmark () {
  return _footmark
}

/**
 * 添加足迹
 * @param {object} goods
 */
function addFootmark (goods) {
  const old = _footmark.find(g => g.goods_id === goods.goods_id)
  if (old) {
    old.time = Date.now()
  } else {
    goods.time = Date.now()
    _footmark.unshift(goods)
  }
  saveFootmarkToLocal()
}

/**
 * 移除足迹
 * @param {string | number} goodsId
 */
function removeFootmark (goodsID) {
  const index = _footmark.findIndex(g => g.goods_id == goodsID)
  if (index !== -1) {
    _footmark.splice(index, 1)
    saveFootmarkToLocal()
  }
}

// 内部维护的缓存列表
const _footmark = getFootmarkByLocal() || []

export default {
  getFootmark,
  addFootmark,
  removeFootmark
}
