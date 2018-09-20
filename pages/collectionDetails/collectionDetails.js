const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow:'',
    All: {
      detailsList: [{
        id:'001',
        tiem:'2018/08/10 9:00',
        money:'1000.00',
        returnPoint:'15%',
        receivables:'150.00'
      }, {
          id: '002',
          tiem: '2018/09/10 9:00',
          money: '2000.00',
          returnPoint: '25%',
          receivables: '450.00'
        }, {
          id: '003',
          tiem: '2018/10/10 9:00',
          money: '3000.00',
          returnPoint: '35%',
          receivables: '350.00'
        }, {
          id: '003',
          tiem: '2018/10/10 9:00',
          money: '3000.00',
          returnPoint: '35%',
          receivables: '350.00'
        }],
      total: {
        strip: '3',
        money: '3000.00',
        receivables: '8000.00',
        time:'2018/09/10 9:00'
      }
    }
  },

  //添加消费记录扫描二维码 成功或失败
  toSweepOrder: function () {
    wx.scanCode({
      success: (res) => {
        var that = this;
        app.Ajax(
          'Shop',
          'POST',
          'ScanCode',
          // { code: '123456' },
          { code: res.result },
          function (json) {
            // console.log('json',json);
            if (json.success) {
              that.setData({
                scanningConsume: wx.T.getLanguage().record.scanImgUrlConsumerSuccess,
                userId: json.data.userId
              })
            } else {
              if (wx.getStorageSync('langIndex') == 1) {
                wx.showToast({
                  title: '스캔 실패 하였습니다',
                  icon: 'loading',
                  duration: 1500
                })
              } else {
                wx.showToast({
                  title: '扫描失败',
                  icon: 'loading',
                  duration: 1500
                })
              }

            }

          }
        );
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      isshow: options.collection
      
    })
    if (this.data.isshow == 1) {
      wx.setNavigationBarTitle({
        title: '已收款业务详情'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '待收款业务详情'
      })
    }
    //console.log(isshow)
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