
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
      title: '来购哟哟',
      imageUrl: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/qunnv.gif',
      path: '/page/start/start?id=123',
      success: function (res) {
        console.log('res',res)
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
        app.Toast(res, 'none', 3000);
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
        // console.log('GetScanCode',json);
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
          app.Toast('', 'none', 3000, json.msg.code);
          // wx.showToast({
          //   title: json.msg.msg,
          //   icon: 'none',
          //   duration: 2500
          // });
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
      const that =this;
      // console.log(res);

      wx.showToast({
        title: '已收到付款',
        duration: 3000,
        success: function () {
          // that.getScanCode();
          // 
          setTimeout(function(){
            app.Ajax(
              'User',
              'POST',
              'GetScanCode',
              {},
              function (json) {
                // console.log('GetScanCode',json);
                if (json.success) {
                  wx.sendSocketMessage({
                    data: 'getPayState:' + json.data
                  })
                  qrcode.makeCode(json.data)
                }
              }
            )
          }, 1500)
// 
        }
      });
    })

    
  },
  onHide: function () {
    wx.closeSocket(function (rea) {
      console.log(rea)
    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
    
  }
})
