const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	list : [{
		name : '潘伟健',
		id : '440921199806182135',
		relation : '自己'
	},{
		name : '潘伟健2',
		id : '440921199806182135',
		relation : '自己'
	}]
  },
  onLoad() {
    
  },
  onReady() {
    
  },
  toAddPatient(){
	  wx.navigateTo({
		  url : '/pages/my/addPatient/addPatient'
	  })
  },
  toEditPatient(e){
	  console.log(e.currentTarget.dataset.target)
	  wx.navigateTo({
	  		  url : '/pages/my/editPatient/editPatient'
	  })
  }
})