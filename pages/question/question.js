var app = getApp();
Page({
 data:{
        commentInputFocus:false,
        commentInputPlaceholder:'评论',
        parentId:-1
    },
  onLoad:function(options){
    var that = this;
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
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      userInfo:app.globalData.userInfoDetail,
       questionId:options.questionId,
       courseId:options.courseId,
       //应该注释
      //  commentList:[{
      //    commenterId:1,
      //    commentId:1,
      //    commenter:"匿名用户1",
      //    commentTime:"2016-10-12",
      //    commentContent:"根评论",
      //    parentCommenter:null
      //  },
      //  {
      //       commenterId:2,
      //       commentId:2,
      //       commenter:"匿名用户2",
      //       commentTime:"2016-10-12",
      //       commentContent:"子评论1",
      //       parentCommenter:"匿名用户1"
      //    },
      //     {
      //       commenterId:2,
      //       commentId:3,
      //       commenter:"匿名用户2",
      //       commentTime:"2016-10-12",
      //       commentContent:"子评论1",
      //       parentCommenter:"匿名用户1"
      //    },
      //     {
      //       commenterId:2,
      //       commentId:4,
      //       commenter:"匿名用户2",
      //       commentTime:"2016-10-12",
      //       commentContent:"子评论1",
      //       parentCommenter:"匿名用户1"
      //    },
      //     {
      //       commenterId:2,
      //       commentId:5,
      //       commenter:"匿名用户2",
      //       commentTime:"2016-10-12",
      //       commentContent:"子评论1",
      //       parentCommenter:"匿名用户1"
      //    },
      //     {
      //       commenterId:2,
      //       commentId:6,
      //       commenter:"匿名用户2",
      //       commentTime:"2016-10-12",
      //       commentContent:"子评论1",
      //       parentCommenter:"匿名用户1"
      //    }
      //    ],
    })
    console.log("courseId:"+options.courseId+"questionId:"+options.questionId);
    wx.request({
      url: app.globalData.url+'/course/'+options.courseId+'/question/'+options.questionId,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Authorization":app.globalData.token
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        that.setData({
          question:res.data.question.content,
          commentList:res.data.answers
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    if(options.commentId){
      this.setData({
        focusCommentId:options.commentId
      })
    }
    //获取全部评论
    // wx.request({
    //   url: 'https://URL',
    //   data: {
    //     grandparent_id:this.data.questionId
    //   },
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function(res){
    //     // success
    //     this.setData({
    //       commentList:res.commentList
    //     })
    //   },
    //   fail: function() {
    //     // fail
    //   },
    //   complete: function() {
    //     // complete
    //   }
    // })
    this.setData({
      commentListDiv:generateCommentListView(this.data.commentList)
    }) 
    console.log("qustionId:"+this.data.questionId);
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
  commentTapped:function(){
    this.setData({
      commentInputFocus:true,
      commentInputPlaceholder:'评论',
      commentVal:""
    })
  },
  commentItemTapped:function(e){
    console.log(e);
    //todo 需要修改userInfo
    if(e.currentTarget.dataset.commenterId !== this.data.userInfo.id){
      this.setData({
            commentInputFocus:true,
            commentInputPlaceholder:'@'+e.currentTarget.dataset.commentername+':',
            parentId:e.currentTarget.dataset.commentid
          })
    }
    
  },
  sendComment:function(e){
    var that = this;
    var commentContent = e.detail.value;
    var requestUrl = app.globalData.url+'/course/'+this.data.courseId+'/question/'+this.data.questionId;
    console.log(e);
    wx.request({
      url: requestUrl,
      data: {
        parent_id:that.data.parentId,
        content:commentContent
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Authorization":app.globalData.token,
        "Content-Type":"application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function(res){
        // success
        var comments = that.data.commentList==null?[]:that.data.commentList;
        comments.push(res.data.question);
        that.setData({
          commentList:comments
        })
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

function generateCommentItemView(commentItem){
      var commentItemView =  "<view data-commenterid='"+commentItem.commenterId+"' data-commentid='"+commentItem.commentId+
    "' data-commentername='匿名用户' bindtap='commentItemTapped' class='commentItem'>"+
                "<view class='info'> <image src='../../images/a.jpg'></image>"+
                "<span>"+
                    "<text>匿名用户</text>"+
                    "<text>"+commentItem.commentContent+"</text>"+
                    "<text>"+commentItem.commentTime+"</text>";
    var subCommentList = commentItem.subCommentList;
    for(var index in subCommentList){
      commentItemView = commentItemView + generateCommentItemView(subCommentList[index]);
    }
    commentItemView = commentItemView +
                "</span>"+
            "</view>"+
        "</view>";
        return commentItemView;
}

function generateCommentListView(commentList){
     var commentListDiv = "";
    for(var index in commentList){
      commentListDiv = commentListDiv+generateCommentItemView(commentList[index]);
    }
    return commentListDiv;
}