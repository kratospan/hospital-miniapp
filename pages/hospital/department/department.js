const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	officeMore : [],
	office_id : ''
  },
  onLoad(options) {
    this.setData({
		office_id : options.office_id
	})
  },
  onReady() {
    this.selectOfficeMore()
  },
  
  //获取科室的详情资料
  selectOfficeMore(){
	  var that = this
	  wx.showLoading()
	  app.gRequest({
		  url : 'office/select_office_more',
		  data : {
			  office_id : that.data.office_id
		  }
	  }).then(function(res){
		  wx.hideLoading()
		  if(res.code == 200){
			  that.setData({
				  officeMore : res.data
			  })
		  }else{
			  app.showModal(res.msg)
		  }
	  })
  }
})