//app.js

import locales from './utils/locales'
import T from './utils/i18n'
import event from './utils/event'
T.registerLocale(locales)
T.setLocaleByIndex(wx.getStorageSync('langIndex') || 0);
wx.T = T

App({
  onLaunch: function (options) {
    wx.clearStorageSync('agentCode')
    wx.clearStorageSync('userType')
    wx.clearStorageSync('token')


    // 展示本地存储能力
    
    var isDebug = false;//true调试状态使用本地服务器，非调试状态使用远程服务器
    if (!isDebug) {
      //远程域名
      wx.setStorageSync('domainName', "https://wxapp.llwell.net/api/PG/")
    }
    else {
      //本地测试域名
      wx.setStorageSync('domainName', "http://192.168.0.11:55734/api/PG/")
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.Ajax(
          'Open',
          'POST',
          'UserLogin',
          { code: res.code },
          function (json) {
            // console.log('~~~',json);
            if (json.success) {
              wx.setStorageSync('token', json.data.token);
              // console.log(json.data.token);
              

              if (json.data.isReg) {
                wx.setStorageSync('userType', json.data.userType)


                wx.switchTab({
                  url: '../navHome/navHome',
                })
              } else {
                if (options.query.regAgentCode !== undefined) {
                  wx.setStorageSync('userType', '1')
                  wx.setStorageSync('agentCode', options.query.regAgentCode)
                }else{
                  wx.setStorageSync('userType', 0)
                  if (options.query.agentCode === undefined) {
                    wx.setStorageSync('agentCode', '999999')
                  } else {
                    wx.setStorageSync('agentCode', options.query.agentCode)
                  }
                }
              }
              event.emit('UserLogin')
            }else{
              wx.showToast({
                title: json.msg.msg,
                icon: 'none',
                duration: 2500
              })
            }
          }
        )
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },

  Ajax: function (url, type, method, data, callback) {
    // wx.showLoading({
    //   title: 'loading',
    //   duration:1000,
    // });
    
    var send = {
      token: wx.getStorageSync('token'),
      method: method,
      param: data,
    };
    wx.request({
      url: wx.getStorageSync('domainName') + url,
      data: send,
      method: type, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json' // 默认值
      }, // 设置请求的 header
      success: function (res) {
        // 发送请求成功执行的函数
        if (typeof callback === 'function') {
          callback(res.data);
        }
      },
      fail: function (res) {
      },
      complete: function () {
        // wx.hideLoading();
      }
    })
  }
})