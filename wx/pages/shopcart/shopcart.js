const app = getApp();
Component({
  data: {
    address: '获取当前位置',
    fare: 5,
    shopCart: [],
  },
  attached(){
    //获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点
    // let custom = wx.getMenuButtonBoundingClientRect();
    // let style = 0;
    // //获取系统信息
    // wx:wx.getSystemInfo({
    //   success: function(res) {
    //     style = custom.bottom + custom.top - res.statusBarHeight
    //   },
    // })
    this.setData({
      href: app.globalData.href,//服务器地址
      shopCart: app.globalData.shopCart,//购物车数据
      // custom: custom,
      // style: style,
    })
    this.getTime();
    this.getCount();
    
  },
  methods: {
    //获取地理位置
    getLocation: function (event) {
      let that = this;
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          var qqMapApi = 'http://apis.map.qq.com/ws/geocoder/v1/';
          qqMapApi = qqMapApi + "?location=" + res.latitude + ',' +
            res.longitude + "&key=" + 'XVLBZ-BSU66-ULJSQ-MFGXD-TM7GZ-55F2M' + "&get_poi=1";
          wx.request({
            url: qqMapApi,
            method: 'GET',
            success: (res)=>{
              var address = res.data.result.address;
              that.setData({
                address: address
              })
            }
          })
        }
      })
    },
    getTime(event){
      let that = this;
      let hour = new Date().getHours();
      let minute = new Date().getMinutes() + 30;
      let timeArr = [];
      if (minute >= 60) { hour += 1 };
      for (let i = 0; i < 6; i++) {
        minute += 15;
        if (minute >= 60) {
          hour += 1;
          minute -= 60;
        }
        let str = `${hour}:${minute}`;
        timeArr.push(str);
      }
      let sendTime = `立即送出 预计${timeArr[0]}送达`;
      that.setData({
        startTime: timeArr[0],
        endTime: timeArr[5],
        time: sendTime,
      })
    },
    TimeChange(event){
      this.setData({
        time: `预计${event.detail.value}送达`,
      })
    },
    getCount(event){
      let list = app.globalData.shopCart;
      let count = 0;
      for(let item of list){
        count+=item.num*item.price;
      }
      count+=5;
      this.setData({
        count: count,
      })
    },
    submitList(event){
      this.setData({
        showModel: event.currentTarget.dataset.target
      })
    },
    hideModel(event) {
      this.setData({
        showModel: event.currentTarget.dataset.target
      })
    },
  }
})