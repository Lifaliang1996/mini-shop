const KEY = 'COLLECT'

/**
 * 将收藏列表储存到缓存
 */
function saveCollectListToLocal () {
  try {
    wx.setStorageSync(KEY, _collectList)
  } catch (error) {}
}

/**
 * 从缓存中读取收藏列表
 * @return {Array<object>} 收藏列表
 */
function getCollectListByLocal () {
  try {
    return wx.getStorageSync(KEY)
  } catch (error) {}
}

/**
 * 从内存中获取收藏列表
 * @return {Array<object>} 收藏列表
 */
function getCollectList () {
  return _collectList
}

/**
 * 判断是否已收藏
 * @param {number | string} goodsId
 * @return {boolean}
 */
function isCollected (goodsId) {
  return _collectList.some(g => g.goods_id == goodsId)
}

/**
 * 添加收藏
 * @param {object} goods
 */
function addCollect (goods) {
  if (!isCollected(goods.goods_id)) {
    _collectList.unshift(goods)
    saveCollectListToLocal()
  }
}

/**
 * 移除收藏
 * @param {string | number} goodsId
 */
function removeCollect (goodsID) {
  const index = _collectList.findIndex(g => g.goods_id == goodsID)
  if (index !== -1) {
    _collectList.splice(index, 1)
    saveCollectListToLocal()
  }
}

// 内部维护的缓存列表
const _collectList = getCollectListByLocal() || []

export default {
  getCollectList,
  isCollected,
  addCollect,
  removeCollect
}
