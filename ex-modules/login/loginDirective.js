"use strict";

angular.module("login")
    .directive("login",function () {
        return{
            restrict:"AE",
            scope:{
                btnStyle:"@"
            },
            templateUrl:"ex-modules/login/loginTemplate.html",
            replace:true,
            controller:"loginCtrl",
            link:function (scope,el,attrs,ctrl) {
                scope.identify = "1";
            }
        }
    });