const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	isShow : false, 
	more : {
		name : '未婚女性基础检查',
		tag : ['女性专项','关爱女性'],
		location : '佛山市第一医院体检中心',
		warn : '线上预约暂不提供发票。',
		cost : '1223.23',
	},
	projectList : [],
	patientList : [],
	TabCur: 0,
	scrollLeft:0,
	date : '',
	index : '',
	user_id : '',
	has_choose : [],
	tagList : ['职场精英','均衡检查'],
	meal_id : ''
  },
  onLoad(options) {
    this.setData({
		user_id : app.gGetStorage('userInfo').user_id,
		meal_id : options.meal_id,
	})
	
  },
  onReady() {
    this.selectPatientList()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      // scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },
  confirmTest(e){
	if(!this.data.has_choose.patient_id){
	  	wx.showToast({
			  title : '请选择体检人',
			  icon : 'none'
	  	})
	  	return false
	}
	if(!this.data.date){
			  wx.showToast({
				  title : '请选择预约时间',
				  icon : 'none'
			  })
			  return false
	}
	this.submitTest()
  },
  
  submitTest(){
	  var that = this
	  wx.showLoading()
	  var date = (new Date(that.data.date).getTime())/1000
	  app.gRequest({
	  		  url : 'test/add_test',
	  		  data : {
	  			  meal_id : that.data.meal_id,
				  patient_id : that.data.has_choose.patient_id,
				  test_status : 0,
				  test_date : date,
				  user_id : that.data.user_id
	  		  }
	  }).then(function(res){
			  wx.hideLoading()
	  		  if(res.code == 200){
				  wx.redirectTo({
					  url : '/pages/ask/registerResult/registerResult?type=' + 'test' + '&test_id=' + res.data
				  })
	  		  }else{
	  			  
	  			  app.showModal(res.msg)
	  		  }
	  })
  },
  
  choosePatient(e){
  	 // console.log(e.currentTarget.dataset.target.name)
  	this.setData({
  	  has_choose: e.currentTarget.dataset.target
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

  selectPatientList(){
	  var that = this
	  wx.showLoading()
	  app.gRequest({
		  url : 'patient/select_patient_list',
		  data : {
			  user_id : that.data.user_id
		  }
	  }).then(function(res){
		  if(res.code == 200){
			  that.setData({
				  patientList : res.data
			  })
			  that.selectMealMore()
		  }else{
			  wx.hideLoading()
			  app.showModal(res.msg)
		  }
	  })
  },
  
  selectMealMore(){
	  var that = this
	  wx.showLoading()
	  app.gRequest({
	  		  url : 'meal/select_meal_more',
	  		  data : {
	  			  meal_id : that.data.meal_id
	  		  }
	  }).then(function(res){
	  		  if(res.code == 200){
	  			  that.setData({
	  				  meal_more : res.data
	  			  })
				  that.selectProjectList()
	  		  }else{
				  wx.hideLoading()
	  			  app.showModal(res.msg)
	  		  }
	  })
  },
  
  selectProjectList(){
	  var that = this
	  wx.showLoading()
	  app.gRequest({
	  		  url : 'project/select_project',
	  		  data : {
	  			  meal_id : that.data.meal_id
	  		  }
	  }).then(function(res){
	  		  wx.hideLoading()
	  		  if(res.code == 200){
	  			  that.setData({
	  				  projectList : res.data
	  			  })
	  		  }else{
	  			  app.showModal(res.msg)
	  		  }
	  })
  },
  
  _yybindhide: function () {
  	this.setData({
  		isShow : false
  	})
  },
  __yybindshow: function (){
	this.setData({
		isShow : true
	}) 
  },
  _yybindchange: function (e) {
    var data = e.detail.time
    // console.log(data)
	this.setData({
		date : data
	})
  },
})