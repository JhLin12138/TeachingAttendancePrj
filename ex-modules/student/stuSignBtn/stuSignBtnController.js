"use strict"

angular.module("student")
    .controller("stuSignBtnCtl",["$scope","$rootScope",
        function ($scope,$rootScope) {
            /**
             * 设置课程签到时间
             * time 通过时:分获得时分秒
             */
            $scope.getCourseTime = function(time){

                var courseTime = new Date();
                courseTime.setHours(time.split(":")[0]);
                courseTime.setMinutes(time.split(":")[1]);
                courseTime.setSeconds(0);
                return courseTime;
            }

        }]);