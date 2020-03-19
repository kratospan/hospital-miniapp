// pages/my/testResult/testResult.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(options.test_id){
            this.setData({
                test_id : options.test_id
            })
            this.selectPhoto()
        }
    },

    selectPhoto(){
      wx.showLoading()
	  var that = this
	  app.gRequest({
	  		  url : 'test/select_photo',
	  		  data : {
				  test_id : that.data.test_id,
				  token : app.getToken()
			  }
	  }).then(function(res){
	  		  wx.hideLoading()
	  		  if(res.code == 200){
                  var imgList = []
                  if(res.data['0']){
                      imgList.push(res.data['0']['photo_url'])
                  }
                  if(res.data['1']){
                    imgList.push(res.data['1']['photo_url'])
                }
                if(res.data['2']){
                    imgList.push(res.data['2']['photo_url'])
                }
	  			  that.setData({
                        currentImg : res.data['0']['photo_url'],
                        imgList : imgList
                    })
	  		  }else{
	  			  app.showModal(res.msg)
	  		  }
	  })
    },

    toPreview(){
        wx.previewImage({
          urls: this.data.imgList,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

})