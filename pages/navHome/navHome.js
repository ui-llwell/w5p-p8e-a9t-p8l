// pages/uploadBankcard/uploadBankcard.js
Page({

  data: {
    //图片地址
    //imgList: ['/images/wyh-img_bg.png', '/images/wyh-img8.png', '/images/wyh-img_shop1.png', '/images/wyh-img_bg1.png'],
    imgList: [
      { image: "http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantPersonal/top_img_receipt@3x.png",
        text1: '职业代购白皮书',
        text2: '首尔免税店扫货指南1',
        text3: '职业代购手把手教你淘遍首尔1>'
       },
      { image: "http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantPersonal/top_img_consumption@3x.png",
        text1: '职业代购白皮书',
        text2: '首尔免税店扫货指南2',
        text3: '职业代购手把手教你淘遍首尔2>'
      },
      { image: "http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/PurchasingAssistantPersonal/top_img_receipt@3x.png",
        text1: '职业代购白皮书',
        text2: '首尔免税店扫货指南3',
        text3: '职业代购手把手教你淘遍首尔3>'
      },
    ],
    List: [{
      id: '01',
      text1: '乐天',
      text2: '乐天 25% 蚕室 27% Coex 27%',
      text3: '爱宝客',
      text4: '26%'
    },{
        id: '03',
        text1: '新罗',
        text2: '26%',
        text3: '格乐丽雅',
        text4: '20%'
      }, {
        id: '04',
        text1: '都塔',
        text2: '27%',
        text3: '东和',
        text4: '东和 27% '
      }, {
        id: '04',
        text1: '新世界',
        text2: '27%',
        text3: '东和',
        text4: '乐天 17.5% 新罗 17.5%  '
      }],
    // //是否采用衔接滑动  
    // circular: true,
    // //是否显示画板指示点  
    // indicatorDots: false,
    // //选中点的颜色  
    // indicatorcolor: "#000",
    // //是否竖直  
    // vertical: false,
    // //是否自动切换  
    // autoplay: true,
    // //自动切换的间隔
    // interval: 2500,
    // //滑动动画时长毫秒  
    // duration: 100,
    //所有图片的高度  
    autoplay: true,//是否自动切换  
    indicatorDots: true,//是否显示圆点  
    interval: 5000,//自动切换间隔  
    duration: 500, //滑动动画时长  
    indicatorColor: "rgba(255,255,255,0.24)",//滑动圆点颜色  
    indicatorActiveColor: "white", //当前圆点颜色  
    current: 0, //当前所在页面的 index  
    circular: true,  //是否采用衔接滑动  
    imgheights: [],
    //图片宽度 
    imgwidth: 750,
    //默认  
    current: 0
  },
  
  imageLoad: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    console.log(imgwidth, imgheight)
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
  bindchange: function (e) {
    // console.log(e.detail.current)
    this.setData({ current: e.detail.current })
  },
  consumption: function () {
    console.log(111)
    wx.switchTab({
      url: '../navConsumerRebate/navConsumerRebate',
    })
  },
  SmallTicket: function () {
    console.log(222)
    wx.switchTab({
      url: '../navTicketRebate/navTicketRebate',
    })
  },

})