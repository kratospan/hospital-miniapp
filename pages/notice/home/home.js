const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
   properties: {
      cur:{
        type:String,
        value:'默认标题'
      }
    },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    noticeList : [],
	has_notice : true,
	user_id : '',
	page : ''
  },
  methods: {
    toChild(e) {
      wx.navigateTo({
        url: '/pages/plugin' + e.currentTarget.dataset.url
      })
    },
	toJump(e){
		var data = e.currentTarget.dataset.target
		var notice_type = data.notice_type
		if(notice_type == 0){
			wx.navigateTo({
				url : '/pages/my/registerMore/registerMore?register_id=' + data.register_id
			})
		}else{
			wx.navigateTo({
				url : '/pages/my/testMore/testMore?test_id=' + data.test_id
			})
		}
	},
	
	//封装一个组件用的request方法
	cRequest(data){
		return new Promise(function (resolve,reject){
			wx.request({
			   url: 'http://www.tp5.com/index.php/api/' + data['url'], //仅为示例，并非真实的接口地址
			   data: data['data'],
			   method: 'POST',
			   header: {
			     'content-type': 'application/json' // 默认值
			   },
			   success (res) {
				   // console.log(res.data)
				   resolve(res.data)
			   }
			})
		})
	},
	
	//封装的一个同步获取缓存的方法
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
	
	selectNotice(){
		var that = this
		wx.showLoading()
		that.cRequest({
			url : 'notice/select_notice_list',
			data : {
				user_id : that.data.user_id,
				page : that.data.page
			}
		}).then(function(res){
			wx.hideLoading()
			if(res.code == 200){
				that.setData({
					noticeList : res.data
				})
			}else{
				wx.showToast({
					title : res.msg,
					icon : 'none'
				})
			}
		})
		// console.log(this.data.noticeList)
	},
	
	initData(){
		// console.log('我被选中了')
		this.setData({
			user_id : this.gGetStorage('userInfo').user_id,
			page : 1
		})
		this.selectNotice()
		
	},
	
	

  }
});