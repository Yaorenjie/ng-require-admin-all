/**
 * Created by Feng on 2016/11/16.
 */
define(['app'],function(app){
    app.controller('mainController', ['$scope','$location','commonService',function($scope,$location,commonService) {//方法2定义全局变量
        if(commonService.getValue().token == "" || commonService.getValue().token == null || commonService.getValue().token == "null"){
            location.href="login.html";
        }
    }]);
});