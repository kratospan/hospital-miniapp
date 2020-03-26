const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	doctor : [],
	page : 1,
	stop : false
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
			  office_id : this.data.office_id,
			  page : that.data.page,
			  token : app.getToken()
		  }
	  }).then(function(res){
		  wx.hideLoading()
		  if(res.code == 200){
			  if(res.num != 0){
				  res.num = res.num + 1
				  var doctor = that.data.doctor
				  for(let i = 0; i < res.num - 1; i++){
				  		doctor.push(res.data[i])
				  }
				  that.setData({
				  	doctor : doctor,
					page : that.data.page + 1
				  })
				  if(that.data.page > 1 && res.num < 10){
				  	that.setData({
				  		stop : true
				  	})
				  }
			  }else{
				if(res.num == 0){
					that.setData({
						stop : true
					})
				}
			  }
		  }else{
			  app.showModal(res.msg)
		  }
	  })
  },
  
  onReachBottom(){
	  // console.log('我到底了')
	  if(!this.data.stop){
		  this.selectDorctList()
	  }
  }
})