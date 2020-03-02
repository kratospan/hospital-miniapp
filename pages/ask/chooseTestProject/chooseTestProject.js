const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	projectList : [{
		name : '女性专项加强检查',
		introduction : '',
		payment : '1213.12',
		tag : ['女性专项','职场精英','均衡检查']
	},{
		name : 'sd专项加强检查',
		introduction : '',
		payment : '1213.12',
		tag : ['女性专项','职场精英','均衡检查']
	},{
		name : '女性专项加强检查213',
		introduction : '',
		payment : '1213.12',
		tag : ['女性专项','职场精英','均衡检查']
	}]
  },
  onLoad() {
    
  },
  onReady() {
    
  },
  toJump(e){
	 wx.navigateTo({
		 url : '/pages/ask/testMore/testMore'
	 })
  }
})