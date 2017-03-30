var app = getApp()
Page({
  data: {
    loadingHint: "加载中...",
    loadingBtnHidden: false,
    bindClass: "hiddenControlClass",
    loginClass: "hiddenControlClass",

    id_token:'',//方便存在本地的locakStorage
    response:'' //存取返回数据

  },
  onLoad: function() {
    console.log('onLoad');
    this.useWxApiToGetInfo(this);
    //this.loadingControl(true, 0);
  },
  //wx api
  useWxApiToGetInfo: function(that) {
    //调用登录接口
    wx.login({
      success: function (res) {
        //获取个人信息
        wx.getUserInfo({
          success: function (res) {
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
              //检测是否已绑定
              app.globalData.openid = res.data.openid;
              that.checkAccount(res.data.openid);
          },
          fail: function() {
              console.log("openid fail")
          },
          complete: function() {}
        })
      }
    })
  },
  //绑定学号 按钮事件
  bindStudentNoFormSubmit: function(e){
    console.log('bindStudentNoFormSubmit');
  },
  //检查是否已绑定
  checkAccount: function(openid){
    var url = app.globalData.url + "/account"
      + "?wechat_id=" + openid;
    console.log("send get request: " + url);
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET', 
      success: function(res){
        console.log(res);
        if (res.data.result == "fail") {
          that.loadingControl(true, 0);
        } else {
          console.log("redirect");
          that.loadingControl(true, 3);
          app.globalData.userInfoDetail = res.data.user;
          wx.switchTab({
            url: '../courses/courses',
            fail:function(res){
              console.log("fail");
            },
            success:function(){
              console.log("success");
            }
          })
        }
      },
      fail: function() {
        console.log("checking account fail")
      },
      complete: function() {}
    })
  },
  //检查帐号密码
  login: function(e) {
    var url = app.globalData.url + "/token";
    console.log("send post request: " + url);
    var that = this;
    that.loadingControl(false, 0);
    wx.request({
      url: url,
      data: {
        "userEmail": e.detail.value.userEmail,
        "password": e.detail.value.userPw
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST', 
      success: function(res){
        if (res.data.result == "fail") {
          that.loadingControl(true, 0);
          //提示请重试
          wx.showToast({
            title: '邮箱密码错误，请重试',
            icon: 'loading',
            duration: 2000
          })
        } else {
          that.loadingControl(true, 1);
          app.globalData.token = res.data.token;
        }
      },
      fail: function() {
        that.loadingControl(true, 0);
        //提示请重试
        wx.showToast({
          title: '请重试',
          icon: 'loading',
          duration: 2000
        })
      }
    })
  },
  //绑定学号
  bindAccount: function(e) {
    var url = app.globalData.url + "/account";
    console.log("send post request: " + url);
    var that = this;
    wx.request({
      url: url,
      data: {
        "wechat_id": app.globalData.openid,
        "student_id": e.detail.value.studentNo
      },
      method: 'POST', 
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": app.globalData.token
      },
      success: function(res){
        console.log(res);
        if (res.data.result == "fail") {
          //提示请重试
          wx.showToast({
            title: '绑定失败，请重试',
            icon: 'loading',
            duration: 2000
          })
        } else {
          console.log("redirect");
          app.globalData.userInfoDetail = res.data.user;
          wx.switchTab({
             url: '../courses/courses'
           });
        }
      },
      fail: function() {
        console.log("checking account fail");
        //提示请重试
        wx.showToast({
          title: '绑定失败，请重试',
          icon: 'loading',
          duration: 2000
        })
      }
    })
  },
  //loading
  loadingControl: function(boo, num) {
    this.setData({
      loadingBtnHidden: boo,
      bindClass: boo && num==1 ? "" : "hiddenControlClass",
      loginClass: boo && num==0 ? "" : "hiddenControlClass",
    })
  }
})