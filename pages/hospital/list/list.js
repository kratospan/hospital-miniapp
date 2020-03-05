const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	doctor : []
  },
  onLoad(options) {
    this.setData({
		office_id : options.office_id,
		type : options.type
	})
  },
  onReady() {
    this.selectDorctList()
  },
  toJump(e){
	  var doctor_id = e.currentTarget.dataset.target.doctor_id
	  if(this.data.type == 'doctor'){
		  wx.navigateTo({
			url : '/pages/hospital/doctor/doctor?doctor_id=' + doctor_id
		  })
	  }else{
		  wx.navigateTo({
		  	url : '/pages/ask/chooseDate/chooseDate?doctor_id=' + doctor_id
		  })
	  }
  },
  
  //获取本科室的医生列表
  selectDorctList(){
	  wx.showLoading()
	  var that = this
	  app.gRequest({
		  url : 'doctor/select_doctor_list',
		  data : {
			  office_id : this.data.office_id
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