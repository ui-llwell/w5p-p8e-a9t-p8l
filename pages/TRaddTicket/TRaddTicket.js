// pages/uploadBankcard/uploadBankcard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    atempFilePaths: '',
    lists: [{
      name1:'',
      name2: ''
    }, {
      name1: '',
      name2: ''
    }],
    
  },
  addList: function () {
    var lists = this.data.lists;
    var newData = {n1:1,n2:2};
    lists.push(newData);//实质是添加lists数组内容，使for循环多一次
    this.setData({
      lists: lists,
    })
    console.log('add',lists)
  },
  delList: function (e) {
    let lists = this.data.lists;
    //lists.pop();      //实质是删除lists数组内容，使for循环少一次
    let num = e.currentTarget.dataset.index
    console.log(num)
    console.log(lists)
    console.log(lists[num])
    lists.splice(num,1)
    console.log('~~~',lists)
    this.setData({
      lists: lists,
    })
  },
  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        that.setData({
          atempFilePaths: res.tempFilePaths[0],
        })
      }
    })
  },
  next: function () {
    wx.navigateTo({
      url: '../registerComplete/registerComplete',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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