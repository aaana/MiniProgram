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
            userInfo:app.globalData.userInfo
        })
    },
    onShow:function(){
        console.log("courses onshow invoked");
        var that = this;
        this.setData({
            loadingHidden:false
        })
        //todo 从服务器获取数据 userid->courses
        wx.request({
          url: app.globalData.url+'/course',
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
        this.setData({
            unreadMessageCount:2,
            // courseList : [
            //     {
            //         courseId:1,
            //         courseName:"数据结构",
            //         teacherName:"张颖",
            //         num:50,
            //         createDate:"2016-01-01",             
            //         modifyDate:"2016-01-01",
            //         isIn:true,
            //         unreadCount:3
            //     },{
            //         courseId:2,
            //         courseName:"算法",
            //         teacherName:"徐燕凌",
            //         num:50,
            //         createDate:"2016-01-01",
            //         modifyDate:"2016-01-01",
            //         isIn:true
            //     },{
            //         courseId:2,
            //         courseName:"算法",
            //         teacherName:"徐燕凌",
            //         num:50,
            //         createDate:"2016-01-01",
            //         modifyDate:"2016-01-01"
            //     },{
            //         courseId:2,
            //         courseName:"算法",
            //         teacherName:"徐燕凌",
            //         num:50,
            //         createDate:"2016-01-01",
            //         modifyDate:"2016-01-01"
            //     },{
            //         courseId:2,
            //         courseName:"算法",
            //         teacherName:"徐燕凌",
            //         num:50,
            //         createDate:"2016-01-01",
            //         modifyDate:"2016-01-01"
            //     },{
            //         courseId:2,
            //         courseName:"算法",
            //         teacherName:"徐燕凌",
            //         num:50,
            //         createDate:"2016-01-01",
            //         modifyDate:"2016-01-01"
            //     },{
            //         courseId:2,
            //         courseName:"算法",
            //         teacherName:"徐燕凌",
            //         num:50,
            //         createDate:"2016-01-01",
            //         modifyDate:"2016-01-01"
            //     },{
            //         courseId:2,
            //         courseName:"算法",
            //         teacherName:"徐燕凌",
            //         num:50,
            //         createDate:"2016-01-01",
            //         modifyDate:"2016-01-01"
            //     },{
            //         courseId:2,
            //         courseName:"算法",
            //         teacherName:"徐燕凌",
            //         num:50,
            //         createDate:"2016-01-01",
            //         modifyDate:"2016-01-01"
            //     }
            // ],
        });
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
                pickerDisabled:inputVal===''?false:true
            })

        //todo获取已加入班级和未加入班级
        // wx.request({
        //   url: 'https://URL',
        //   data: {
        //     userId:userId,
        //     inputVal:inputVal,
        //     option:that.data.index
        //   },
        //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        //   // header: {}, // 设置请求的 header
        //   success: function(res){
        //     // success
        //   },
        //   fail: function() {
        //     // fail
        //   },
        //   complete: function() {
        //     // complete
        //   }
        // })
        this.setData({
            inputVal: e.detail.value,
            //应该被注释
            searchedCourseListIn:[
                {
                    courseId:2,
                    courseName:e.detail.value,
                    isIn:true
                }
            ],
                searchedCourseListNotIn:[
                {
                    courseId:2,
                    courseName:"aaa",
                    isIn:false
                }
            ],
            loadingHidden:false
        });
        
        console.log(this.data.inputVal);
        // if(this.data.inputVal === ''){
        //     this.setData({
        //         courseList:this.data.allCourseList
        //     })
        // }
        // 从服务器获取数据 todo
        wx.request({
          url: '',
          data: {
              userId:userId,
              courseName:e.detail.value,
              option:this.data.index
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            console.log("succeed");
            that.setData({
                    searchedCourseListIn:[{
                    courseId:2,
                    courseName:e.detail.value,
                    isIn:true
                    }
                ],
                searchedCourseListNotIn:[{
                    courseId:2,
                    courseName:"aaa",
                    isIn:false
                    }
                ],
                });
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
            that.setData({
                loadingHidden:true
            })
          }
        })
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
                          url: 'https://URL',
                          data: {
                              courseId:courseId,
                              userId:userId
                          },
                          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                          // header: {}, // 设置请求的 header
                          success: function(res){
                            // success
                            wx.showToast({
                                title: '加入成功',
                                icon: 'success',
                                duration: 2000
                                })
                            wx.navigateTo({
                    url: '../course/course?courseId='+courseId+'&&courseName='+courseName})
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