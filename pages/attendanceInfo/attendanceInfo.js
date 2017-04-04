var app = getApp();
Page({
     data:{
        tabData:{
            tab:3,
            img1Tapped:'../../images/noticeTapped.png',
            img1:'../../images/notice.png',
            img2Tapped:'../../images/discussionTapped.png',
            img2:'../../images/discussion.png',
            img3Tapped:'../../images/attendanceTapped.png',
            img3:'../../images/attendance.png',
            tab1Name:'通知',
            tab2Name:'匿名讨论',
            tab3Name:'出勤情况'
        }
    },
    onLoad:function(options){
        var that = this;
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
            // noticeList:[]
        })
    },
    onShow:function(){
        this.getAttendanceRecords();
    },
    getAttendanceRecords:function(){
        var that = this;
        this.setData({
            loadingHidden:false
        })
        var courseId = that.data.courseId;
        wx.request({
          url: app.globalData.url+'/course/'+courseId+'/attendanceRecords',
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              'Authorization':app.globalData.token
          }, // 设置请求的 header
          success: function(res){
            // success
            that.setData({
                rollNum:res.data.all,
                attendanceCells:res.data.attendanceCells,
                loadingHidden:true
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
     tab1Tapped:function(){
       var that = this;
        // this.setData({
        //     'tabData.tab':1
        // })
          wx.redirectTo({
            url:'../course/course?courseId='+that.data.courseId+'&courseName='+that.data.courseName,
            fail:function(){
                console.log("fail");
            },
            success:function(){
                console.log("success");
            }
        })
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
    tab3Tapped:function(){

    },
})