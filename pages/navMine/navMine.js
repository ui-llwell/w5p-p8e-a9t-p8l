var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
Page({
  data: {
    getData:{},
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //num:2,
    // money:'1.00',
    // handle: '3',
    // putForward: '2',
    // complete:'1',
    // myphone: '12578915610',
    disabled: false,
  },
  
//获取头像信息等
  onLoad: function () {
    
  },
  iphone: function(){
    wx.navigateTo({
      url: '../modifyPhone/modifyPhone',
    })
  },
  card: function () {
    wx.navigateTo({
      url: '../modifyBankcard/modifyBankcard',
    })
  },
  //弹窗
  setModalStatus: function (e) {
    // console.log("设置显示状态，1显示0不显示", e.currentTarget.dataset.status);
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export()
    })
    if (e.currentTarget.dataset.status == 1) {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (e.currentTarget.dataset.status == 0) {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
  },
  onReady: function () {
    var a = this.data.money
    if (a == '0.00') {
      console.log(a)
      this.setData({
        disabled: true,
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMainInfo();
  },
  getMainInfo:function(){
    const that = this;
    app.Ajax(
      'User',
      'POST',
      'GetMainInfo',
      {  },
      function (json) {
        // console.log('ajson',json);
        if (json.success) {
          that.setData({
            getData: json.data
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
});


