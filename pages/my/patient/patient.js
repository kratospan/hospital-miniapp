const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	list : []
  },
  onLoad() {
    this.selectPatientList()
  },
  onReady() {
    
  },
  toAddPatient(){
	  wx.navigateTo({
		  url : '/pages/my/addPatient/addPatient'
	  })
  },
  toEditPatient(e){
	  // console.log(e.currentTarget.dataset.target)
	  var patient_id = e.currentTarget.dataset.target.patient_id
	  wx.navigateTo({
	  		  url : "/pages/my/editPatient/editPatient?patient_id=" + patient_id
	  })
  },
  
  //获取用户的就诊人列表
  selectPatientList(){
	  var that = this
	  wx.showLoading()
	  var user_id = app.gGetStorage('userInfo').user_id
	  app.gRequest({
		  url : 'patient/select_patient_list',
		  data : {
			  user_id : user_id
		  }
	  }).then(function(res){
		  if(res.code == 200){
			 
			  that.setData({
				  list : res.data
			  })
			  wx.hideLoading()
		  }else{
			  app.showModal(res.msg)
		  }
	  })
  }
})