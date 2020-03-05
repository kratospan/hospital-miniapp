const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
	dortor : [],
	list : [],
	cur : 0,
	time : 'am',
	times : 0,
	doctor_id : '',
  },
  
  onLoad(options){
	  this.setData({
		  doctor_id : options.doctor_id
	  })
	  this.getTime()
  },
  
  onReady(){
	  this.selectSchedulList()
	  this.selectDoctor()
  },
  
  toChoose(e){
	  var item = e.currentTarget.dataset.target
	  var index = e.currentTarget.dataset.index
	  this.setData({
		  cur : index
	  })
  },
  
  chooseTime(e){
	  if(e.currentTarget.dataset.type != 3){
		  var data = {
			  doctor_id : this.data.doctor_id,
			  schedul_time : e.currentTarget.dataset.index,
			  has_choose : this.data.has_choose
		  }
		  
		  data = JSON.stringify(data)
		  
		  wx.navigateTo({
			  url : '/pages/ask/confirmRegister/confirmRegister?data=' + data
		  })
	  }
  },
  
  choose_date(e){
  	  // console.log(e.currentTarget.dataset.target)
  	  this.setData({
  		  has_choose : e.currentTarget.dataset.target
  	  })
  	  this.selectSchedulList()
  },
  
  selectSchedulList(){
  	  wx.showLoading()
  	  var that = this
  	  app.gRequest({
  	  		  url : 'schedul/select_schedul_miniapp',
  	  		  data : {
  	  			  doctor_id : that.data.doctor_id,
  	  			  schedul_date : that.data.has_choose.dateTime
  	  		  }
  	  }).then(function(res){
  	  		  wx.hideLoading()
  	  		  if(res.code == 200){
  	  			  that.setData({
  	  				  schedulList : res.data
  	  			  })
  	  		  }else{
  	  			  app.showModal(res.msg)
  	  		  }
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
  },
  
  //在本地获取排班日期
  getTime(){
  	  var now = new Date()
  	  var year = now.getFullYear();     //得到年份
  	  var month = now.getMonth() + 1;       //得到月份
  	  var date = now.getDate() + 1;         //得到日期
  	  now = year + '-' + month + '-' + date
  	  now = Math.round(new Date(now).getTime()/1000)
  	  var dateList = []
  	  for(let i = 0;i < 7;i++){
  		  var nowTime = (now + 60*60*24*i)*1000
  		  var day = ''
  		  var array = ['日','一','二','三','四','五','六']
  		  day = array[new Date(nowTime).getDay()]
  		  dateList[i] = {
  			  day : day,
  			  date : new Date(nowTime).getDate(),
  			  dateTime : nowTime/1000
  		  }
  	  }
  	  this.setData({
  		  dateList : dateList,
  		  has_choose : dateList[0]
  	  })
  },
  
  //获取医生详细信息
  selectDoctor(){
	  wx.showLoading()
	  var that = this
	  app.gRequest({
	  		  url : 'doctor/select_doctor',
	  		  data : {
	  			  doctor_id : that.data.doctor_id,
	  		  }
	  }).then(function(res){
	  		  wx.hideLoading()
	  		  if(res.code == 200){
	  			  that.setData({
	  				  doctor : res.data
	  			  })
	  		  }else{
	  			  app.showModal(res.msg)
	  		  }
	  })
  }
})