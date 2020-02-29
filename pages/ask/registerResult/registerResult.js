const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
	lastDay : 5,
	registerResult : '预约成功',
	icon : 'success'
  },
  toRigisterMore(){
	  wx.navigateTo({
		  url : '/pages/my/registerMore/registerMore'
	  })
  }
})