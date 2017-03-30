Page({
    data:({

    }),
    onLoad:function(options){
        this.setData({
            courseId:options.courseId,
            userInfo:app.globalData.userInfo
        })
    },
    attendTapped:function(){
        var that = this;
        // wx.request({
        //   url: 'https://URL',
        //   data: {
        //       userId:that.data.userInfo.userId,
        //       courseId:that.data.courseId
        //   },
        //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        //   // header: {}, // 设置请求的 header
        //   success: function(res){
        //     // success
        //   },
        //   fail: function() {
        //     // fail
        //   },
        //   complete: function() {
        //     // complete
        //   }
        // })
    }
})