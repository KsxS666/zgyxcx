// pages/kitchen-waste-insert/kitchen-waste-insert.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ruleList:null,
    selectedName:'',
    communityName:'',
    checkArr:null,
    tapIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          communityName: res.data.communityName
        })
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
    this.onLoad();
    var that = this;
    that.setData({
      tabActive:0
    })
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
  fetchData: function (id) {
    wx.showLoading();
    var that = this;
    wx.request({
      url: app.globalData.BASE_API + 'user/api/house/getListDataByOfficer',
      data: { officerId: id },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: ((res) => {
        wx.hideLoading()
        console.log(666, res);
        if (res.data.code === 0) {
          that.setData({
            ruleList: res.data.data,
            selectedName: res.data.data[that.data.tapIndex].building + res.data.data[that.data.tapIndex].unit,
            checkArr: res.data.data[that.data.tapIndex].children            
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
  showSheet:function(e){
    var that = this;
    let ruleList = that.data.ruleList
    let sheetArr = [];
    for (let item of ruleList){
      let str = item.building + item.unit;
      sheetArr.push(str)
    }
    wx.showActionSheet({
      
      itemList: sheetArr,
      success(res){
        console.log(res.tapIndex);

        that.setData({
          selectedName:sheetArr[res.tapIndex],
          checkArr:ruleList[res.tapIndex].children,
          tapIndex: res.tapIndex,
          success:(()=>{

          })
        })
        
        
      }
    })
  }
})