"use strict"

angular.module("student")
    .directive("stuSignBtn",function () {
        return {
            restrict: "AE",
            replace: true,
            controller: "stuSignBtnCtl",
            require:"^stuMain",
            templateUrl: "ex-modules/student/stuSignBtn/stuSignBtnTemplate.html",
            link: function (scope, el, attrs, ctrl) {

                var now = new Date();

                setCourseState(now);

                /**
                 * 设置当前课程状态
                 * @param now
                 */
                function setCourseState(now) {
                    var nowTime = now.getTime();
                    console.log(scope.getCourseTime(scope.course.begintime).getTime());
                    console.log(nowTime);
                    if(nowTime<scope.getCourseTime(scope.course.begintime).getTime()){
                        scope.signState = "未开始";
                    }
                    else if(nowTime>scope.getCourseTime(scope.course.begintime).getTime()&&nowTime<scope.getCourseTime(scope.course.endtime).getTime()){
                        //scope.signState = "迟到";
                        scope.state = 2;
                    }
                    else if(nowTime>scope.getCourseTime(scope.course.endtime).getTime()){
                        scope.signState = "缺勤";
                        scope.state = 3;
                    }
                    else if(nowTime>=scope.getCourseTime(scope.course.begintime)-15*60*1000 && nowTime<=scope.getCourseTime(scope.course.begintime)){
                        scope.signState = "待签到";
                        scope.state = 0;
                    }

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

                    if(scope.signState==="未开始"){

                        alert("课程未开始签到");
                    }
                    if(scope.state==1){
                        alert("请勿重复签到！");
                    }

                    if(scope.signState==="待签到"){
                        var password = prompt("请输入签到密码：");
                        if(password===scope.course.password){
                            //ctrl.updateSignCnt($rootScope.user.stuno,scope.signStatus);
                            scope.signState = "已签到(正常)  签到时间 "+signtime;

                            scope.state = 1;//0:待签到 1:已签到 2: 迟到 3 缺勤
                        }
                    }
                    if(scope.state==2){
                        var password = prompt("请输入签到密码：");
                        console.log(scope.course.password);
                        if(password===scope.course.password){
                            //ctrl.updateSignCnt($rootScope.user.stuno,scope.signStatus);
                            scope.signState = "已签到(迟到)  签到时间"+signtime;
                            scope.state = 1;//0:已签到 1:待签到 2: 迟到 3 缺勤
                            console.log(signtime);

                        }
                    }
                    if(scope.signState==="缺勤"){
                        alert("已过签到时间！请准时签到..");
                    }

                })

            }
        }
    });