var app = getApp();
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      courseId:options.courseId
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  createQuestionFormSubmit:function(e){
        var requestUrl = app.globalData.url + "/course/"+this.data.courseId+"/question";
        console.log(e);
        var content = e.detail.value.questionContent;
        console.log("createQuestionFormSubmit");
          //存数据库
          wx.request({
            url: requestUrl,
            data: {
              content:content
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              "Authorization":app.globalData.token,
              "content-type":"application/x-www-form-urlencoded"
            }, // 设置请求的 header
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
                duration: 5000
              })
            },
            complete: function() {
              // complete
            }
          })
          
      }
});