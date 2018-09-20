// pages/receivablesBusiness/receivablesBusiness.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    tabs: ["待收款", "已收款"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    All: {
      receivables_list:[
        {
        id:'001',
        address:'韩国东大门1号店',
        common:'778',
        consumption:'1000000000.00',
        returnPoint:'15%',
        receivables:'45681.00',
        time: '2018/9/19 10:30'
        },{
          id: '002',
          address: '韩国东大门2号店',
          common: '278',
          consumption: '2000000000.00',
          returnPoint: '25%',
          receivables: '845681.00',
          time: '2018/9/19 10:30'
        },{
          id: '003',
          address: '韩国东大门3号店',
          common: '378',
          consumption: '1000000000.00',
          returnPoint: '55%',
          receivables: '7681.00',
          time: '2018/9/19 10:30'
        }],
        total: {
          strip:'3',
          money:'3000.00',
          receivables:'8000.00'
        }
    }

  },
  search:function(e){
      console.log('e',e.detail.value)

  },
  next: function(){
    var num = this.data.activeIndex
    wx.navigateTo({
      url: '../collectionDetails/collectionDetails?collection=' + num,
    })
    console.log(num)
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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