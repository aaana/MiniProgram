var app = getApp();
// function poll(that) {
//     setTimeout(function() {
//         that.setData({
//             unreadMessageCount:2
//         })
//         console.log(that.data.unreadMessageCount);
//             // 发起下一次请求
//         poll(that);
//     }, 10000);
// }
Page({
    data: {
        pickerDisabled:false,
        inputShowed: false,
        inputVal: "",
        courseList:[],
        allCourseList:[],
        searchedCourseListIn:[],
        searchedCourseListNotIn:[],
        options:["课程号","课程名称","老师"],
        index:0,
        imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
    ]

    },
    onLoad:function(){
        console.log("courses onload invoked");
        this.setData({
            userInfo:app.globalData.userInfoDetail
        })
    },
    onShow:function(){
        console.log("courses onshow invoked");
        var that = this;
        this.setData({
            loadingHidden:false
        })
        //todo 从服务器获取数据 userid->courses
        this.getCoursesIamIn(this);
        this.getUnreadNum(this);
    },
    getCoursesIamIn:function(that){
         wx.request({
          url:app.globalData.url+'/course',
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              "Authorization":app.globalData.token
          }, // 设置请求的 header
          success: function(res){
            // success
            console.log(res);
            that.setData({
                courseList:res.data.courses,
                loadingHidden:true
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
    getUnreadNum:function(that){
        wx.request({
          url: app.globalData.url+'/unreadMessages/num',
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              "Authorization":app.globalData.token
          }, // 设置请求的 header
          success: function(res){
            // success
            if(res.data.result==="success"){
                that.setData({
                    unreadMessageCount:res.data.unreadMessageNum
                })
            }
        
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false,
            pickerDisabled:false
            // courseList:this.data.allCourseList
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: "",
            // courseList:this.data.allCourseList
            pickerDisabled:false
        });
    },
    inputTyping: function (e) {
        var that = this;
        var inputVal = e.detail.value;
        var userId = this.data.userInfo.userId;
        console.log("input:"+e.detail.value);
        this.setData({
            inputVal: e.detail.value,
            pickerDisabled:inputVal===''?false:true,
            loadingHidden:inputVal===''?true:false
        })
        var searchField = 'id';
        if (that.data.index == 1){
            searchField = 'name'
        }else if(that.data.index == 2){
            searchField = 'tname'
        }   

        var searchedCourseList = [];
        var searchedCourseListIn = [];
        var searchedCourseListNotIn = [];

        //todo获取已加入班级和未加入班级
        wx.request({
          url: app.globalData.url+'/search',
          data: {
            keyWord:inputVal,
            searchField:searchField
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            "Authorization":app.globalData.token,
            "Content-Type":"application/x-www-form-urlencoded"
          }, // 设置请求的 header
          success: function(res){
            // success
            if(res.data.result==='success'){
                searchedCourseList = res.data.courses;
                if(searchedCourseList[0]!=null){
                     for(var i = 0;i<searchedCourseList.length;i++){
                        if(searchedCourseList[i].hasJoined){
                            searchedCourseListIn.push(searchedCourseList[i]);
                        }else{
                            searchedCourseListNotIn.push(searchedCourseList[i]);
                        }
                    }
                }
                that.setData({
                    searchedCourseListIn:searchedCourseListIn,
                    searchedCourseListNotIn:searchedCourseListNotIn,
                    loadingHidden:true
                });
            }
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })     
        console.log(this.data.inputVal);
        // if(this.data.inputVal === ''){
        //     this.setData({
        //         courseList:this.data.allCourseList
        //     })
        // }
    },
    bindPickerChange:function(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
        index: e.detail.value
    })
    },
    createCourseTapped:function(e){
        console.log("createCourseTapped");
        wx.navigateTo({
          url: '../createCourse/createCourse',
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    courseItemTapped:function(e){
        var that = this;
        var isIn = e.currentTarget.dataset.isin;
        var courseId = e.currentTarget.id;
        var courseName = e.currentTarget.dataset.coursename;
        var userId = this.data.userInfo.userId;
        if(!isIn){
            wx.showModal({
                title: '提示',
                content: '你还未加入该班级',
                confirmText:'加入',
                success: function(res) {
                    if (res.confirm) {
                        //todo加入班级
                        wx.request({
                          url: app.globalData.url+'/course/'+courseId+'/joining',
                          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                          header: {
                                "Authorization":app.globalData.token
                          }, // 设置请求的 header
                          success: function(res){
                            // success
                            if(res.data.result==='success'){
                                wx.showToast({
                                    title: '加入成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                            wx.navigateTo({
                    url: '../course/course?courseId='+courseId+'&&courseName='+courseName})
                            }
                            
                          },
                          fail: function() {
                            // fail
                          },
                          complete: function() {
                            // complete
                          }
                        })
                    console.log('用户点击确定')
                    }
                }
            })
        }else{
            wx.navigateTo({
                    url: '../course/course?courseId='+courseId+'&&courseName='+courseName,
                    success: function(res){
                        // success
                    },
                    fail: function() {
                        // fail
                    },
                    complete: function() {
                        // complete
                    }
                    })
        }
      
    },
    deleteCourse:function(){
        var that = this;
        if(this.data.userInfo.type==0){
            var courseId = e.currentTarget.id;
            wx.showModal({
                title: '确认',
                content: '确认删除？',
                success: function(res) {
                    if (res.confirm) {
                        wx.request({
                          url: app.globalData.url+'/course/'+courseId+'/deletion',
                          data: {},
                          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                          header: {
                              'Authorization':app.globalData.token
                          }, // 设置请求的 header
                          success: function(res){
                            // success
                            wx.showToast({
                                title: '删除成功',
                                icon: 'success',
                                duration: 2000
                            })
                            that.getCoursesIamIn(that);
                          },
                          fail: function() {
                            // fail
                          },
                          complete: function() {
                            // complete
                          }
                        })
                    } else if (res.cancel) {
                    console.log('用户点击取消')
                    }
                }
            })
        }
    },
    messageTapped:function(){
        wx.switchTab({
          url: '../personalPage/personalPage',
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
       
    }
});