import wxp from '../../utils/wxp'

const KEY = 'USER_ADDR'

/**
 * 将收货地址储存到缓存
 */
function saveAddressToLocal () {
  try {
    wx.setStorageSync(KEY, _addressList)
  } catch (error) {}
}

/**
 * 从缓存中读取收货地址
 * @return {Array<object>} 收货地址列表
 */
function getAddressByLocal () {
  try {
    return wx.getStorageSync(KEY) || []
  } catch (error) {}
}

/**
 * @return 地址列表
 */
function getAddressList () {
  return _addressList
}

/**
 * 添加地址
 * @param {object} address 地址
 * @param {boolean} isDefault 是否是默认地址
 */
function addAddress (address, isDefault = false) {
  const { provinceName, cityName, detailInfo } = address
  address.fullAddr = provinceName + cityName + detailInfo
  address.id = Date.now()
  if (isDefault) {
    _addressList.unshift(address)
  } else {
    _addressList.push(address)
  }
  saveAddressToLocal()
}

/**
 * 将该地址设为默认
 * @param {string | number} addressId
 */
function setDefault (addressId) {
  const index = _addressList.findIndex(addr => addr.id === addressId)
  _addressList = [
    _addressList[index],
    ..._addressList.slice(0, index),
    ..._addressList.slice(index + 1)
  ]
  saveAddressToLocal()
}

/**
 * 删除该地址
 * @param {string | number} addressId
 */
function removeAddress (addressId) {
  const index = _addressList.findIndex(addr => (addr.id = addressId))
  if (index !== -1) {
    _addressList.splice(index, 1)
    saveAddressToLocal()
  }
}

// 内部维护的地址列表
let _addressList = getAddressByLocal() || []

export default {
  getAddressList,
  addAddress,
  setDefault,
  removeAddress
}
