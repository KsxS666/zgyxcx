// pages/camera-obtain/camera-obtain.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    refuseImg:null,
    isImage:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    that.setData({
      params:options
    })
    that.fetchImg(options.houseId)
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
  fetchImg:function(id){
    var that = this;
    wx.showLoading();
    wx.request({
      url: app.globalData.BASE_API + 'user/api/foodWaste/getTodayData',
      data: { houseId:id },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: ((res) => {
        wx.hideLoading()
        console.log(res);
        if(res.data.data.img!=''){
          that.setData({
            isImage:true,
            refuseImg:res.data.data.img
          })
        }
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
  chooseImage:function(){
    var that = this;
    wx.chooseImage({
      count:1,
      success: function(res) {
        console.log(res);
        that.setData({
          refuseImg:res.tempFilePaths[0],
          isImage:true
        });
      },
    })
  },
  doUpload:function(e){
    var that = this;
    let params = that.data.params;
    let refuseImg = that.data.refuseImg;
    wx.showLoading();
    wx.uploadFile({
      url: app.globalData.BASE_API + 'system/util/upload', //仅为示例，非真实的接口地址
      filePath: refuseImg,
      name: 'file',
      success(res) {
        let data = JSON.parse(res.data);
        wx.hideLoading()
        if (JSON.parse(res.data).code === 0){
          wx.request({
            url: app.globalData.BASE_API + 'user/api/foodWaste/entry',
            data: { houseId: params.houseId, passFlag: 0,img:data.data[0] },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST',
            success: ((res) => {
              console.log(res)
              // wx.setStorageSync('thumbnailUrl', res.tempFilePaths[0])
              wx.showToast({
                title: '上传成功！',
              })
              wx.redirectTo({
                url: '../kitchen-waste-insert/kitchen-waste-insert',
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




    
        }else{
          wx.showToast({
            title: '上传失败！',
          })
        }
      }
    })
  },
  backToKitchen:function(){
    wx.navigateBack({
      delta:2
    })
  }
})