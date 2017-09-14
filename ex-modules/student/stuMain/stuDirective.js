
"use strict";

angular.module("student")
    .directive("stuMain",function(){
        return {
            restrict:"AE",
            replace:true,
            controller:"stuCtrl",
            templateUrl:"ex-modules/student/stuMain/stuMainTemplate.html"
        }
});