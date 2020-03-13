const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	relationPicker : ['自己','父母','子女','夫妻','亲属','朋友'],
	relation : '父子',
	patient_id : '',
	name : '',
	card : '',
	sex : '',
	birth : '',
	phone : '',
	num : 60,
	countDown : false
  },
  onLoad(options) {
    if(options.patient_id){
		this.setData({
			patient_id : options.patient_id
		})
	}
	
	
  },
  onReady() {
    this.selectPatient()
  },
  PickerChange(e) {
    // console.log(e);
    this.setData({
      // index: e.detail.value,
  	  'list[0].patient_relationship' : this.data.relationPicker[e.detail.value]
    })
  },
  inputPhone(e){
  	this.setData({
  		phone : e.detail.value
  	})
  },
  inputCode(e){
  	this.setData({
  		code : e.detail.value
  	})
  },
  confirmPhone(){
  	// /^1(3|4|5|6|7|8|9)\d{9}$/
  	var result = false
  	var reg = /^1(3|4|5|6|7|8|9)\d{9}$/
  	var phone = String(this.data.phone)
  	if(phone.match(reg)){
  		result = true
  	}
  	return result
  },
  deletePatient(){
	wx.showModal({
		title : '提示',
		content : '删除就诊人后，对应的挂号记录和体检记录也会删除，是否确认删除'
	})
  },
  editPatient(){
	if(!this.data.phone){
		wx.showToast({
			title : '请填写手机号码',
			icon : 'none'
		})
		return false
	}
	if(!this.confirmPhone()){
		wx.showToast({
			title : '手机号码格式错误',
			icon : 'none'
		})
		return false
	}
	if(this.checkCode()){
		this.submit_add_patient()
	}
	var that = this
	app.gRequest({
		url : 'code/check_code',
		data : {
			code_phone : this.data.phone,
			code_content : this.data.code
		},	  
	}).then(function(res){
		if(res.code == 200){
			that.submitUpdatePatient()
		}else{
			app.showModal(res.msg)
		}
	})
  },
  
  //查询就诊人信息
  selectPatient(){
	  var that = this
	  var data = {
		  'patient_id' : that.data.patient_id,
		  'token' : app.getToken()
	  }
	  app.gRequest({
		  url : 'patient/select_patient',
		  data : data,
		  
	  }).then(function(res){
		  if(res.code == 200){
			  that.setData({
				  // phone : res.data.patient_phone,
				  birth : res.data.patient_birth,
				  card : res.data.patient_card,
				  sex : res.data.patient_sex,
				  relation : res.data.patient_relationship,
				  name : res.data.patient_name,
			  })
			  wx.hideLoading()
		  }else{
			  wx.hideLoading()
			  app.showModal(res.msg)
		  }
	  })
  },
  
  //提交修改就诊人的表单
  submitUpdatePatient(){
	  wx.showLoading()
	  var user_id = app.gGetStorage('userInfo').user_id
	  var data = {
		  'patient_name' : this.data.name,
		  'patient_card' : this.data.card,
		  'patient_sex' : this.data.sex,
		  'patient_phone' : this.data.phone,
		  'patient_birth' : this.data.birth,
		  'patient_relationship' : this.data.relation,
		  'patient_id' : this.data.patient_id,
		  'user_id' : user_id,
		  'token' : app.getToken()
	  }
	  
	  app.gRequest({
		  url : 'patient/update_patient',
		  data : data
	  }).then(function(res){
		  if(res.code == 200){
			  wx.hideLoading()
			  app.showModal(res.msg)
		  }else{
			  wx.hideLoading()
			  app.showModal(res.msg)
		  }
	  })
  },
  
  sendCode(){
  	var that = this
  	if(!this.data.countDown){
  		if(this.data.phone){
  			if(this.confirmPhone()){
  				app.gRequest({
  					url : 'code/send_code',
  					data : {
  						code_phone : this.data.phone
  					},	  
  				}).then(function(res){
  					if(res.code == 200){
  						wx.hideLoading()
  						app.showModal(res.msg)
  						that.countDown()
  						}else{
  							app.showModal(res.msg)
  						}
  				})
  			}else{
  				app.showModal('请填写正确的手机号码')
  			}
  		}else{
  			app.showModal('请填写手机号码')
  		}
  	}
  },
  
  checkCode(){
  	  app.gRequest({
  	  	url : 'code/check_code',
  	  	data : {
  	  		code_phone : this.data.phone,
  			code_content : this.data.code
  	  	},	  
  	  }).then(function(res){
  	  	if(res.code == 200){
  			return true
  	  	}else{
  	  		app.showModal(res.msg)
  			return false
  	  	}
  	  })
  },
  
  countDown(){
  	  var that = this
  	  setTimeout(function(){
  			if(that.data.num >0){
  				that.setData({
  					num : that.data.num - 1,
  					countDown : true
  				})
  				that.countDown()
  			}else{
  				that.setData({
  					countDown : false,
  					num : 60
  				})
  			}
  	  },1000)
  }
})