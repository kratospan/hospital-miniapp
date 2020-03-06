const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	relationPicker : ['自己','父母','子女','夫妻','亲属','朋友'],
	sexPicker : ['男','女'],
  },
  onLoad() {
    
  },
  onReady() {
    
  },
  PickerChange(e) {
    // console.log(e);
    this.setData({
      index: e.detail.value,
	  relation : this.data.relationPicker[e.detail.value]
    })
  },
  SexChange(e) {
	this.setData({
	  sex: this.data.sexPicker[e.detail.value]
	})
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  InputPhone(e){
	// console.log(e.detail.value);
	this.setData({
		phone : e.detail.value
	})
  },
  inputName(e){
	this.setData({
		name : e.detail.value
	})
  },
  inputCode(e){
	this.setData({
		code : e.detail.value
	})
  },
  inputID(e){
  	this.setData({
  		ID : e.detail.value
  	})
	this.autoInputDate()
	this.autoInputSex()
  },
  addPatient(){
	// wx.showLoading()
	if(!this.data.name){
		wx.showToast({
			title : '请填写姓名',
			icon : 'none'
		})
		return false
	}
	if(!this.data.ID){
		wx.showToast({
			title : '请填写身份证',
			icon : 'none'
		})
		return false
	}
	if(!this.getBirthAndSex()){
		wx.showToast({
			title : '身份证格式错误',
			icon : 'none'
		})
		return false
	}
	if(!this.data.sex){
		wx.showToast({
			title : '请选择性别',
			icon : 'none'
		})
		return false
	}
	if(!this.data.date){
		wx.showToast({
			title : '请选择出生年月',
			icon : 'none'
		})
		return false
	}
	if(!this.confirmDate()){
		wx.showToast({
			title : '出生年月错误',
			icon : 'none'
		})
		return false
	}
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
	if(!this.data.relation){
		wx.showToast({
			title : '请选择与就诊人的关系',
			icon : 'none'
		})
		return false
	}
	this.submit_add_patient()
  },
  
  sendCode(){
	   
  },
  
  check_code(){
	  
  },
  
  //提交添加就诊人的表单
  submit_add_patient(){
	  var sex = 0
	  if(this.data.sex == '男'){
		  sex = 1
	  }
	  var user_id = app.gGetStorage('userInfo').user_id
	  var data = {
		  'patient_name' : this.data.name,
		  'patient_card' : this.data.ID,
		  'patient_sex'  : sex,
		  'patient_birth' : this.data.date,
		  'patient_phone' : this.data.phone,
		  'patient_relationship' : this.data.relation,
		  'user_id' : user_id,
		  'token' : app.getToken()
	  }
	  wx.showLoading()
	  app.gRequest({
		  url : 'patient/add_patient',
		  data : data,
		  
	  }).then(function(res){
		  if(res.code == 200){
			  wx.hideLoading()
			  app.showModal(res.msg)
			  setTimeout(function(){
				  wx.navigateBack()
			  },1500)
		  }else{
			  wx.hideLoading()
			  app.showModal(res.msg)
		  }
	  })
  },
  
  /*身份证验证输入是否正确 
   *身份证号合法性验证 
  *支持15位和18位身份证号 *支持地址编码、出生日期、校验位验证*/
  getBirthAndSex(){  
  var ts = this;  
  var code = this.data.ID //identity 为你输入的身份证  
  // console.log(code)
  var city = {
	  11: "北京",
	  12: "天津",
	  13: "河北",
	  14: "山西",
	  15: "内蒙古",
	  21: "辽宁",
	  22: "吉林",
	  23: "黑龙江",
	  31: "上海",
	  32: "江苏",
	  33: "浙江",
	  34: "安徽",
	  35: "福建",
	  36: "江西",
	  37: "山东",
	  41: "河南",
	  42: "湖北",
	  43: "湖南",
	  44: "广东",
	  45: "广西",
	  46: "海南",
	  50: "重庆",
	  51: "四川",
	  52: "贵州",
	  53: "云南",
	  54: "西藏",
	  61: "陕西",
	  62: "甘肃",
	  63: "青海",
	  64: "宁夏",
	  65: "新疆",
	  71: "台湾",
	  81: "香港",
	  82: "澳门",
	  91: "国外" }; 
  var tip = ""; 
  var pass = true; 
  var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/; 
  if(!code.match(reg)) { 
  tip = "身份证号格式错误"; 
  pass = false;
  } else if (!city[code.substr(0, 2)]) { 
  tip = "身份证号格式错误"; pass = false;
  } else {
	  //校验身份证的校验位
	  if (code.length == 18) {
	  	  code = code.split('');  
	  	  //∑(ai×Wi)(mod 11)  
	      //加权因子  
	      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];  
	      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];  //校验位
	      var sum = 0;  
	      var ai = 0;  
	      var wi = 0;  
	      for (var i = 0; i < 17; i++) {   
	  	    ai = code[i];   
	   	    wi = factor[i];   
	  	    sum += ai * wi;  
	      }  
	  	  var last = parity[sum % 11];  
	      if (parity[sum % 11] != code[17]) { 
	   	     tip = "身份证号格式错误";   
	   	     pass = false;   
	      }  
	  } 
  }  
  return pass;
  },
  confirmDate(){
	var result = true
	var date = this.data.date + ' 00:00:00'
	var date = new Date(date).getTime()
	var now = new Date().getTime()
	if(date > now){
		result = false
	}
	return result
  },
  autoInputDate(){
	if(this.data.ID.length == 18){
		var UUserCard = this.data.ID
		var birth = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
		this.setData({
			date : birth
		})
	}
  },
  autoInputSex(){
  	if(this.data.ID.length == 18){
  		var UUserCard = this.data.ID
		var sex = ''
		if(parseInt(UUserCard.substr(16, 1)) % 2 == 1){
			sex = '男'
		}else{
			sex = '女'
		}
  		this.setData({
			sex : sex
		})
  	}
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
  }
})