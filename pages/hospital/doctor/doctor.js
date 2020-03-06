const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	doctor : [],
	doctor_id : ''
  },
  onLoad(options) {
	// console.log(options)
    this.setData({
		doctor_id : options.doctor_id
	})
  },
  onReady() {
    this.selectDoctor()
  },
  
  //获取医生的详细信息
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
				  doctor : res.data
			  })
		  }else{
			  app.showModal(res.msg)
		  }
	  })
  }
})