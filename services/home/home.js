/** 获取首页数据 */
export function fetchHome() {
  wx.showLoading();
  const app = getApp();
  const swiper = [];
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://www.hktvmall.com/hktvwebservices/v1/hktv/get_toysnbooks_landing?lang=zh',
      header: {
        Authorization: app.globalData.token,
      },
      success(res) {
        if (res.statusCode === 200) {
          res.data.imageSlider.forEach((element) => {
            swiper.push(element);
          });
          resolve({
            swiper,
          });
        } else {
          reject(res);
        }
      },
      fail(res) {
        reject(res);
      },
      complete() {
        wx.hideLoading();
      },
    });
  });
}
