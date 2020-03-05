const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	tagList : ['职场精英','均衡检查'],
	mealList : []
  },
  onLoad() {
    this.selectMealList()
  },
  onReady() {
    
  },
  toJump(e){
	 var meal_id = e.currentTarget.dataset.target.meal_id
	 wx.navigateTo({
		 url : '/pages/ask/testMore/testMore?meal_id=' + meal_id
	 })
  },
  
  selectMealList(){
	  wx.showLoading()
	  var that = this
	  app.gRequest({
		  url : 'meal/select_meal',
		  data : {
			  
		  }
	  }).then(function(res){
		  wx.hideLoading()
		  if(res.code == 200){
			  that.setData({
				  mealList : res.data
			  })
		  }else{
			  app.showModal(res.msg)
		  }
	  })
  }
})