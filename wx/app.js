//app.js
App({
  onLaunch: function () {
    wx.request({
      url: this.globalData.href + 'laptop',
      success: (res) => {
        let arr = ['波霸', '冰沙', '奶盖', '水果', '咖啡', '小吃'];
        let laptopList = [{}];
        for (let i = 0; i < res.data.data.length; i++) {
          laptopList[i] = {};
          laptopList[i].name = arr[i];
          laptopList[i].data = res.data.data[i];
          laptopList[i].id = i;
          laptopList[i].count = 0;
        }
        this.globalData.laptopList = laptopList;
        // console.log(laptopList)
      }
    })
  },
  globalData: {
    userInfo: null,
    href: 'http://127.0.0.1:3000/',
    shopCart: [],
  }
})