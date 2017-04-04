var app = getApp();
Page({
    data:{
        noticeList :null,
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
        var that = this;
        console.log(this.data.courseId);
        wx.setNavigationBarTitle({
          title: options.courseName,
          success: function(res) {
            // success 
          }
        })
         wx.getSystemInfo({
        success: function(res) {
            console.log(res.windowWidth);
            console.log(res.windowHeight);
            that.setData({
            windowHeight:res.windowHeight,
            windowWidth:res.windowWidth
            })
        }
        })
        this.setData({
            courseId:options.courseId,
            userInfo:app.globalData.userInfoDetail,
            courseName:options.courseName,
            loadingHidden:false,
            // noticeList:[]
        })
        var requestUrl = app.globalData.url+'/course/'+options.courseId+'/notice';
        console.log("course onLoad"+requestUrl);
        //todo获取通知列表
        wx.request({
          url: requestUrl,
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              "Authorization":app.globalData.token
          }, // 设置请求的 header
          success: function(res){
            // success
            console.log("get noticeList succeed res:");
            console.log(res);
            that.setData({
                loadingHidden:true,
                noticeList:res.data.notices
            })
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    //发布通知
    bindFormSubmit:function(e){
        var a = [];
        a.push(1);
        var that = this;
        var requestUrl = app.globalData.url+'/course/'+this.data.courseId+'/notice';
        console.log("createNotice:"+this.data.userInfo.userId+":"+e.detail.value.textarea);
        var content = e.detail.value.textarea;
        console.log(app.globalData.token);
        //todo创建通知
        wx.request({
          url: requestUrl,
          data: {
              content:content,
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            "Authorization":app.globalData.token,
            "Content-Type":"application/x-www-form-urlencoded"
          }, // 设置请求的 header
          success: function(res){
            console.log("createNotice succeed")
            console.log(res);
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000
            })
            // success
            var notices = that.data.noticeList==null?[]:that.data.noticeList;
            // if(!that.data.noticeList){
            //   noticeList = [];
            // }
            // console.log("before...")
            // console.log(notices);
            notices.unshift(res.data.notice);
            // console.log("after...")
            // console.log(notices);
            that.setData({
                noticeList:notices
            })
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
        var courseId = this.data.courseId;
        wx.scanCode({
          success: function(res){
            // success
            wx.navigateTo({
              url: '../attendance/attendance?courseId='+courseId,
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
          },
          complete: function() {
            // complete
          }
        })
    },
    generateQRcodeTapped:function(){
        var that = this;
        var courseId = this.data.courseId;
        wx.request({
          url: app.globalData.url+'/course/'+courseId+'/attendance',
          data: {},
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              'Authorization':app.globalData.token
          }, // 设置请求的 header
          success: function(res){
            // success
            if(res.data.result === 'success'){
                var qrcodeSrc = res.data.qrcodeSrc;
                wx.navigateTo({
                  url: app.globalData.url+'/attendance/attendance?qrcodeSrc='+qrcodeSrc+'&&courseId='+courseId,
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
        var pageUrl = "pages/attendance?courseId="+this.data.courseId;
        console.log("generateQRcode..." + pageUrl);
        var that = this;
        wx.request({
            url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&" 
                + "appid=" + app.globalData.appid + "&secret=" + app.globalData.appsecret,
            method: "GET",
            success: function(res){
                var accessToken = res.data.access_token;
                console.log(accessToken);
                wx.request({
                    url: "https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token="
                        + accessToken,
                    data: {
                        "path": pageUrl,
                        "width": 430
                    },
                    dataType: "text",
                    method: 'POST',
                    success: function(res){
                        console.log("generateQRcode succeed");
                        console.log(res);
                        // that.setData({
                        //     src:"data:image/jpeg;base64," + res.data,
                        // })
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                })
            },
            fail: function(e) {
                console.log(e);
            }
        })
    }

});