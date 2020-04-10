const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
	patientList : [],
    modalName: null,
	doctorInfo : '',
	has_choose_patient : ''
  },
  
  onLoad(options){
	  var data = JSON.parse(options.data)
	  var array = [
		  '08:00-09:00',
		  '09:00-10:00',
		  '10:00-11:00',
		  '14:00-15:00',
		  '15:00-16:00',
		  '16:00-17:00',
	  ]
	  this.setData({
		  doctor_id : data.doctor_id,
		  schedul_time : array[data.schedul_time],
		  schedul_time2 : data.schedul_time,
		  has_choose : data.has_choose,
		  user_id : app.gGetStorage('userInfo').user_id,
		  registerDate : app.gTimeToDate(data.has_choose.dateTime),
		  register_date : data.has_choose.dateTime,
		  user_id : app.gGetStorage('userInfo').user_id
	  })
  },
  
  onReady(){
	  this.selectPatientList()
	  this.selectDoctor()
  },
  
  choosePatient(e){
	 // console.log(e.currentTarget.dataset.target.name)
	this.setData({
	  has_choose_patient: e.currentTarget.dataset.target
	})
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
  addPatient(){
	  wx.navigateTo({
		  url : '/pages/my/addPatient/addPatient'
	  })
	  this.hideModal()
  },
  
  //提交挂号预约的表单信息
  submitRegister(){
	  wx.showLoading()
	  var that = this
	  app.gRequest({
	  	url : 'register/add_register',
	  	data : {
	  		doctor_id : that.data.doctor_id,
			patient_id : that.data.has_choose_patient.patient_id,
			register_date : that.data.register_date,
			register_time : that.data.schedul_time2 - 1,
			user_id : this.data.user_id,
			token : app.getToken()
	  	}
	  }).then(function(res){
	  		  wx.hideLoading()
	  		  if(res.code == 200){
				  console.log(res.data)
				  wx.navigateTo({
					url : '/pages/ask/registerResult/registerResult?type=' + 'register' + '&register_id=' + res.data
				  })
	  		  }else{
	  			  app.showModal(res.msg)
	  		  }
	  })
  },
  
  //获取就诊人列表
  selectPatientList(){
	  wx.showLoading()
	  var that = this
	  app.gRequest({
	  		  url : 'patient/select_patient_list',
	  		  data : {
					user_id : that.data.user_id,
					token : app.getToken()
	  		  }
	  }).then(function(res){
	  		  wx.hideLoading()
	  		  if(res.code == 200){
	  			  that.setData({
	  				  patientList : res.data
	  			  })
	  		  }else{
	  			  app.showModal(res.msg)
	  		  }
	  })
  },
  
  //获取医生详细信息
  selectDoctor(){
	  wx.showLoading()
	  var that = this
	  app.gRequest({
	  		  url : 'doctor/select_doctor',
	  		  data : {
					doctor_id : that.data.doctor_id,
					token : app.getToken()
	  		  }
	  }).then(function(res){
	  		  wx.hideLoading()
	  		  if(res.code == 200){
	  			  that.setData({
	  				  doctorInfo : res.data
	  			  })
	  		  }else{
	  			  app.showModal(res.msg)
	  		  }
	  })
  }
})