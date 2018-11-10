// pages/phonebook/phonebook.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myPhone:'',
    phoneBook:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        console.log("用户信息",res)
        that.setData({
          myPhone:res.data.phone
        });
        that.fetchData(res.data.id)
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
    var that = this;
    wx.showLoading();
    wx.request({
      url: app.globalData.BASE_API + 'user/api/specialOfficer/getMailList',
      data: { officerId: id },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: ((res) => {
        wx.hideLoading()
        console.log('通讯录', res);
        if (res.data.code === 0) {
          that.setData({
            phoneBook: res.data.data
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
  callNumber:((e)=>{
    console.log("电话点击",e.currentTarget.dataset.phone);
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  })
})