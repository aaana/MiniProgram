var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    id_token:'',//方便存在本地的locakStorage
    response:'' //存取返回数据
  },
  onLoad: function() {
    console.log('onLoad');
    var that = this
    //调用登录接口
    wx.login({
      success: function (res) {
        console.log("1");
        console.log(res);

        //获取个人信息
        wx.getUserInfo({
          success: function (res) {
            console.log("2");
            console.log(res);
            app.globalData.WxUserInfo = res.userInfo
            that.setData({
                userInfo: res.userInfo
            })
          }
        })

        //获取openid
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            "appid": app.globalData.appid,
            "secret": app.globalData.appsecret,
            "js_code": res.code,
            "grant_type": "authorization_code"
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'POST', 
          success: function(res){
              console.log(res)
          },
          fail: function() {
              console.log("openid fail")
          },
          complete: function() {}
        })
      }
    })




    },
    bindStudentNoFormSubmit: function(e){
        console.log('bindStudentNoFormSubmit');
    }
})