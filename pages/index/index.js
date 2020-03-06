const app = getApp()
Page({
  data: {
    PageCur: 'ask'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
	
	if(e.currentTarget.dataset.cur == 'notice'){
		this.selectComponent("#notice").initData()
	}
  },
})