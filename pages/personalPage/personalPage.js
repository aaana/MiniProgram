var app = getApp();
Page({
    data:{
        userInfo:[]
    },
    onLoad:function(){
        console.log("onLoad");
        this.setData({
            userInfo:app.globalData.userInfo
        })
    }
});