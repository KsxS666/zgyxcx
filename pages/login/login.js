// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  formSubmit:function(e){
    var that = this;

    console.log('登录表单携带数据为：', e.detail.value);
    if (e.detail.value.worknum == '') {
      return wx.showToast({
        title: '请输入工号！',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showLoading();
      that.setData({
        isLoading: true
      })
      wx.request({
        url: app.globalData.BASE_API + 'user/api/specialOfficer/login',
        data: { account: e.detail.value.worknum },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        success: ((res) => {
          that.setData({
            isLoading:false
          })
          wx.hideLoading();
          console.log(res)
          if (res.data.code === 0) {
            wx.setStorageSync('user', res.data.data);
            app.globalData.userInfo = res.data.data
            wx.showToast({
              title: '登录成功！',
              icon: 'success',
              duration: 2000,
              success: (() => {
                wx.redirectTo({
                  url: '../home/home',
                })
              })
            })

          } else {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000
            })
          }
        })
      })
    }
  },
})