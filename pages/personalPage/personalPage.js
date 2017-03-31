var app = getApp();
Page({
    data:{
        userInfo:[],
        discussionListIn:[],
        tab:1,
        messageNoticeList:[],
        unreadOnly:true
    },
    onLoad:function(options){
        console.log("onLoad");
        this.setData({
            userInfo:app.globalData.userInfoDetail,
        })
    },
    onShow:function(){
        this.setData({
            discussionListIn:[
            {
                userId:1,
                questionId:1,
                questionContent:"测试问题1",
                questionAbstract:"测试问题1概要",
                commentNum:3
            },
            {
                userId:2,
                questionId:2,
                questionContent:"测试问题2",
                questionAbstract:"测试问题2概要",
                commentNum:2
            }
        ],
        messageNoticeList:[
            {
                senderId:1,
                senderNickName:"匿名用户",
                senderName:"Anna",
                senderStudentNo:"1352875",
                //questionId
                parentTargetId:1,
                //commentId
                targetId:1,
                content:'这是一条评论',
                messageType:2,
                time:'2016-10-12',
                unread:true
            },
              {
                senderId:1,
                senderNickName:"匿名用户",
                senderName:"Anna",
                senderStudentNo:"1352875",
                //questionid
                parentTargetId:1,
                //commentid(那条回复)
                targetId:2,
                content:'这是一条回复',
                messageType:1,
                time:'2016-10-12',
                unread:false
            },
              {
                senderId:1,
                senderNickName:"匿名用户",
                senderName:"Anna",
                senderStudentNo:"1352875",
                //courseId
                targetId:2,
                content:'算法',
                messageType:3,
                time:'2016-10-12',
                unread:false
            }
        ]
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
    commentNoticeItemTapped:function(e){
        console.log("commentNoticeItemTapped");
        var questionId = e.currentTarget.dataset.questionid;
        var commentId = e.currentTarget.dataset.commentid;
        console.log(questionId);
        wx.navigateTo({
          url: '../question/question?questionId='+questionId+'&&'+'commentId='+commentId,
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