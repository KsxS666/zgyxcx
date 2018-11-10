// pages/home/home.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxUserInfo:null,
    userInfo:null,
    ruleList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          userInfo:res.data,
        });
        that.fetchData(res.data.id)
      },
    })
    wx.getSetting({
      success:((res)=>{
        console.log(res)
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:((ress)=>{
              that.setData({
                wxUserInfo: ress.userInfo,
                success: (() => {
                  app.globalData.wxUserInfo = e.detail.userInfo
                })
              })
            })
          })
        }
      })
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
    app.checkIsLogin();
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
  fetchData:function(id){
    wx.showLoading();
    var that = this;
    wx.request({
      url: app.globalData.BASE_API + 'user/api/house/getListDataByOfficer',
      data: { officerId: id},
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: ((res) => {
        wx.hideLoading()
        console.log(666,res);
        if(res.data.code === 0){
          that.setData({
            ruleList: res.data.data
          })
        }

      }),
      fail:(()=>{
        wx.showToast({
          title: '服务器连接失败！',
          icon:'none',
          duration:2000
        })
      })
    })
  },
  getWxUserInfo:function(e){
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
          })
        }
      }
    })
  }
})