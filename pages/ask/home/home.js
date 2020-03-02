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
	  },
	  toAddPatient(){
		  wx.navigateTo({
			  url : '/pages/my/addPatient/addPatient'
		  })
	  },
	  toTestList(){
	  		  wx.navigateTo({
	  			  url : '/pages/my/testList/testList'
	  		  })
	  },
	  toJump(e){
		  console.log(e)
		var title = e.currentTarget.dataset.target.title
		if(title == '添加就诊人'){
			wx.navigateTo({
						  url : '/pages/my/addPatient/addPatient'
			})
		}
		if(title == '体检报告查询'){
			wx.navigateTo({
						  url : '/pages/my/testList/testList'
			})
		}
		if(title == '缴费记录'){
			wx.navigateTo({
						  url : '/pages/my/addPatient/addPatient'
			})
		}
		if(title == '体检预约'){
			wx.navigateTo({
						  url : '/pages/ask/chooseTestProject/chooseTestProject'
			})
		}
		if(title == '挂号预约'){
			wx.navigateTo({
						  url : '/pages/ask/chooseDepartment/chooseDepartment'
			})
		}
	  }
	  
  }
})