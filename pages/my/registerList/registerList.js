const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	list : [],
	patient_list : [],
	has_choose : []
  },
  onLoad() {
	this.setData({
		user_id : app.gGetStorage('userInfo').user_id
	})
    this.selectPatientList()
	// this.select_register()
  },
  onReady() {
    
  },
  choosePatient(e){
  	this.setData({
  	  has_choose: e.currentTarget.dataset.target
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
	  var data = {
		  user_id : this.data.user_id
	  }
	  app.gRequest({
		  url : 'patient/select_patient_list',
		  data : data
	  }).then(function(res){
		  if(res.code == 200){
			  that.setData({
				  patient_list : res.data
			  })
			  that.setData({
				  has_choose : res.data[0]
			  })
			  that.select_register()
		  }else{
			  wx.hideLoading()
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
		  'patient_id' : this.data.has_choose.patient_id
	  }
	  app.gRequest({
		  url : 'register/select_register',
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
  }
})