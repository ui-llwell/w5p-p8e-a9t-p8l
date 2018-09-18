// pages/modifyPassport/modifyPassport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    bank:'',
    bankBranch:'',
    num:'',
    disabled: true, 
  },
  userNameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bankInput: function (e) {
    this.setData({
      bank: e.detail.value
    })
  },
  bankBranchInput: function (e) {
    this.setData({
      bankBranch: e.detail.value
    })
  },
  numberInput: function (e) {
    this.setData({
      num: e.detail.value
    })
  },


  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  
  demo: function () {
    // var that = this;
    // var name = that.data.name;
    // var bank = that.data.bank;
    // var bankBranch = that.data.bankBranch;
    // var num = that.data.num;


    // var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
    // if (name == '') {
    //   wx.showToast({
    //     title: '请填写真实姓名',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   this.setData({
    //     disabled: true,
    //   })
    // } else if (bank == '') {
    //   wx.showToast({
    //     title: '请填写银行',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   this.setData({
    //     disabled: true,
    //   })
    // } else if (bankBranch == '') {
    //   wx.showToast({
    //     title: '请填写银行支行',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   this.setData({
    //     disabled: true,
    //   })
    // } else if (num == '') {
    //   wx.showToast({
    //     title: '请填写银行卡号',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   this.setData({
    //     disabled: true,
    //   })
    // }
    // else {
    //   this.setData({
    //     disabled: false,
    //   })
    // }
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var name = this.data.name
    // if (name == '') {
    //   console.log(name)
    //   this.setData({
    //     disabled: true,
    //   })
    // }else {
    //   console.log(name)
    //   this.setData({
    //     disabled: false,
    //   })
    // }
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
    // var that = this;
    // var name = that.data.name;
    // var bank = that.data.bank;
    // var bankBranch = that.data.bankBranch;
    // var num = that.data.num;


    // if (name == '') {
    //   this.setData({
    //     disabled: true,

    //   })
    // } else {
    //   this.setData({
    //     disabled: false,
    //   })
    // }
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