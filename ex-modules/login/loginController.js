"use strict";

angular.module("login")
    .controller("loginCtrl",
        ["$scope",'$http',"$location","$rootScope",
            function($scope,$http,$location,$rootScope){
        $scope.isLogined = false;
        $scope.errormsg = "";

        $scope.loginCheck = function(){
            var username = $scope.username;
            var password = $scope.password;
            var identify = $scope.identify;

            if(!$scope.username){
                $scope.errormsg = "用户名不能为空";
                return;
            }
            if(!$scope.password){
                $scope.errormsg = "密码不能为空";
                return ;
            }
            $http({
                method:"GET",
                url:"http://localhost/v1/stu/"+$scope.username
            }).then(
                function(resp){
                    console.log(resp.data.result);
                    if(resp.data.result!==1) {
                        var stu = resp.data.result;
                        if (typeof stu != "undefined") {
                            if (stu.stuno === username && stu.password === password) {
                                $rootScope.user = stu;
                                $location.path("/stuMain");
                            }
                        }
                    }
                },
                $scope.$applyAsync(function() {
                    $scope.errormsg = "用户名或密码或身份错误！";
                })
            );
        }


    }]);