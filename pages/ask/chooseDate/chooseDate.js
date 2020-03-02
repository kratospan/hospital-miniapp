const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
	name : '潘伟健',
	department : '发射科',
	title : '专科医生',
	good :'阿达撒大声地sad啊实打实的 阿萨德',
	list : [{
		date : '2020-02-02 (周五)',
		hasChoose : true
	},{
		date : '2020-02-03 (周六)',
		hasChoose : false
	},{
		date : '2020-02-04 (周日)',
		hasChoose : false
	},{
		date : '2020-02-05 (周一)',
		hasChoose : false
	},{
		date : '2020-02-06 (周二)',
		hasChoose : false
	}],
	cur : 0,
	time : 'am',
	times : 0
  },
  toChoose(e){
	  var item = e.currentTarget.dataset.target
	  var index = e.currentTarget.dataset.index
	  this.setData({
		  cur : index
	  })
  },
  chooseAm(){
	  this.setData({
		  time : 'am'
	  })
  },
  choosePm(){
  	  this.setData({
  		  time : 'pm'
  	  })
  }
})