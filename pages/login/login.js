const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
  },
  onLoad() {

    try {
      var value = wx.getStorageSync('userInfo')
      if (value) {
        wx.redirectTo({
			url : '/pages/index/index'
		})
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  
  //发送验证码
  send_code(){
	  app.gRequest({
	  	url : 'code/send_code',
	  	data : {
	  		'code_phone' : 19120539291
	  	}
	  }).then(function(res){
	  	app.showModal(res.msg)
	  })
  },
  
  onReady() {
    
  },
  toLogin(){
	  // console.log(123)
	  
  },
  bindGetUserInfo (e) {
	if(e.detail.errMsg == 'getUserInfo:fail auth deny'){
		wx.showModal({
			title : '提示',
			content : '使用大象医疗小程序需要获取您的授权，请重新点击登录按钮授权'
		})
		return
	}else{
		wx.showLoading()
		
		var data = e.detail.userInfo
		// console.log(data)
		var user_nickname = data.nickName
		var user_avatar = data.avatarUrl
		wx.login({
			 success(res){
				if(res.code){
					app.gRequest({
						url : 'login/login',
						data : {
							user_nickname : user_nickname,
							code : res.code,
							user_avatar : user_avatar
						}
					}).then(function(res){
						wx.hideLoading()
						if(res.code == 200){
							wx.setStorage({
								key:"userInfo",
								data: res.data
							})
							app.showModal('登录成功！跳转中')
							setTimeout(function(){
								wx.reLaunch({
									url : '/pages/index/index'
								})
							},1500)
						}else{
							app.showModal(res.msg)
						}
					   })
				}else{
					console.log('微信没有返还code,重新调用login方法')
					this.login()
				}
			}
		})
	}
	// wx.showLoading()
	// var data = e.detail.userInfo
	// var nickname = data.nickName
	// console.log(nickname)
	// app.gRequest({
	// 	url : 'user/add_user',
	// 	data : {
	// 		'user_nickname' : nickname,
	// 		'user_id' : 3
	// 	}
	// }).then(function(res){
	// 	if(res.code == 200){
	// 		data.user_id = res.data
	// 		wx.setStorage({
	// 		  key:"userInfo",
	// 		  data: data
	// 		})
	// 		wx.redirectTo({
	// 			url : '/pages/index/index'
	// 		})
	// 		wx.hideLoading()
	// 	}else{
	// 		wx.hideLoading()
	// 		app.showModal(res.msg)
	// 	}
	// })
	
  },

})