"use strict"

angular.module("student")
    .directive("stuSignBtn",function () {
        return {
            restrict: "AE",
            replace: true,
            controller: "stuSignBtnCtl",
            templateUrl: "ex-modules/student/stuSignBtn/stuSignBtnTemplate.html",
            link: function (scope, el, attrs, ctrl) {

                var now = new Date();

                setCourseState(now);

                function setCourseState(now) {
                    var nowTime = now.getTime();
                    console.log(scope.getCourseTime(scope.course.begintime).getTime());
                    console.log(nowTime);
                    if(nowTime<scope.getCourseTime(scope.course.begintime).getTime()){
                        scope.signState = "未开始";
                    }
                    else if(nowTime>scope.getCourseTime(scope.course.begintime).getTime()&&nowTime<scope.getCourseTime(scope.course.endtime).getTime()){
                        scope.signState = "迟到";
                    }
                    else if(nowTime>scope.getCourseTime(scope.course.endtime).getTime()){
                        scope.signState = "缺勤";
                    }
                    else if(nowTime>=scope.getCourseTime(scope.course.begintime)-15*60*1000 && nowTime<=scope.getCourseTime(scope.course.begintime)){
                        scope.signState = "正常签到";
                    }
                    $(el).find("button").on("click",function () {
                        var now =  new Date();
                        var hours = "";
                        var minute = "";
                        var signintime = now.getYear()+"-"+now.getMonth()+1+"-"+now.getDate();

                        if(now.getHours()<10){
                            hours = "0"+now.getHours();
                        }else{
                            hours = now.getHours();
                        }
                        if(now.getMinutes()<10){
                            minute = "0"+now.getMinutes();
                        }else{
                            minute = now.getMinutes();
                        }
                        var signtime = hours+":"+minute;

                        if(scope.signStatus==="未开始"){

                            $window.alert("课程未开始签到");
                        }

                        if(scope.signStatus==="正常签到"){
                            var password = prompt("请输入签到密码：");
                            if(password===scope.course.password){
                                // console.log(scope.$parent);
                                //ctrl.updateSignCnt($rootScope.user.stuno,scope.signStatus);
                                scope.signStatus = "已签到";
                                scope.signMark = "(正常)  签到时间 "+signtime;
                                scope.status = 1;                  //1正常签到 -1缺勤  2迟到
                            }
                        }
                        if(scope.signStatus==="迟到"){
                            var password = prompt("请输入签到密码：");
                            if(password===scope.course.password){
                                // console.log(scope.$parent);
                                //ctrl.updateSignCnt($rootScope.user.stuno,scope.signStatus);
                                scope.signStatus = "已签到";
                                scope.signMark = "(迟到)  签到时间 "+signtime;
                                scope.status = 1;                  //1正常签到 -1缺勤  2迟到
                            }
                        }
                        if(scope.signStatus==="缺勤"){
                            $window.alert("已过签到时间！请准时签到..");
                        }

                    })
                }

            }
        }
    });