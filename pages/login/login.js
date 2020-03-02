const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
  },
  onLoad() {
    try {
      var value = wx.getStorageSync('id')
      if (value) {
        wx.redirectTo({
			url : '/pages/index/index'
		})
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  onReady() {
    
  },
  toLogin(){
	  console.log(123)
  },
  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
	wx.redirectTo({
		url : '/pages/index/index'
	})
	wx.setStorage({
	  key:"id",
	  data:"value"
	})
  }
})