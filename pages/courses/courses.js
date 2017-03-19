Page({
    data: {
        inputShowed: false,
        inputVal: "",
        courseList:[],
        allCourseList:[],
        options:["课程","老师"],
        index:0
    },
    onLoad:function(){
        //从服务器获取数据 userid->courses
        this.setData({
            courseList : [
                {
                    courseId:1,
                    courseName:"数据结构"
                },{
                    courseId:2,
                    courseName:"算法"
                }
            ],
        });
        this.setData({
            allCourseList:this.data.courseList
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
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        var that = this;
        console.log("input:"+e.detail.value);
        this.setData({
            inputVal: e.detail.value,
            courseList:[{
                courseId:2,
                courseName:e.detail.value
                }
            ]
        });
        console.log(this.data.inputVal);
        if(this.data.inputVal === ''){
            this.setData({
                courseList:this.data.allCourseList
            })
        }
        // wx.request({
        //   url: '',
        //   data: {
        //       courseName:e.detail.value
        //   },
        //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        //   // header: {}, // 设置请求的 header
        //   success: function(res){
        //     // success
        //     console.log("succeed");
        //     that.setData({
        //             courseList : [
        //                 {
        //                     courseId:1,
        //                     courseName:"数据结构"
        //                 }
        //             ]
        //         });
        //   },
        //   fail: function() {
        //     // fail
        //   },
        //   complete: function() {
        //     // complete
        //   }
        // })
    },
    bindPickerChange:function(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
        index: e.detail.value
    })
    }
});