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
    })
    console.log("courseId:"+options.courseId+"questionId:"+options.questionId);
    this.getCommentList(this);
    if(options.commentId){
      this.setData({
        focusCommentId:options.commentId
      })
    }
    // this.setData({
    //   commentListDiv:generateCommentListView(this.data.commentList)
    // }) 
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
    if(e.currentTarget.dataset.commenterid !== this.data.userInfo.id){
      this.setData({
            commentInputFocus:true,
            commentInputPlaceholder:'@'+e.currentTarget.dataset.commentername+':',
            parentId:e.currentTarget.dataset.commentid
          })
    }else{
        wx.showModal({
          title: '提示',
          content: '不能@自己',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
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
        // var comments = that.data.commentList==null?[]:that.data.commentList;
        // comments.push(res.data.question);
        // that.setData({
        //   commentList:comments
        // })
        that.getCommentList(that);
        that.setData({
          defaultValue:'',
          commentInputFocus:false,
          commentInputPlaceholder:'评论',
          parentId:-1
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
  getCommentList:function(that){
    wx.request({
      url: app.globalData.url+'/course/'+that.data.courseId+'/question/'+that.data.questionId,
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
  }
}
)

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