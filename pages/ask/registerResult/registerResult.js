const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
	lastDay : 5,
	registerResult : '预约成功',
	icon : 'success'
  },
  
  onLoad(options){
	 // console.log(options)
	 if(options.type == 'register'){
		 this.setData({
			 type : options.type,
			 id : options.register_id
		 })
	 }else{
		 this.setData({
		 	type : options.type,
		 	id : options.test_id
		 })
	 }
  },
  
  onReady(){
	  this.getMore()
  },
  
  getMore(){
	  wx.showLoading()
	  if(this.data.type == 'register'){
		  var url = 'register/select_register_more'
		  var data = {'register_id': this.data.id}
	  }else{
		  var url = 'test/select_test_more'
		  var data = {'test_id': this.data.id,token : app.getToken()}
	  }
	  var that = this
	  app.gRequest({
		  url : url,
		  data : data
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
  
  
  toRigisterMore(){
	  wx.navigateTo({
		  url : '/pages/my/registerMore/registerMore?register_id=' + this.data.list.register_id
	  })
  },
  
  toTestMore(){
  	  wx.navigateTo({
  		  url : '/pages/my/testMore/testMore?test_id=' + this.data.list.test_id
  	  })
  }
})