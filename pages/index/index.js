
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
    // this.setLanguage();
    if (wx.getStorageSync('userType') ===undefined){
      event.on('UserLogin', this, this.setLanguage);
    }else{
      this.setLanguage();
    }
    
    // ...
  },
  setLanguage() {
    console.log('lsdsds', wx.getStorageSync('userType'))
    const subString = wx.getStorageSync('agentCode').substring(0, 1)
    if (wx.getStorageSync('userType')=="1"){
      if (subString== 'S'){
        this.setData({
          index: wx.T.getLanguage().indexShop
        });
      }else{
        this.setData({
          index: wx.T.getLanguage().indexPurchase
        },()=>{
          // console.log('daigou daili wenzi',wx.T.getLanguage().indexPurchase)
          // console.log('luan',this.data.index)
        });
      }
    }else{
      this.setData({
        index: wx.T.getLanguage().index
      });
    }
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
    wx.navigateTo({
      url: '../registerPhone/registerPhone',
    })
  }
})
