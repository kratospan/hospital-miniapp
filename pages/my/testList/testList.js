const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	patient_list : [],
	has_choose : [],
	testlist : [],
	page : 1,
	stop : false
  },
  onLoad() {
    this.setData({
		user_id : app.gGetStorage('userInfo').user_id
	})
	
  },
  onReady() {
    
  },
  
  onShow(){
	  this.selectPatientList()
  },
  
  choosePatient(e){
	  var list = []
  	this.setData({
  	  has_choose : e.currentTarget.dataset.target,
	  page : 1,
	  testlist : list
  	})
	this.selectTestList()
  	this.hideModal()
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  
  //获取就诊人列表
  selectPatientList(){
  	  var that = this
  	  wx.showLoading()
  	  var data = {
			user_id : this.data.user_id,
			token : app.getToken()
  	  }
  	  app.gRequest({
  		  url : 'patient/select_patient_list',
			data : data,
			
  	  }).then(function(res){
  		  if(res.code == 200){
			   
			  wx.hideLoading()
  			  that.setData({
  				  patient_list : res.data
  			  })
  			  that.setData({
  				  has_choose : res.data[0]
  			  })
			  that.selectTestList()
  		  }else{
  			  wx.hideLoading()
  			  app.showModal(res.msg)
  		  }
  	  })
  },
  
  //获取体检预约列表
  selectTestList(){
	  wx.showLoading()
	  var that = this
	  app.gRequest({
	  	  url : 'test/select_test',
	  	  data : {
			  patient_id : that.data.has_choose.patient_id,
			  page : that.data.page,
			  token : app.getToken()
		  }
	  }).then(function(res){
		  wx.hideLoading()
	  	  if(res.code == 200){
			  res.num = res.num + 1
	  	  	 if(res.num != 0){
	  	  	 	var testlist = that.data.testlist
	  	  	 	for(let i = 0; i < res.num - 1; i++){
	  	  	 			testlist.push(res.data[i])
	  	  	 	}
	  	  	   that.setData({
	  	  	 		testlist : testlist,
	  	  	 					page : that.data.page + 1
	  	  	 				})
	  	  	 	if(that.data.page > 1 && res.num < 10){
	  	  	 		that.setData({
	  	  	 			stop : true
	  	  	 		})
	  	  	 	}
	  	  	 }else{
	  	  	 				  that.setData({
	  	  	 				  	stop : true
	  	  	 				  })
	  	  	 }
	  	  }else{
	  	  	 wx.hideLoading()
	  	  	 app.showModal(res.msg)
	  	  }
	  })
  },
  
  //跳转到详情页
  toJump(e){
	  var test_id = e.currentTarget.dataset.target.test_id
	  wx.navigateTo({
		  url : '/pages/my/testMore/testMore?test_id=' + test_id
	  })
  },
  
  onReachBottom(){
  	  if(!this.data.stop){
  		  this.selectTestList()
  	  }
  }
})