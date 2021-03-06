const KEY = 'USER_ADDR'

/*
{
  id: "1608558131453",
  userName: "张三"
  telNumber: "020-81167888",
  provinceName: "广东省",
  cityName: "广州市",
  countyName: "海珠区",
  detailInfo: "新港中路397号",
  nationalCode: "510000",
  postalCode: "510000",
  fullAddr: "广东省广州市新港中路397号",
}
*/

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
 * 获取地址列表
 * @return 地址列表
 */
function getAddressList () {
  return _addressList
}

/**
 * 获取此地址在列表中的索引
 * @param {string | number} addressId
 * @return 索引
 */
function findIndexById (addressId) {
  return _addressList.findIndex(addr => addr.id === addressId)
}

/**
 * 获取单个地址
 * @param {string | number} addressId
 * @return 单个地址
 */
function getAddress (addressId) {
  return _addressList.find(addr => addr.id === addressId)
}

/**
 * 添加地址
 * @param {object} address 地址
 * @param {boolean} isDefault 是否是默认地址
 */
function addAddress (address, isDefault = false) {
  const { provinceName, cityName, detailInfo } = address
  address.fullAddr = provinceName + cityName + detailInfo
  address.id = String(Date.now())
  if (isDefault) {
    _addressList.unshift(address)
  } else {
    _addressList.push(address)
  }
  saveAddressToLocal()
}

/**
 * 修改
 * @param {object} address 地址
 * @param {boolean} isDefault 是否是默认地址
 */
function updateAddress (address, isDefault = false) {
  const { id, provinceName, cityName, detailInfo } = address
  address.fullAddr = provinceName + cityName + detailInfo
  if (isDefault) {
    setDefault(id)
  } else {
    const index = findIndexById(id)
    _addressList[index] = address
    saveAddressToLocal()
  }
}

/**
 * 将该地址设为默认
 * @param {string | number} addressId
 */
function setDefault (addressId) {
  const index = findIndexById(addressId)
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
  const index = findIndexById(addressId)
  if (index !== -1) {
    _addressList.splice(index, 1)
    saveAddressToLocal()
  }
}

// 内部维护的地址列表
let _addressList = getAddressByLocal() || []

export default {
  getAddressList,
  getAddress,
  addAddress,
  updateAddress,
  setDefault,
  removeAddress
}
