const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    notice_list : [{
		date : '2019-10-16',
		content : '您预约的号源已成功取消，点击查看详情',
		title : '预约挂号3',
	},{
		date : '2019-10-16',
		content : '您预约的号源已成功，点击查看详情',
		title : '预约挂号2',
	},{
		date : '2019-10-16',
		content : '您预约的号源已成功四阿比，点击查看详情',
		title : '预约挂号1',
	}],
	has_notice : true
  },
  methods: {
    toChild(e) {
      wx.navigateTo({
        url: '/pages/plugin' + e.currentTarget.dataset.url
      })
    },
	toJump(e){
		wx.navigateTo({
			url : '/pages/my/registerMore/registerMore'
		})
	}
  }
});