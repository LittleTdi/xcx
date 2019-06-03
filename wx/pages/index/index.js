const app = getApp();
Component({
  data: {
    swiperList: [],//轮播图数据
    swiperCurrent: 0,//轮播图小圆点样式
    laptopList: {},//商品数据
    cardCur: 0,//轮播图选中图片样式
    VerticalNavTop: 0,
    TabCur: 0,
    MainCur: 0,
    load: true,//监听事件的开关
    cup: ['中杯(200ml)','大杯(250ml)'],//奶茶杯规格
    sweet: ['正常糖','多糖','少糖','微糖'],//奶茶糖度规格
    ice: ['正常冰','少冰','去冰'],//奶茶冰含量规格
    laptopClass: ['中杯(200ml)', '正常糖', '正常冰'],//默认奶茶规格
  },
  attached(){
    var that = this;
    that.setData({
      href: app.globalData.href,//获取到全局的服务器地址
      laptopList: app.globalData.laptopList,//获取商品数据
    })
    //请求轮播图
    wx.request({
      url: this.data.href + 'swipe',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        that.setData({
          swiperList: res.data.data,
        })
      }
    })

  },
  methods: {
    cardSwiper(event) {
      this.setData({
        cardCur: event.detail.current,//选中的轮播图图片样式
        swiperCurrent: event.detail.current//轮播图小圆点选中的样式
      })
    },
    tabSelect(event){
      this.setData({
        TabCur: event.currentTarget.dataset.id,
        MainCur: event.currentTarget.dataset.id,//值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
        VerticalNavTop: (event.currentTarget.dataset.id - 1) * 50//设置竖向滚动条位置
      })
    },
    VerticalMain(event){
      let that = this;
      let list = this.data.laptopList;
      let tabHeight = 0;
      if (this.data.load) {
        for (let i = 0; i < list.length; i++) {
          //小程序节点查询
          //wx.createSelectorQuery()创建节点查询器
          //.select("")找到某个节点
          //.fields({},fun())按照条件{},返回响应的数据fun()
          let view = wx.createSelectorQuery().in(this).select("#main-" + list[i].id)
          view.fields({size: true}, data => {
            list[i].top = tabHeight;//创建一个top，保存每个节点上面的坐标
            tabHeight = tabHeight + data.height;//累加每个节点的的高度
            list[i].bottom = tabHeight;//创建一个bottom，保存每个节点下面的坐标
          }).exec();
        }
        that.setData({
          load: false,//监听事件的开关，只需要触发一次，获取了整个scroll-view的节点的信息，就不再触发事件
          laptopList: list//保存获取到的节点的信息，可以随时使用
        })
      }
      let scrollTop = event.detail.scrollTop + 20;//监听整个scroll-view滚动坐标
      for (let i = 0; i < list.length; i++) {
        //判断，每个商品是否在范围内
        if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
          that.setData({
            //商品不在范围内就移动到范围内
            VerticalNavTop: (list[i].id - 1) * 50,
            TabCur: list[i].id//根据商品下标，显示样式
          })
          return false
        }
      }
    },
    numAdd(event){
      let parent = event.target.dataset.index;//获取触发元素对应的类型的下标
      let child = event.target.dataset.id;//获取触发事件元素的下标
      let list = this.data.laptopList;
      let arr = list[parent].data;
      let count = 0;
      let newArr = app.globalData.shopCart;
      arr[child].num = parseInt(arr[child].num) + 1;//更新num
      if (arr[child].num<2){
        newArr.push(arr[child])//把触发事件元素的商品数据，放到购物车数组中
      }
      for(let i=0;i<arr.length;i++){
        //count为整个类型数据中，被选中的数量之和
        count = parseInt(count) + parseInt(arr[i].num);
      }
      list[parent].data = arr;
      list[parent].count = count;
      console.log(list)
      this.setData({
        laptopList: list,
        newArr: newArr,//保存购物车数组
        modalName: 'viewModal',//显示隐藏奶茶详情表
        modalShow: '',//显示隐藏奶茶规格表
        modalData: arr[child],//保存触发事件商品的数据
        checkCup: 0,//保存奶茶杯规格下标
        checkSweet: 0,//保存奶茶糖度规格下标
        checkIce: 0,//保存奶茶冰度规格下标
        elementEvent: event,//点击添加时，保存触发事件商品的信息
        price: arr[child].price,//点击添加，保存原有的商品价格
      })
      app.globalData.laptopList = list;//把数据存到全局，防止切换组件数据丢失
    },
    numDown(event){
      let parent = event.target.dataset.index;//获取触发元素对应的类型的下标
      let child = event.target.dataset.id;//获取触发事件元素的下标
      let list = this.data.laptopList;
      let arr = list[parent].data;//获取触发元素对应类型的数据
      let count = 0;
      let newArr = app.globalData.shopCart;
      let id = newArr.indexOf(arr[child]);//查找触发事件元素商品，在arr的下标
      if(arr[child].num>0){
        //把num值减1
        arr[child].num = parseInt(arr[child].num) - 1;
      }
      if (arr[child].num == 0){//只有当商品的数目为0时，才移除
        newArr.splice(id, 1);//截取数据，会修改原数组
      }
      for (let i = 0; i < arr.length; i++) {
        //count为整个类型数据中，被选中的数量之和
        count = parseInt(count) + parseInt(arr[i].num);
      }
      list[parent].data = arr;
      list[parent].count = count
      this.setData({
        laptopList: list,//更新页面的数据
      })
      app.globalData.laptopList = list;//把数据存到全局，防止切换组件数据丢失
      app.globalData.shopCart = newArr;//更新商品数据，所选中的商品的数组
      this.modalClear();
    },
    showModal(event) {
      let arr = [];
      for (let item of this.data.laptopList){
        let index = event.currentTarget.dataset.item.classification;//获取到触发事件元素的类型(波霸，小吃，奶盖..)
        if(item.name==index){
          arr = item.data;//获取符合 触发事件元素类型 的一组数据
        }
      }
      this.setData({
        modalName: event.currentTarget.dataset.target,//显示奶茶详情表
        modalShow: event.currentTarget.dataset.target,//保存着触发事件获取的值不一样，显示隐藏奶茶详情表/奶茶规格表
        modalData: event.currentTarget.dataset.item,//获取触发事件元素的商品详情数据
        rmdList: arr
      })
    },
    hideModal(event) {
      this.setData({
        modalName: null,//隐藏奶茶详情表
        modalData: {lname:"水果冰沙",price:18,img_url:"laptop/ice.jpg",submit:"新鲜水果搭配均匀冰沙，夏天离你而去",}
        //隐藏奶茶详情表后：设置默认的商品详情
      })
      if (this.data.modalShow != 'viewModal') {
        this.numDown(this.data.elementEvent);
      }
    },
    checkCbtn(event){
      let price = this.data.price;
      let shopCart = this.data.modalData;
      let arr = this.data.laptopClass;
      let id = event.target.dataset.index;
      arr[0] = this.data.cup[id];
      if(id==0){
        shopCart.price = price;
      }else{
        price += 3;
        shopCart.price = price;
      }
      this.setData({
        checkCup: event.target.dataset.index,
        laptopClass: arr,
        modalData: shopCart
      })
    },
    checkSbtn(event) {
      let arr = this.data.laptopClass;
      arr[1] = this.data.sweet[event.target.dataset.index];
      this.setData({
        checkSweet: event.target.dataset.index,
        laptopClass: arr,
      })
    },
    checkIbtn(event) {
      let arr = this.data.laptopClass;//保存奶茶规格的数组
      arr[2] = this.data.ice[event.target.dataset.index];
      this.setData({
        checkIce: event.target.dataset.index,
        laptopClass: arr,
      })
    },
    checkOK(event){
      let shopCart = this.data.newArr;//传给购物车商品数据的数组
      // let modalData = this.data.modalData;//点击添加，触发点击事件的特定的商品数据  
      // 把商品类型，插入购物车商品数据数组中
      if (this.data.laptopClass[0] == '大杯(250ml)'){
        shopCart[shopCart.length - 1].price+=2;
      }
      shopCart[shopCart.length-1].cup = this.data.laptopClass[0]
      shopCart[shopCart.length-1].sweet = this.data.laptopClass[1]
      shopCart[shopCart.length-1].ice = this.data.laptopClass[2]
      app.globalData.shopCart = shopCart;//把选好选择中的商品，添加到数组中，再保存到全局变量
      this.setData({
        modalName: '',
      })
      this.modalClear();
      console.log("index组件:",shopCart)
    },
    modalClear(){
      //通过子组件向父组件传参
      let count = 0;
      let arr = app.globalData.shopCart;//不能通过index组件的newArr获取数据，因为切换组件会刷新页面，newArr就会被清除，拿不到数据，所以要从全局中要数据，再进行运算
      for(let item of arr){
        count += item.num;
      }
      this.triggerEvent('mycount', count, { bubbles: false });
      // 第一个参数为方法名
      // 第二个参数是向组件传递的数据
      // 第三个参数设置默认样式
      //   有三个属性bubble 默认为false，事件是否冒泡
      //            composed 默认false，事件是否可以穿越组件边界
      //            capturePhase 默认false，事件是否拥有捕获阶段
    }
  },
})

