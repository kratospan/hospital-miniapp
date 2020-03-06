const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
	dateList : [],
	has_choose : [],
	schedulList : [],
	office_id : ''
  },
  
  onLoad(options){
	  this.setData({
		  office_id : options.office_id
	  })
	  this.getTime()
  },
  
  choose_date(e){
	  // console.log(e.currentTarget.dataset.target)
	  this.setData({
		  has_choose : e.currentTarget.dataset.target
	  })
	  this.selectSchedulList()
  },
  
  selectSchedulList(e){
	  wx.showLoading()
	  var that = this
	  app.gRequest({
	  		  url : 'schedul/select_schedul_miniapp',
	  		  data : {
	  			  office_id : that.data.office_id,
					schedul_date : that.data.has_choose.dateTime,
					token : app.getToken()
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

})