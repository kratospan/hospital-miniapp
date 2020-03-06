const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	list : [],
	patient_list : [],
	has_choose : [],
	stop : false,
	page : 1
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
	  var rlist = []
  	this.setData({
  	  has_choose: e.currentTarget.dataset.target,
	  page : 1,
	  list : rlist
  	})
	this.select_register()
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
	  app.gRequest({
		  url : 'patient/select_patient_list',
		  data : {
			user_id : this.data.user_id,
			token : app.getToken()
		  }
	  }).then(function(res){
		  wx.hideLoading()
		  if(res.code == 200){
			 
			  if(res.num != 0){
				  that.setData({
				  	patient_list : res.data,
				  	has_choose : res.data[0]
				  })
				  that.select_register()
			  }
		  }else{
			  
			  app.showModal(res.msg)
		  }
	  })
  },
  
  //获取挂号记录列表
  select_register(){
	  // wx.showLoading()
	  // var patient_id = this.data.has_Choose.patient_id
	  var that = this 
	  var data = {
		  'patient_id' : this.data.has_choose.patient_id,
		  'page' : that.data.page,
			'token' : app.getToken()
	  }
	  app.gRequest({
		  url : 'register/select_register',
		  data : data,
		  
	  }).then(function(res){
		  wx.hideLoading()
		  if(res.code == 200){
			   res.num = res.num + 1
			  if(res.num != 0){
			  	var list = that.data.list
			  	for(let i = 0; i < res.num - 1; i++){
			  			list.push(res.data[i])
			  	}
			    that.setData({
			  		list : list,
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
			app.showModal(res.msg)
		}
	  })
  },
  
  //跳转到详情页
  toJump(e){
  	  var register_id = e.currentTarget.dataset.target.register_id
  	  wx.navigateTo({
  		  url : '/pages/my/registerMore/registerMore?register_id=' + register_id
  	  })
  },
  
  onReachBottom(){
  	  if(!this.data.stop){
  		  this.select_register()
  	  }
  }
})