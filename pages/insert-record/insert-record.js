// pages/insert-record/insert-record.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArr:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        wx.showLoading();
        wx.request({
          url: app.globalData.BASE_API + 'user/api/foodWaste/getPage',
          data: { officerId: res.data.id },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: ((res) => {
            wx.hideLoading()
            that.setData({
              dataArr:res.data.data
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
    this.onLoad();
    wx.stopPullDownRefresh()
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

  }
})