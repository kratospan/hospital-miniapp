const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
  },
  onLoad(options) {
    this.setData({
		test_id : options.test_id,
		user_id : app.gGetStorage('userInfo').user_id
	})
  },
  onReady() {
    this.selectTestMore()
  },
  
  selectTestMore(){
	  wx.showLoading()
	  var that = this
	  // console.log(that.data.test_id)
	  app.gRequest({
	  		  url : 'test/select_test_more',
	  		  data : {
				  test_id : that.data.test_id,
				  token : app.getToken()
			  }
	  }).then(function(res){
	  		  wx.hideLoading()
	  		  if(res.code == 200){
	  			  that.setData({
	  				  list : res.data
	  			  })
	  		  }else{
	  			  app.showModal(res.msg)
	  		  }
	  })
  },

  toTestResult(){
	if(this.data.list.has_result == 1){
		wx.navigateTo({
		  url: '../testResult/testResult?test_id=' + this.data.list.test_id,
		})
	}
  },
  
  //取消体检预约
  cancelTest(){
	  var that = this
  	  wx.showModal({
		  title:'取消预约',
		  content:'确定取消预约？',
		  success:function(res){
			  if(res.confirm){
				  wx.showLoading()
				  
				  app.gRequest({
				  		  url : 'test/cancel_test',
				  		  data : {
				  				  test_id : that.data.test_id,
				  				  user_id : that.data.user_id,
				  				  token : app.getToken()
				  			  }
				  }).then(function(res){
				  		  wx.hideLoading()
				  		  if(res.code == 200){
				  			  app.showModal(res.msg)
				  			  setTimeout(function () {
				  			      wx.navigateBack()
				  			      }, 1500) //延迟时间 这里是1秒
				  		  }else{
				  			  app.showModal(res.msg)
				  		  }
				  })
			  }
		  }
	  })
  }
})