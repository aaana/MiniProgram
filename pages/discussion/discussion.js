// pages/discussion/discussion.js
var app = getApp();
Page({
 data:{
        discussionList:[],
        tabData:{
            tab:2,
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
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
        courseId:options.courseId,
        courseName:options.courseName,
        loadingHidden:false
    })
   
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var that = this;
    var courseId = this.data.courseId;
     wx.request({
      url: app.globalData.url+'/course/'+courseId+'/question',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
          "Authorization":app.globalData.token
      }, // 设置请求的 header
      success: function(res){
        // success
        that.setData({
            discussionList:res.data.questions,
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
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
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
        // this.setData({
        //    'tabData.tab':2
        // })
     
    },
    tab3Tapped:function(){
           var that = this;
        wx.redirectTo({
          url: '../attendanceInfo/attendanceInfo?courseId='+that.data.courseId+'&courseName='+that.data.courseName,
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
    createQuestionTapped:function(){
      var that = this;
        wx.navigateTo({
          url: '../createQuestion/createQuestion?courseId='+that.data.courseId,
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