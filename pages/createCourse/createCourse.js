var app = getApp();
Page({
    createCourseFormSubmit:function(e){
      console.log("createCourseFormSubmit");
        //存数据库
        wx.request({
          url: app.globalData.url+'course',
          data: {
            courseName:e.detail.value.courseName
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            wx.showToast({
              title: '创建成功',
              icon: 'success',
              duration: 5000
            })
            wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
                success: function(res){
                  // success
                },
                fail: function() {
                  // fail
                },
                complete: function() {
                  // complete
                }
            })
          },
          fail: function() {
            // fail
            wx.showToast({
              title: '创建失败',
              duration: 2000
            })
          },
          complete: function() {
            // complete
          }
        })
    }
});