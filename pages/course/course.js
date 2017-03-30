var app = getApp();
Page({
    data:{
        noticeList : [],
        isIn:false,
        tabData:{
            tab:1,
            img1Tapped:'../../images/noticeTapped.png',
            img1:'../../images/notice.png',
            img2Tapped:'../../images/discussionTapped.png',
            img2:'../../images/discussion.png',
            tab1Name:'通知',
            tab2Name:'匿名讨论'

        }
    },
    onLoad:function(options){
        this.setData({
            courseId:options.courseId,
            userInfo:app.globalData.userInfo,
            courseName:options.courseName
        })
        console.log(this.data.courseId);
        wx.setNavigationBarTitle({
          title: options.courseName,
          success: function(res) {
            // success 
          }
        })
        //todo获取通知列表，以及是否加入改班级
        this.setData({
            noticeList:[
                {
                    noticeId:1,
                    noticeContent:"今天下午quiz",
                    noticeTime:"2016-10-12"
                },
                {
                    noticeId:2,
                    noticeContent:"今天下午的课改到机房上，不要迟到！",                                                                    noticeTime:"2016-10-12"

                }
            ]
        })
    },
    bindFormSubmit:function(e){
        var that = this;
        console.log(that.data.userInfo.userId+":"+e.detail.value.textarea);
        var notice = e.detail.value.textarea;
        //todo创建通知
        wx.request({
          url: '',
          data: {
              notice:notice,
              courseId:that.data.courseId,
              userId:that.data.userInfo.userId
          },
          method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
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
    rollLabelTapped:function(){
        console.log("rollLabelTapped");
        wx.scanCode({
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
    tab1Tapped:function(){
        // this.setData({
        //     'tabData.tab':1
        // })
    },
    tab2Tapped:function(){
        var that = this;
        // this.setData({
        //     tabData:{
        //       'tabData.tab':2
        //     }
        // })
        wx.redirectTo({
            url: '../discussion/discussion?courseId='+that.data.courseId+'&courseName='+that.data.courseName,
            fail:function(){
                console.log("fail");
            },
            success:function(){
                console.log("success");
            }
        })
    },
    joinCourse:function(){
        var that = this;
        console.log("joinCourse");
        //todo加入班级
        // wx.request({
        //   url: 'https://URL',
        //   data: {
        //       courseId:that.data.courseId,
        //       userId:that.data.userInfo.userId
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
    },
    generateQRcodeTapped:function(){
        var pageUrl = "../attendance/attendance?courseId="+this.data.courseId;
        wx.request({
          url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx5761aea4e548362c&secret=b6f9c59d06c3731a3bd1c28bcaf7af24',
          method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            console.log(res);
            var accessToken = res.data.access_token;
            console.log(accessToken);
            wx.request({
              url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token='+accessToken,
              header:{
                'content-type': 'application/x-www-form-urlencoded',
              },
              data: {
                  "path": pageUrl,
                   "width": 430
              },
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              // header: {}, // 设置请求的 header
              success: function(res){
                // success
                console.log("generateQRcode succeed");
                console.log(res);
              },
              fail: function(e) {
                // fail
                console.log(e);
              },
              complete: function() {
                // complete
                console.log(accessToken);
              }
            })
          },
          fail: function(e) {
            // fail
            console.log(e);
          },
          complete: function() {
            // complete
          }
        })
    }

});