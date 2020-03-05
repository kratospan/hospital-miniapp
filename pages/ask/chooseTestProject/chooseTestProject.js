const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	tagList : ['职场精英','均衡检查'],
	mealList : [],
	page : 1,
	stop : false
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
			  page : that.data.page
		  }
	  }).then(function(res){
		  wx.hideLoading()
		  if(res.code == 200){
			  if(res.num != 0){
				 res.num = res.num + 1
			  	var mealList = that.data.mealList
			  	for(let i = 0; i < res.num - 1; i++){
			  			mealList.push(res.data[i])
			  	}
			    that.setData({
			  		mealList : mealList,
					page : that.data.page + 1
				})
			  	if(that.data.page > 1 && res.num < 10){
			  		that.setData({
			  			stop : true
			  		})
			  	}
			  }else{
			  				  
			  }
		  }else{
			  app.showModal(res.msg)
		  }
	  })
  },
  
  onReachBottom(){
  	  if(!this.data.stop){
  		  this.selectMealList()
  	  }
  }
})