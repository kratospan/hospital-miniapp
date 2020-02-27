Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    elements: [{
        title: '挂号预约',
        name: 'layout',
        color: 'cyan',
        icon: 'newsfill'
      },
      {
        title: '体检预约',
        name: 'background',
        color: 'blue',
        icon: 'colorlens'
      }
    ],
	
	others:[{
		title : '添加就诊人',
		icon : 'friend',
	},{
		title : '体检报告查询',
		icon : 'form',
	},{
		title : '缴费记录',
		icon : 'refund',
	}]
  },
  methods : {
	  toBook(res){
		  var res = res.currentTarget.dataset.title
		  if(res == '挂号预约'){
			  wx.navigateTo({
			  			  url : "/pages/ask/chooseDepartment/chooseDepartment"
			  })
		  }else{
			  // wx.navigateTo({
			  // 			  url : "/pages/ask/chooseDepartment/chooseDepartment"
			  // })
		  }
	  }
  }
})