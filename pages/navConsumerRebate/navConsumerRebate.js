
// pages/navConsumerRebate/navConsumerRebate.js
var QRCode = require('../../utils/weapp-qrcode.js')
var qrcode;


//获取应用实例
const app = getApp()
Page({
  data: {
    
  },
  //事件处理函数
  onShareAppMessage: function () {
    return {
      title: 'XXXXXXXXXX',
      imageUrl: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantPersonal/shop_icon_phone@3x.png',
      path: '/page/user?id=123',
      success: function (res) {
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
})
