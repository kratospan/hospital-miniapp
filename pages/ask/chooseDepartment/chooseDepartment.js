const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
	
	
    department_list: [],
	office_list : [],
	has_choose : [],
    load: true,
	title : '',
	type : '' //分三个参数 doctor department register
  },
  onLoad(options) {
	this.setData({
		type : 'register'
	})
	if(options.type){
		this.setData({
			type : options.type
		})
	}
	
	this.selectDepartment();
	
  },
  onReady() {
    // wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.target.department_name,
	  has_choose : e.currentTarget.dataset.target,
	  title : e.currentTarget.dataset.target.department_name
    })
	this.selectOffice();
  },
  tabDepartment(e){
	  var office_id = e.currentTarget.dataset.target.office_id
	  if(this.data.type == 'register'){
		  wx.navigateTo({
		  	url : "/pages/hospital/list/list?office_id=" + office_id + '&type=' + 'register'
		  })
		  return false
	  }
	  
	  if(this.data.type == 'doctor'){
	  	wx.navigateTo({
			url : "/pages/hospital/list/list?office_id=" + office_id + '&type=' + 'doctor'
	  	})
	  	return false	 
	  }
	  
	  if(this.data.type == 'department'){
	  	wx.navigateTo({
	  		url : "/pages/hospital/department/department?office_id=" + office_id
	  	})
	  	return false	  
	  }
  },
  
  //获取部门列表
  selectDepartment(){
	  var that = this
	  wx.showLoading()
	  app.gRequest({
		  url : 'department/select_department',
		  data : ''
	  }).then(function(res){
		  
		  if(res.code == 200){
			  that.setData({
				  department_list : res.data,
				  has_choose : res.data[0],
				  TabCur : res.data[0].department_name
			  })
			  that.selectOffice();
		  }else{
			  wx.hideLoading()
			  app.showModal(res.msg)
		  }
	  })
  },
  
  //获取科室列表
  selectOffice(){
  	  var that = this
  	  wx.showLoading()
  	  app.gRequest({
  		  url : 'office/select_office',
  		  data : {
			  department_id : that.data.has_choose.department_id
		  }
  	  }).then(function(res){
  		  wx.hideLoading()
  		  if(res.code == 200){
  			  that.setData({
  				  office_list : res.data
  			  })
  		  }else{
  			  app.showModal(res.msg)
  		  }
  	  })
  },
})