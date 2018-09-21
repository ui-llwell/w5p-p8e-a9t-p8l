
// pages/navConsumerRebate/navConsumerRebate.js
var QRCode = require('../../utils/weapp-qrcode.js')
var qrcode;


//获取应用实例
const app = getApp()
Page({
  data: {
    userType:0
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
  getScanCode:function(){
    app.Ajax(
      'User',
      'POST',
      'GetScanCode',
      { },
      function (json) {
        console.log('GetScanCode',json);
        if (json.success) {
          wx.sendSocketMessage({
            data: 'getPayState:' + json.data
          })
          qrcode = new QRCode('canvas', {
            // usingIn: this,
            text: json.data,
            width: 220,
            height: 220,
            colorDark: "#000",
            colorLight: "white",
            correctLevel: QRCode.CorrectLevel.H,
          });
        }else{
          wx.showToast({
            title: json.msg.msg,
            icon: 'none',
            duration: 2500
          });
        }
      }
    )
  },
  getQRcode:function(){
    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: that.data.shopCode,
      width: 228,
      height: 228,
      colorDark: "#000",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
  onShow: function () {
    this.setData({
      userType:wx.getStorageSync('userType')
    })
    const that = this;
    wx.connectSocket({
      url: 'wss://wxapp.llwell.net/api/PG/ws'
    })
   
    wx.onSocketOpen(function (res) {
      that.getScanCode();
      
    })

    wx.onSocketMessage(function (res) {
      console.log(res);
      wx.showModal({
        content: '已收到付款',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          }
        }
      });
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
