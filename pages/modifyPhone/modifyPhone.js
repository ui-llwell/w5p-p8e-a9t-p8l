// pages/modifyPhone/modifyPhone.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '获取验证码', //按钮文字
    currentTime: 60, //倒计时
    disabled: false, //倒计时按钮是否禁用
    phone: '', //手机号
    seccode: '', //验证码

  },
  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    app.Ajax(
      // 方法组名称为：User（代购用户），不是系统通用用户Users
      'Users',
      'POST',
      'UpdateUserPhone',
      { checkCode: this.data.seccode, phone: this.data.phone },
      function (json) {
        // console.log('json',json);
        if (json.success) {
          wx.switchTab({
            url: '../navMine/navMine'
          })
        } else {
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
  //获取手机栏input中的值
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  seccodeInput: function (e) {
    this.setData({
      seccode: e.detail.value
    })
  },
  phoneInputblur: function (e) {
    // console.log(e.detail)
    var phone = e.detail.value;
    var toastContent;
    if (e.detail.value == '') {
      app.Toast('号码不能为空', 'none', 2000);
      // wx.showToast({
      //   title: '号码不能为空',
      //   icon: 'none',
      //   duration: 2000,
      // });
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      app.Toast('手机号格式不正确', 'none', 2000);
      // wx.showToast({
      //   title: '手机号格式不正确',
      //   icon: 'none',
      //   duration: 2000,
      // });
    }
  },

  // 获取验证码
  bindButtonTap: function () {
    const that = this;
    if (this.data.phone == '') {
      app.Toast('请输入手机号', 'none', 2000);
      // wx.showToast({
      //   title: '请输入手机号',
      //   icon: 'none',
      //   duration: 2000
      // });
    } else {
      that.countDown();
      that.setData({
        disabled: true,
      })
      app.Ajax(
        'Users',
        'POST',
        'CheckCode',
        { phone: this.data.phone },
        function (json) {
          // console.log('json', json);
          if (json.success) {
            app.Toast('短信验证码已发送', 'none', 2000);
            // wx.showToast({
            //   title: '短信验证码已发送',
            //   icon: 'none',
            //   duration: 2000
            // });
            
          } else {
            app.Toast('', 'none', 3000, json.msg.code);
            // wx.showToast({
            //   title: json.msg.msg,
            //   icon: 'none',
            //   duration: 2500
            // });
          }
        }
      )
    }

  },
  countDown: function () {
    const that = this;
    var currentTime = this.data.currentTime;
    var timer = setInterval(function () {
      if (currentTime > 0) {

        currentTime--;
        that.setData({
          text: currentTime + 's',
        })

      } else {
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