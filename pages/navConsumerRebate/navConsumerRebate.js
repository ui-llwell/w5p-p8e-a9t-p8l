
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
    });
    
  },
  onShow: function () {
    wx.connectSocket({
      url: 'ws://localhost:54286/api/PG/ws'
    })

    wx.onSocketOpen(function (res) {
      wx.sendSocketMessage({
        data: 'getPayState:' + '1BD20D8049BF0C9F6A24AB2716FE2873'
      })
    })

    wx.onSocketMessage(function (res) {
      console.log(res);
    })

    
  },
  onHide: function () {
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
    wx.closeSocket(function (rea) {
      console.log(rea)
    })
  }
})
