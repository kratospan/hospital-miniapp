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
	introduction : '佛山市第一人民医院始建于1881年，跨越三个世纪，院名、院址几经迭变。从昔日简陋的教会诊所、循道医院，如今发展成为具有鲜明特色集医、教、研为一体的大型现代化综合医院。回顾百年历史，佛山市第一人民医院的发展走过了不平凡的道路；一路坎坷颠簸、一路执着前行、一路仁爱普济……   清朝光绪七年（1881年）4月，一位叫查尔斯·云仁(Charles.wenyon)的英国惠师礼教会传教士来到佛山，先在永兴街福音堂开办诊所，并于当年10月14日在缸瓦栏一间大货仓内创办“广济医局”。这是“佛山用西法治病之嚆矢”，是百年名院佛山市第一人民医院之发轫，亦是近代中国最早的西医院之一。目前，医院占地面积12万平方米，建筑面积达28万平方米，员工4000多人，享有国务院津贴6人，正高职称238人，副高职称465人，博士89人，硕士501人。开放床位2500张，临床科室64个，医技科室22个，行政科室22个。2017年门急诊诊疗人次达490多万，出院人次超过11万，住院手术近6万台。'
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