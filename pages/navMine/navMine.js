var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
//获取头像信息等
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  iphone: function(){
    wx.navigateTo({
      url: '../modifyPhone/modifyPhone',
    })
  },
  passport: function(){
    wx.navigateTo({
      url: '../modifyPassport/modifyPassport',
    })
  },
  card: function () {
    wx.navigateTo({
      url: '../modifyBankcard/modifyBankcard',
    })
  }
});


