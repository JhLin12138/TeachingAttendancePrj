
"use strict";

angular.module("student")
    .controller("stuCtrl",
        ["$scope","$rootScope","$location","$window",
            function($scope,$rootScope,$location,$window){(
                function () {
                    // console.log("123"+sessionStorage.user);
                    console.log($rootScope.user);
                    if(!$rootScope.user){
                        $location.path("/login");
                    }
                })();


        $scope.lateCnt = 0;
        $scope.absenceCnt = 0;
        $scope.normalCnt = 0;
        $scope.user = $rootScope.user;

        this.lateCnt = $scope.lateCnt;
        this.absenceCnt = $scope.absenceCnt;
        this.normalCnt = $scope.normalCnt;


        $scope.quitSys = function(){
            if($window.confirm("您确定要退出系统吗?")){
                $rootScope.user = "";
                $location.path("/login");
            }

        };


    }]);