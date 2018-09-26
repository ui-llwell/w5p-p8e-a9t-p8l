// pages/CRcoopShopDetails/CRcoopShopDetails.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    All: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
    this.getShopInfo(options.shopId)
  },
  getShopInfo: function (shopId){
    const that = this;
    app.Ajax(
      'User',
      'POST',
      'GetShopInfo',
      { shopId: shopId },
      function (json) {
        // console.log('shopIdjson',json);
        if (json.success) {
          that.setData({
            All: json.data
          })
          wx.setNavigationBarTitle({
            title:json.data.shopName
          })
        }else{
          app.Toast('', 'none', 3000, json.msg.code);
          // wx.showToast({
          //   title: json.msg.msg,
          //   icon: 'none',
          //   duration: 2500
          // });
        }
      }
    )
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})