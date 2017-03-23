var app = getApp();
Page({
    data:{
        
    },
    onLoad:function(){
        console.log("onLoad");
      this.setData({
            userInfo:app.globalData.userInfo
        })
    }
})