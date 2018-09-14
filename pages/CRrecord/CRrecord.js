var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["处理中", "可提现", "已提现"],
    activeIndex: '1',
    sliderOffset: 0,
    sliderLeft: 0,
    List:[{
      id:'01',
      time:'2018-08-10  9：00',
      putForward: '未申请提现',
      money:'消费金额：10000.00',
      retrurn:'返点率：3%',
      rebate: '可返利：₩ 30.00',
      address:'提现地址：仁川市XXX路3路仁川市XXX路3路仁川市XXX路3路仁川市XXX路3路',
      earliestTime:'最早提现时间：2018/7/15 13:00'
    },{
        id: '02',
        time: '2018-08-10  9：00',
        putForward: '已申请现场提现',
        money: '',
        retrurn: '',
        rebate: '可返利：₩ 30.00',
        address: '提现地址：仁川市XXX路3路仁川市XXX路3路仁川市XXX路3路仁川市XXX路3路',
        earliestTime: '最早提现时间：2018/7/15 13:00'
      }, {
        id: '03',
        time: '2018-08-10  9：00',
        putForward: '未申请提现',
        money: '',
        retrurn: '返点率：3%',
        rebate: '',
        address: '提现地址：仁川市XXX路3路仁川市XXX路3路仁川市XXX路3路仁川市XXX路3路',
        earliestTime: '最早提现时间：2018/7/15 13:00'
      },]
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      activeIndex: options.num
      
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  demo: function(){
   this.setData({
     activeIndex: 2
   })
  }
});