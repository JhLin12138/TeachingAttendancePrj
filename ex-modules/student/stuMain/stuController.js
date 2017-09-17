
"use strict";

angular.module("student")
    .controller("stuCtrl",
        ["$scope","$rootScope","$location","$window","$http",
            function($scope,$rootScope,$location,$window,$http){(
                function () {

                    // console.log($rootScope.user);
                    if(!$rootScope.user){
                        $location.path("/login");
                    }
                    else{
                        $("[data-toggle='tooltip']").tooltip();
                        updateSignCnt($rootScope.user.stuno);
                        loadCourse ();
                    }
                })();


                $scope.lateCnt = 0;
                $scope.absenceCnt = 0;
                $scope.normalCnt = 0;
                $scope.user = $rootScope.user;

                this.lateCnt = $scope.lateCnt;
                this.absenceCnt = $scope.absenceCnt;
                this.normalCnt = $scope.normalCnt;

                /**
                 * 加载当天课程信息
                 */
                function loadCourse () {
                    var classday = new Date().getDay();
                    console.log(classday);
                    $http({
                        method:"GET",
                        url:"http://localhost/v1/course/"+classday
                    }).then(function (resp) {
                        console.log(resp);
                        $scope.$applyAsync(function() {
                            $scope.courses = resp.data;
                        });
                    })
                }

                $scope.quitSys = function(){
                    if($window.confirm("您确定要退出系统吗?")){
                        $rootScope.user = "";
                        $location.path("/login");
                    }

                };

                /**
                 * 从数据库读取考勤次数用于界面显示
                 * @param stuno
                 */
                function updateSignCnt(stuno) {
                    $http({
                        method:"GET",
                        url:"http://localhost/v1/stu/signin/"+stuno
                    }).then(function (resp) {
                        console.log(resp.data.result);
                        $scope.$applyAsync(function() {
                            $scope.absentCnt = resp.data.result.absentcnt;
                            $scope.normalCnt = resp.data.result.normalcnt;
                            $scope.lateCnt = resp.data.result.latecnt;
                        });
                    })
                }




    }]);