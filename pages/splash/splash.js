// pages/splash/splash.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchToken().then((token) => {
      this.globalData = {
        token: token,
      };
      if (this.globalData.token) {
        this.navToHome();
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  fetchToken() {
    wx.showLoading();
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://www.hkmpcl.com.hk/hktvwebservices/oauth/token',
        method: 'POST',
        header: {
          Authorization: 'Basic aGt0dl9pb3M6SCphSyMpSE0yNDg=',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: { grant_type: 'client_credentials' },
        success: function (res) {
          if (res.statusCode === 200) {
            const token = res.data;
            resolve(`${token.token_type} ${token.access_token}`);
          } else {
            reject(res);
          }
        },
        fail: (res) => {
          reject(res);
        },
        complete: function (res) {
          wx.hideLoading();
        },
      });
    });
  },

  navToHome() {
    wx.switchTab({ url: '/pages/home/home' });
  },
});
