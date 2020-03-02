const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	relationPicker : ['自己','父母','子女','夫妻','亲属','朋友'],
	relation : '父子'
  },
  onLoad() {
    
  },
  onReady() {
    
  },
  PickerChange(e) {
    // console.log(e);
    this.setData({
      // index: e.detail.value,
  	  relation : this.data.relationPicker[e.detail.value]
    })
  },
  InputPhone(e){
  	this.setData({
  		phone : e.detail.value
  	})
  },
  confirmPhone(){
  	// /^1(3|4|5|6|7|8|9)\d{9}$/
  	var result = false
  	var reg = /^1(3|4|5|6|7|8|9)\d{9}$/
  	var phone = this.data.phone
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
	if(!this.data.code){
		wx.showToast({
			title : '请填写验证码',
			icon : 'none'
		})
		return false
	}
	wx.showToast({
		title : '提交成功'
	})
  }
})