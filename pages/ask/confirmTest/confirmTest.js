const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	isShow : true 
  },
  onLoad() {
    
  },
  onReady() {
    
  },
  _yybindhide: function () {
	console.log('隐藏')
	this.setData({
		isShow : false
	})
  },
  _yybindchange: function (e) {
    var data = e.detail
    // console.log(data)
  },
})