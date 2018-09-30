
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
  onShow:function(){
    this.setData({
      langIndex: wx.getStorageSync('langIndex') || 0
    });
    // this.setLanguage();
    // console.log('uner')
    // console.log(wx.getStorageSync('userType'))
    if (wx.getStorageSync('userType') === '') {
      // console.log(1111)
      event.on('UserLogin', this, this.setLanguage);
    } else {
      // console.log(12222)
      this.setLanguage();
    }
  },
  
  setLanguage() {
    // console.log('这里是index userType')
    // console.log(wx.getStorageSync('userType'))
    const subString = wx.getStorageSync('agentCode').substring(0, 1)
    if (wx.getStorageSync('userType')=="1"){
      if (subString== 'S'){
        wx.setNavigationBarTitle({
          title: wx.T.getLanguage().indexShop.navigationBarTitle
        });
        this.setData({
          index: wx.T.getLanguage().indexShop
        });
      }else{
        wx.setNavigationBarTitle({
          title: wx.T.getLanguage().indexPurchase.navigationBarTitle
        });
        this.setData({
          index: wx.T.getLanguage().indexPurchase
        },()=>{
          // console.log('daigou daili wenzi',wx.T.getLanguage().indexPurchase)
          // console.log('luan',this.data.index)
        });
      }
    }else{
      wx.setNavigationBarTitle({
        title: wx.T.getLanguage().index.navigationBarTitle
      });
      this.setData({
        index: wx.T.getLanguage().index
      });
    }
  },
  
  // getUserInfo: function(e) {
  //   // console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  bindGetUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    wx.setStorageSync('gender', e.detail.userInfo.gender )
    // console.log('asdasd', e.detail.userInfo)
    wx.navigateTo({
      url: '../registerPhone/registerPhone',
    })
  }
})
