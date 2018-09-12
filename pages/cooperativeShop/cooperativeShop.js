// pages/cooperativeShop/cooperativeShop.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  data: {
    tabs: ["消费返利合作店铺", "小票返利合作店铺"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    ConsumptionList: [{
      id: '01',
      img: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantPersonal/shop_img_rebate@3x.png',
      name: '乐天仁川机场第一航站楼店',
      address: '仁川市机场路1号',
      iphone: '34123243123'
    },{
        id: '02',
        img: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantPersonal/shop_img_shop2@3x.png',
        name: '宝堂TAKARADO',
        address: '仁川市机场路1号',
        iphone: '34123243123'
    }],
    smallTicketList: [{
      id: '01',
      img: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantPersonal/shop_img_shop2@3x.png',
      name: '京东川机场第一航站楼店',
      address: '仁川市机场路1号',
      iphone: '15878243123'
    }, {
      id: '02',
        img: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantPersonal/shop_img_shop1@3x.png',
      name: '香川TAKARADO',
      address: '仁川市机场路1号',
      iphone: '8789243123'
    }]
  },
  consumption: function(e){
    console.log(e.currentTarget.dataset.index)
    wx.navigateTo({
      url: '../CRcoopShopDetails/CRcoopShopDetails',
    })
  },
  smallTicket: function (e) {
    console.log(e.currentTarget.dataset.index)
    wx.navigateTo({
      url: '../TRcoopShopDetails/TRcoopShopDetails',
    })
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }

  
})