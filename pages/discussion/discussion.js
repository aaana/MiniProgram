// pages/discussion/discussion.js
Page({
 data:{
        noticeList : [],
        tabData:{
            tab:2,
            img1Tapped:'../../images/noticeTapped.png',
            img1:'../../images/notice.png',
            img2Tapped:'../../images/discussionTapped.png',
            img2:'../../images/discussion.png',
            tab1Name:'通知',
            tab2Name:'匿名讨论'

        }
    },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
   tab1Tapped:function(){
        this.setData({
            tabData:{
                tab:1,
            }
        })
          wx.redirectTo({
            url: '../course/course',
            fail:function(){
                console.log("fail");
            },
            success:function(){
                console.log("success");
            }
        })
    },
    tab2Tapped:function(){
        this.setData({
            tabData:{
                tab:2,
            }
        })
     
    }
})