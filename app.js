//app.js
App({
  onLaunch: function() {
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
		if (capsule) {
		 	this.globalData.Custom = capsule;
			this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
		} else {
			this.globalData.CustomBar = e.statusBarHeight + 50;
		}
      }
    })
  },
  globalData: {
    ColorList: [{
        title: '嫣红',
        name: 'red',
        color: '#e54d42'
      },
      {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d'
      },
      {
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08'
      },
      {
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f'
      },
      {
        title: '森绿',
        name: 'green',
        color: '#39b54a'
      },
      {
        title: '天青',
        name: 'cyan',
        color: '#1cbbb4'
      },
      {
        title: '海蓝',
        name: 'blue',
        color: '#0081ff'
      },
      {
        title: '姹紫',
        name: 'purple',
        color: '#6739b6'
      },
      {
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0'
      },
      {
        title: '桃粉',
        name: 'pink',
        color: '#e03997'
      },
      {
        title: '棕褐',
        name: 'brown',
        color: '#a5673f'
      },
      {
        title: '玄灰',
        name: 'grey',
        color: '#8799a3'
      },
      {
        title: '草灰',
        name: 'gray',
        color: '#aaaaaa'
      },
      {
        title: '墨黑',
        name: 'black',
        color: '#333333'
      },
      {
        title: '雅白',
        name: 'white',
        color: '#ffffff'
      },
    ],
	domain : '',
  },
  //自定义的全局方法
  returnMsg(){
  	console.log('我是一个全局的方法')
  },
  
  showModal(title,icon = 'none',duration=1500,){
	wx.showToast({
		title : title,
		icon : icon,
		duration :1500
	})
  },
  
  gRequest(data){
	var that = this
	return  new Promise(function (resolve,reject){
		wx.request({
      // url: 'http://123.56.71.60:613/index.php/api/' + data['url'],  //生产环境
		   url: 'http://www.tp5.com/index.php/api/' + data['url'], //开发环境
		   data: data['data'],
		   method: 'POST',
		   header: {
		     'content-type': 'application/json' // 默认值
		   },
		   success (res) {
			   var data = res.data
			   if(data.code == 101){
           that.showModal('登录信息错误，请重新登录')
           wx.clearStorage()
				   setTimeout(function(){
					   wx.reLaunch({
							url : '/pages/login/login'
					   })
				   },1900)
				   return
			   }
			   resolve(data)
		   }
		})
	})
	
	
  },
  
  gGetStorage(name){
	  try {
	    var value = wx.getStorageSync(name)
	    if (value) {
			return value
	    }else{
			return false
		}
	  } catch (e) {
	    // Do something when catch error
	  }
  },
  
  gTimeToDate(timestamp){
	  var data = new Date(timestamp*1000)
	  var year = data.getFullYear()
	  var month = data.getMonth() + 1
	  var date = data.getDate()
	  data = year + '-' + month + '-' + date
	  return data
  },

  getToken(){
    try {
	    var value = wx.getStorageSync('userInfo').token
	    if (value) {
			return value
	    }else{
			return false
		}
	  } catch (e) {
	    // Do something when catch error
	  }
  }
})


