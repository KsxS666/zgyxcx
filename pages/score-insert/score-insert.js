// pages/score-insert/score-insert.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:null,
    yeahCheck:false,
    nopCheck:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
  yeahCheck:function(){
    var that = this;
    that.setData({
      yeahCheck:true,
      nopCheck:false
    });
    wx.request({
      url: app.globalData.BASE_API + 'user/api/foodWaste/entry',
      data: { houseId: that.data.params.houseId, passFlag:1 },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: ((res) => {
        wx.navigateBack()
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
  nopCheck: function () {
    var that = this;
    let params = that.data.params;
    that.setData({
      nopCheck: true,
      yeahCheck: false
    })
  }
})