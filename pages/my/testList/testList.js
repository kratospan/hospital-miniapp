const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
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