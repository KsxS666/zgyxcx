// pages/camera-obtain/camera-obtain.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thumbnailUrl:'',
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
  chooseImage:function(){
    var that = this;
    wx.chooseImage({
      count:1,
      success: function(res) {
        console.log(res);
        wx.showLoading();
        that.setData({
          thumbnailUrl:res.tempFilePaths[0],
          isImage:true
        },(()=>{
          wx.hideLoading();
        }));
      },
    })
  },
  doUpload:function(e){
    var that = this;
    let params = that.data.params;
    let thumbnailUrl = that.data.thumbnailUrl;
    wx.showLoading();
    wx.uploadFile({
      url: app.globalData.BASE_API + 'system/util/upload', //仅为示例，非真实的接口地址
      filePath: thumbnailUrl,
      name: 'file',
      success(res) {
        wx.hideLoading()
        if (JSON.parse(res.data).code === 0){
          wx.showToast({
            title: '上传成功！',
          }),

            wx.request({
              url: app.globalData.BASE_API + 'user/api/foodWaste/entry',
              data: { houseId: params.houseId, passFlag: 0 },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              method: 'POST',
              success: ((res) => {
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