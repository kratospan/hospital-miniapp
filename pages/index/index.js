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
  // onShareAppMessage() {
  //   return {
  //     title: 'ColorUI-高颜值的小程序UI组件库',
  //     imageUrl: '/images/share.jpg',
  //     path: '/pages/index/index'
  //   }
  // },
})