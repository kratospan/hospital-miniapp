const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
	list : [{
		status : 101,
		time : {
			date : '2020-02-12',
			week : '星期五',
			time : '15:00-16:00'
		},
		hospital_name : '佛山市第一人名医院',
		doctor_name : '梁如珠',
		doctor_department : '营养中心',
		doctor_title : '内科专家',
		patient_name : '潘伟健',
		cost : 19
	},{
		status : '预约成功',
		time : {
			date : '2020-02-12',
			week : '星期五',
			time : '15:00-16:00'
		},
		hospital_name : '佛山市第一人名医院',
		doctor_name : '梁如珠',
		doctor_department : '营养中心',
		doctor_title : '内科专家',
		patient_name : '潘伟健2',
		cost : 19
	}],
	patient_list : [{
		name : '潘伟健',
	},{
		name : '陈可儿'
	},{
		name : '骆诗然'
	},{
		name : '吴紫薇'
	}],
  },
  onLoad() {
    
  },
  onReady() {
    
  },
  choosePatient(e){
  	 // console.log(e.currentTarget.dataset.target.name)
  	this.setData({
  	  index: e.currentTarget.dataset.target.name
  	})
  	this.hideModal()
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})