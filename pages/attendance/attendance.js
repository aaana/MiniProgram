var app = getApp();
Page({
    data:({

    }),
    onLoad:function(options){
        var that = this;
        this.setData({
            courseId:options.courseId,
            userInfo:app.globalData.userInfoDetail
        })
        if(options.qrcodeSrc){
            this.setData({
                qrcodeUrl : app.globalData.qrurl+options.qrcodeSrc
            })
        }
         wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowWidth);
        console.log(res.windowHeight);
        that.setData({
          windowHeight:res.windowHeight,
          windowWidth:res.windowWidth
        })
      }})
    },
    attend:function(){
        var that = this;
        var courseId = this.data.courseId;
        wx.request({
          url: app.globalData.url+'/course/'+courseId+'/attendance',
          data: {
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              'Authorization':app.globalData.token
          }, // 设置请求的 header
          success: function(res){
            // success
            if(res.data.result==='fail'){
                wx.showModal({
                    title: '提示',
                    content: res.data.errmsg,
                    success: function(res) {
                        if (res.confirm) {
                        console.log('用户点击确定')
                        } else if (res.cancel) {
                        console.log('用户点击取消')
                        }
                    }
                })
            }else{
                wx.showToast({
                    title: '点到成功',
                    icon: 'success',
                    duration: 2000
                })
            }
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    backBtnTapped:function(){
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
    }
})