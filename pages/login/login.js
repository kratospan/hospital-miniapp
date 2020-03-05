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
    // console.log(e.detail.userInfo)
	wx.showLoading()
	var data = e.detail.userInfo
	var nickname = data.nickName
	console.log(nickname)
	app.gRequest({
		url : 'user/add_user',
		data : {
			'user_nickname' : nickname,
			'user_id' : 2
		}
	}).then(function(res){
		if(res.code == 200){
			data.user_id = res.data
			wx.setStorage({
			  key:"userInfo",
			  data: data
			})
			wx.redirectTo({
				url : '/pages/index/index'
			})
			wx.hideLoading()
		}else{
			wx.hideLoading()
			app.showModal(res.msg)
		}
	})
	
	
  }
})