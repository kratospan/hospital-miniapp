const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	patient_list : [],
	has_choose : [],
	testlist : []
  },
  onLoad() {
    this.setData({
		user_id : app.gGetStorage('userInfo').user_id
	})
	this.selectPatientList()
  },
  onReady() {
    
  },
  choosePatient(e){
  	this.setData({
  	  has_choose : e.currentTarget.dataset.target
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
  		  user_id : this.data.user_id
  	  }
  	  app.gRequest({
  		  url : 'patient/select_patient_list',
  		  data : data
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
			  patient_id : that.data.has_choose.patient_id
		  }
	  }).then(function(res){
	  	  if(res.code == 200){
	  	  	 wx.hideLoading()
	  	  	 that.setData({
	  	  	  testList : res.data
	  	  	 })
	  	  }else{
	  	  	 wx.hideLoading()
	  	  	 app.showModal(res.msg)
	  	  }
	  })
  },
})