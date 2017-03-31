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
              that.globalData.WxUserInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    //老师
// token:"eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTAxMTAwNzEsInN1YiI6IntcImlkXCI6NCxcImVtYWlsXCI6XCJzb21lQHFxLmNvbVwifSJ9.N6qFEIXSha68Osvk9vvMsGehsspWrVKjXDiuWD2CIRQ",
//学生
// token:"eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0ODk5MDg0MjMsInN1YiI6IntcImlkXCI6NSxcImVtYWlsXCI6XCJzb21lQDEyNi5jb21cIn0ifQ.Z0bhO2KVRnn2I_-ZDHqcqyDwOY_pLJIyiFHumNOjw6E",

    //  userInfo:{
    //         userId:1,
    //         username:"Anna",
    //         studentNo:"1352875",
    //         isTeacher:true
    //  },
    //userInfoDetail
    // "avatar_14.jpg"
    // email:"593880978@qq.com"
    // id:6
    // introduction:""
    // name:"anna"
    // password:""
    // school:""
    // student_id:1352875
    // type:1
     url: "https://tinanyway.me/weike/wx",
     token: "",
     appid: "wx5761aea4e548362c",
     appsecret: "b6f9c59d06c3731a3bd1c28bcaf7af24"
  }
})