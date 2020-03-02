Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    contact: [
      { content: '总机电话: 0757-83833633', icon: 'dianhua', color: 'purple' },
      { content: '导航栏: 0757-83163155', icon: 'dianhua', color: 'mauve'},
      { content: '广东省佛山市岭南大道北81号', icon: 'location', color: 'pink' },
    ],
	more : [
		{icon: 'taoxiaopu',title : '科室介绍',color : 'blue',img : '科室管理.png'},
		{icon: 'group_fill',title : '医生介绍',color : 'blue',img : '医生.png'},
	],
	introduction : '我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我'
  },
  methods : {
	  toJump(e){
		  var type = e.currentTarget.dataset.target
		  if(type.title == '科室介绍'){
			wx.navigateTo({
				url : "/pages/ask/chooseDepartment/chooseDepartment?type=department"
			})
		  }
		  if(type.title == '医生介绍'){
			 wx.navigateTo({
			 	url : "/pages/ask/chooseDepartment/chooseDepartment?type=doctor"
			 })
		  }
		  // console.log(type)
		  
	  }
  }
})