// pages/uploadBankcard/uploadBankcard.js
//获取应用实例
const app = getApp()
Page({

  data: {
    //图片地址
    
      imgList: [
        {
          image: "http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantPersonal/banner1.png",
          text1: '职业代购白皮书',
          text2: '首尔免税店扫货指南1',
          text3: '职业代购手把手教你淘遍首尔1>'
        },
        {
          image: "http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantPersonal/banner2.png",
          text1: '职业代购白皮书',
          text2: '首尔免税店扫货指南2',
          text3: '职业代购手把手教你淘遍首尔2>'
        },
      ],
      consumptionList: [{
        shopId: '01',
        shopListImg: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantPersonal/shop_img_rebate@3x.png',
        shopName: '乐天仁川机场第一航站楼店',
        shopAddr: '仁川市机场路1号',
        shopPhone: '34123243123'
        }, {
          shopId: '02',
          shopListImg: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantPersonal/shop_img_shop2@3x.png',
          shopName: '宝堂TAKARADO',
          shopAddr: '仁川市机场路1号',
          shopPhone: '34123243123'
        }
      ],
      
    
    
    
    
    autoplay: true,//是否自动切换  
    indicatorDots: true,//是否显示圆点  
    interval: 5000,//自动切换间隔  
    duration: 500, //滑动动画时长  
    //indicatorColor: "rgba(255,255,255,0.24)",//滑动圆点颜色  
    //indicatorActiveColor: "white", //当前圆点颜色 
    indicatorColor: "blue",//滑动圆点颜色  
    indicatorActiveColor: "white", //当前圆点颜色
    current: 0, //当前所在页面的 index  
    circular: true,  //是否采用衔接滑动  
    imgheights: [],
    //图片宽度 
    imgwidth: 750,
    //默认  
    current: 0
  },
  onLoad: function () {
    this.getShopShow();
  },
  getShopShow:function(){
    const that = this;
    // 方法组名称为：User（代购用户），不是系统通用用户Users
    app.Ajax(
      'User',
      'POST',
      'GetShopShow',
      { },
      function (json) {
        console.log('json', json)
        if (json.success) {
          that.setData({
              consumptionList: json.data
          })
        }else{

        }
      }
    )
  },
  bindchange: function (e) {
    // console.log(e.detail.current)
    this.setData({ current: e.detail.current })
  },
  consumption: function (e) {
    console.log(e.currentTarget.dataset.shopid)
    wx.navigateTo({
      url: '../CRcoopShopDetails/CRcoopShopDetails?shopId=' +e.currentTarget.dataset.shopid,
    })
  },
  imageLoad: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    // console.log(imgwidth, imgheight)
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
})