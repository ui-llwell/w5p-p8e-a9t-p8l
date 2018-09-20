
// /pages/index/index.js
import T from '../../utils/i18n'
var util = require('../../utils/util.js')
import event from '../../utils/event'
//获取应用实例
const app = getApp()

Page({
  data: {
    language: '',
    index: {},
    languages: ['zh', 'ko'],
    langIndex: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    this.setData({
      langIndex: wx.getStorageSync('langIndex') || 0
    });
    this.setLanguage();
    // ...
  },
  setLanguage() {
    this.setData({
      index: wx.T.getLanguage().index
    });
  },
  
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindGetUserInfo: function (e) {
    var that = this;
    //此处授权得到userInfo
    // console.log(e.detail.userInfo);
    //接下来写业务代码
    // wx.showToast({
    //   title: '请扫描正确的流连合作店铺码进行注册，如果有问题，请联系流连客服。',
    //   icon: 'none',
    //   duration: 2500
    // })
    // app.Ajax(
    //   'Users',
    //   'POST',
    //   'BindShop',
    //   { shopCode: this.data.shop, ...e.detail.userInfo },
    //   function (json) {
    //     // console.log(json);
    //     if (json.success) {

    //     }else{

    //     }
    //   }
    // )
    //最后，记得返回刚才的页面
    wx.navigateTo({
      url: '../registerPhone/registerPhone',
    })

  }
})
