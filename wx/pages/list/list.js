const app = getApp();
Page({
  data: {
    PageCur: 'index',
    count: 0,
  },
  onLoad:function(option){
    
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  cartCount(e){
    this.setData({
      count: e.detail
    })
  }
})


