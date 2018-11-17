// pages/house-manage/house-manage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterArr:null,
    dataArr:null,
    buildingArr:null,
    unitArr:null,
    doorArr:null,
    buiName:null,
    unName:null,
    doorName:null,
    communityName:'',
    officerId:'',
    isRotate1:false,
    isRotate2:false,
    isRotate2:false,
    reSetQuery:{},
    listQuery:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        console.log(res)
        that.fetchFilter(res.data.id);
        that.fetchData(res.data.id);
        that.setData({
          communityName: res.data.communityName,
          officerId: res.data.id,
          resetQuery:{officerId:res.data.id}
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading()
    var that = this;
    let id = that.data.officerId;
    wx.request({
      url: app.globalData.BASE_API + 'user/api/house/getListData',
      data: { officerId: id },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: ((res) => {
        wx.hideLoading()
        that.setData({
          dataArr: res.data.data.resultList,
        },(()=>{
          wx.stopPullDownRefresh();   
        }))
      }),
      fail: (() => {
        wx.showToast({
          title: '服务器连接失败！',
          icon: 'none',
          duration: 2000
        })
      })
    })
    that.setData({
      buiName: null,
      unName: null,
      doorName: null,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  fetchFilter:function(id){
    var that = this;
    wx.request({
      url: app.globalData.BASE_API + 'user/api/house/getDataByOfficer',
      data: { officerId: id },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: ((res) => {
        let arr = res.data.data;
        that.setData({
          filterArr:arr
        })
        let arr1 = [];
        for(let item of arr){
          let obj = {index:item.index,label:item.label};
          arr1.push(obj)
        };
        that.setData({
          buildingArr:arr1
        })
      }),
      fail: (() => {
        wx.showToast({
          title: '服务器连接失败！',
          icon: 'none',
          duration: 2000
        })
      })
    })
  },
  fetchData:function(id){
    var that = this;
    wx.showLoading();
    let listQuery = {officerId:id};
    that.setData({
      listQuery:listQuery
    })
    wx.request({
      url: app.globalData.BASE_API + 'user/api/house/getListData',
      data: {officerId:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: ((res) => {
        that.setData({
          dataArr:res.data.data.resultList
        },(()=>{
          wx.hideLoading()
        }))
      }),
      fail: (() => {
        wx.showToast({
          title: '服务器连接失败！',
          icon: 'none',
          duration: 2000
        })
      })
    })
    
  },
  buiSw:function(e){
    var that = this;
    that.setData({
      unitArr:null,
      doorArr:null,
      unName:null,
      doorName:null
    })
    //获取列表（一级筛选）
    wx.showLoading();
    let listQuery = that.data.listQuery;
    let arr = that.data.filterArr;
    listQuery.building = arr[e.detail.value].label;
    listQuery.unit = '';
    listQuery.doorNumber = '';
    wx.request({
      url: app.globalData.BASE_API + 'user/api/house/getListData',
      data: listQuery,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: ((res) => {
        that.setData({
          listQuery:listQuery,
          dataArr: res.data.data.resultList
        },(()=>{
          wx.hideLoading()
        }))
      }),
      fail: (() => {
        wx.showToast({
          title: '服务器连接失败！',
          icon: 'none',
          duration: 2000
        })
      })
    })
    //获取级联二
    let arr2 = [];
    for(let item of arr[e.detail.value].children){
      let obj = {children:item.children,id:item.id,label:item.label};
      arr2.push(obj)
    }
    that.setData({
      buiName:arr[e.detail.value].label,
      unitArr:arr2,
      listQuery: listQuery,
      isRotate1: false
    })
  },
  unSw:function(e){
    var that = this;
    that.setData({
      doorArr:null,
      doorName:null
    })
    //获取列表（二级筛选）
    wx.showLoading();
    let listQuery = that.data.listQuery;
    let arr2 = that.data.unitArr;
    listQuery.unit = arr2[e.detail.value].label;
    listQuery.doorNumber = '';
    
    wx.request({
      url: app.globalData.BASE_API + 'user/api/house/getListData',
      data: listQuery,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: ((res) => {
        that.setData({
          dataArr: res.data.data.resultList
        },(()=>{
          wx.hideLoading();
        }))
      }),
      fail: (() => {
        wx.showToast({
          title: '服务器连接失败！',
          icon: 'none',
          duration: 2000
        })
      })
    })
    //获取三级级联
    let arr3 = arr2[e.detail.value].children;
    let arr4 = [];
    for(let item of arr3){
      let obj = {id:item.id,label:item.label};
        arr4.push(obj)
    }
    that.setData({
      unName: arr2[e.detail.value].label,
      doorArr:arr4,
      listQuery: listQuery,
      isRotate2: false
    })
  },
  dooSw:function(e){
    var that = this;
    wx.showLoading();
    let listQuery = that.data.listQuery;
    
    let arr2 = that.data.doorArr;
    listQuery.doorNumber = arr2[e.detail.value].label;
    wx.request({
      url: app.globalData.BASE_API + 'user/api/house/getListData',
      data: listQuery,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: ((res) => {
        that.setData({
          dataArr: res.data.data.resultList
        },(()=>{
          wx.hideLoading()
        }))
      }),
      fail: (() => {
        wx.showToast({
          title: '服务器连接失败！',
          icon: 'none',
          duration: 2000
        })
      })
    })
    that.setData({
      doorName:arr2[e.detail.value].label,
      isRotate3:false,
      listQuery:listQuery
    })
  },
  rotate1:function(e){
    var that = this;
    that.setData({
      isRotate1: !that.data.isRotate1 
    })
  },
  rotate2: function (e) {
    var that = this;
    that.setData({
      isRotate2: !that.data.isRotate2
    })
  },
  rotate3: function (e) {
    var that = this;
    that.setData({
      isRotate3: !that.data.isRotate3
    })
  },
  selCancel:function(){
    var that = this;
    that.setData({
      isRotate1:false,
      isRotate2:false,
      isRotate3:false
    })
  }
})