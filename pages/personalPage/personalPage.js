var app = getApp();
Page({
    data:{
        discussionListIn:[],
        tab:1,
        messageNoticeList:[],
        unreadOnly:true
    },
    onLoad:function(options){
        console.log("onLoad");
        this.setData({
            userWxInfo:app.globalData.WxUserInfo,
            userInfo:app.globalData.userInfoDetail
        })
    },
    onShow:function(){
        this.getDiscussionList(this);
        // this.setData({
        //     discussionListIn:[
        //     {
        //         userId:1,
        //         questionId:1,
        //         content:"测试问题1",
        //         commentNum:3
        //     },
        //     {
        //         userId:2,
        //         questionId:2,
        //         content:"测试问题2",
        //         commentNum:2
        //     }
        // ],
        // messageNoticeList:[
        //     {
        //         "id":7,
        //         "sender_id":4,
        //         "receiver_id":5,
        //         "message_type":3,
        //         "trigger_id":14,
        //         "hasread":false,
        //         "trigger_content":"最好提前请假",
        //         "target_content":"应该不行",
        //         "course_id":6
        //     },
        //     {
        //         "id":8,
        //         "sender_id":4,
        //         "receiver_id":5,
        //         "message_type":1,
        //         "trigger_id":14,
        //         "hasread":false,
        //         "trigger_content":"问题",
        //         "target_content":"专业综合",
        //         "course_id":6
        //     }
        // ]
        // })
        this.getMessageList(this);
    },
    getDiscussionList:function(that){
        var that = this;
        wx.request({
          url: app.globalData.url+'/questions',
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              'Authorization':app.globalData.token
          }, // 设置请求的 header
          success: function(res){
            // success
            if(res.data.result === 'success'){
                that.setData({
                    discussionListIn:res.data.questions
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
    getMessageList:function(that){
        wx.request({
          url: app.globalData.url+'/messages',
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              'Authorization':app.globalData.token
          }, // 设置请求的 header
          success: function(res){
            // success
            if(res.data.result==='success'){
                that.setData({
                    messageNoticeList:res.data.messages
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
    discussionTabTapped:function(){
        this.setData({
            tab:2
        })
    },
    messageNoticeTabTapped:function(){
        this.setData({
            tab:1
        })
    },
    unreadOnlySwitchChanged:function(){
        this.setData({
            unreadOnly:!this.data.unreadOnly
        })
    },
    questionNoticeItemTapped:function(e){
        var courseId = e.currentTarget.dataset.courseid;
        var questionId = e.currentTarget.dataset.questionid;
        var messageId = e.currentTarget.dataset.messageid;
        wx.request({
          url: app.globalData.url+'/message/'+messageId,
          data: {},
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              'Authorization':app.globalData.token
          }, // 设置请求的 header
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
        wx.navigateTo({
          url: '../question/question?questionId='+questionId+'&&'+'&&courseId='+courseId,
          success: function(res){
            // success
            //todo更新数据库 已读
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    commentNoticeItemTapped:function(e){
        console.log("commentNoticeItemTapped");
        var questionId = e.currentTarget.dataset.questionid;
        var commentId = e.currentTarget.dataset.commentid;
        var courseId = e.currentTarget.dataset.courseid;
        console.log(questionId);
        var messageId = e.currentTarget.dataset.messageid;
        wx.request({
          url: app.globalData.url+'/message/'+messageId,
          data: {},
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              'Authorization':app.globalData.token
          }, // 设置请求的 header
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
        wx.navigateTo({
          url: '../question/question?questionId='+questionId+'&&'+'commentId='+commentId+'&&courseId='+courseId,
          success: function(res){
            // success
            //todo更新数据库 已读
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    allowBtnTapped:function(e){
        var senderId = e.currentTarget.dataset.senderid;
        var courseId = e.currentTarget.dataset.courseid;
        console.log("allowBtnTapped: "+senderId+"申请加入:"+courseId)
        wx.request({
          url: 'https://URL',
          data: {
              senderId:senderId,
              courseId:courseId
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            //todo更新数据库已读
               wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
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
    logout:function(){
        console.log("logout");
    }
});