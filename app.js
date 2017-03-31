//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    url:'https://tinanyway.me/weike/wx',
    //老师
token:"eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTAxMTAwNzEsInN1YiI6IntcImlkXCI6NCxcImVtYWlsXCI6XCJzb21lQHFxLmNvbVwifSJ9.N6qFEIXSha68Osvk9vvMsGehsspWrVKjXDiuWD2CIRQ",
//学生
// token:"eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0ODk5MDg0MjMsInN1YiI6IntcImlkXCI6NSxcImVtYWlsXCI6XCJzb21lQDEyNi5jb21cIn0ifQ.Z0bhO2KVRnn2I_-ZDHqcqyDwOY_pLJIyiFHumNOjw6E",

     userInfo:{
            userId:1,
            username:"Anna",
            studentNo:"1352875",
            isTeacher:true
        }
  }
})