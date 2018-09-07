// pages/uploadPassport/uploadPassport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundImg:'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantPersonal/registered_img_passport@3x.png',
    atempFilePaths: ''
  },
  // 添加消费记录-点击拍照或选择相册图片
  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        that.setData({
          atempFilePaths: res.tempFilePaths[0],
        })
      }
    })
  },
  next: function () {
    wx.navigateTo({
      url: '../uploadBankcard/uploadBankcard',
    })
  }
})