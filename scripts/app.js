/**
 * 建立angular.module
 */
define([
    'angular',
], function (angular) {
    var app = angular.module('pinganApp', ['ngRoute','ngResource','ngSanitize']);
    app.filter("ydate",function(){
        return function(date){
            var out = date.substring(0,19);
            return out;
        }
    });
    app.filter("trustHtml",function($sce){
        return function (input) {
            return $sce.trustAsHtml(input);
        }
    });
    return app;
});
