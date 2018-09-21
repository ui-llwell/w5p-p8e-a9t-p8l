//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    text: '获取验证码', //按钮文字
    currentTime: 60, //倒计时
    disabled: false, //倒计时按钮是否禁用
    phone: '', //手机号
    seccode:'', //验证码
    
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    app.Ajax(
      // 方法组名称为：User（代购用户），不是系统通用用户Users
      'Users',
      'POST',
      'UserReg',
      { checkCode: this.data.seccode, phone: this.data.phone, agentCode:wx.getStorageSync('agentCode'),userType:wx.getStorageSync('userType'), ...app.globalData.userInfo },
      function (json) {
        // console.log('json',json);
        if (json.success) {
          wx.switchTab({
            url: '../navHome/navHome'
          })
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
  //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    console.log('app.globalData.userInfo', app.globalData.userInfo)
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //获取手机栏input中的值
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  seccodeInput:function(e){
    this.setData({
      seccode: e.detail.value
    })
  },
  phoneInputblur:function(e){
    console.log(e.detail)
    var phone = e.detail.value;
    var toastContent;
    if (e.detail.value == '') {
      wx.showToast({
        title: '号码不能为空',
        icon: 'none',
        duration: 2000,
      });
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 2000,
      });
    } 
  },
 
  // 获取验证码
  bindButtonTap:function(){
    const that =this;
    if (this.data.phone==''){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      });
    }else{
      app.Ajax(
        'Users',
        'POST',
        'CheckCode',
          { phone: this.data.phone},
        function (json) {
          console.log('json',json);
          if (json.success) {
            wx.showToast({
              title: '短信验证码已发送',
              icon: 'none',
              duration: 2000
            });
            that.countDown();
            that.setData({
              disabled: true,
            })
          }else{
            wx.showToast({
              title: json.msg.msg,
              icon: 'none',
              duration: 2500
            });
          }
        }
      )
    }
    
  },
  countDown:function(){
    const that = this;
    var currentTime = this.data.currentTime;
    var timer = setInterval(function () {
      if (currentTime > 0){
        
          currentTime--;
          that.setData({
            text: currentTime + 's',
          })
        
      }else{
        clearTimeout(timer);
        that.setData({
          text: '重新发送',
          currentTime: 60,
          disabled: false,
        })
      }
    }, 1000)
  }
})
