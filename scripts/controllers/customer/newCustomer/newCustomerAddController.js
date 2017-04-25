/**
 * Created by Administrator on 2017/1/5.
 */
define(['app','newCustomerService'],function(app){
    app.controller('newCustomerAddController', ['$scope','$q','$http','newCustomerService','commonService',function($scope,$q,$http,newCustomerService,commonService) {
        $scope.pageClass = 'page-about';

           if(commonService.getValue().token == "" || commonService.getValue().token == null || commonService.getValue().token == "null"){
         location.href="login.html";
         }
        $scope.name = "";
        $scope.phone = "";
        $scope.remark = "";
        $scope.wishLevel = "0";
        $scope.wishServiceId = "";
        $scope.sysUserId = commonService.getValue().id;
        $scope.city = "1";
        $scope.county = "1";
        $scope.cityList = [];
        $scope.countyList = [];

        $scope.code = "510000";
        findRegionByCode();
        function findRegionByCode() {
            commonService.findRegionByCode( $scope.code,commonService.getValue().token).then(function(data) {
                if(data == "" || data == null || data == "null"){
                    location.href="login.html";
                }
                if(data.code == 0){
                    $scope.cityList = data.data;
                    $scope.city = data.data[0].code;
                    commonService.findRegionByCode(  $scope.city,commonService.getValue().token).then(function(data) {
                        if(data == "" || data == null || data == "null"){
                            location.href="login.html";
                        }
                        if(data.code == 0){
                            $scope.countyList = data.data;
                            $scope.county = data.data[0].code;
                        }else {
                            common.mask.errorHit(data.msg)
                        }
                    }, function(data) {
                        common.mask.errorHit("请刷新")
                    });
                }else {
                    common.mask.errorHit(data.msg)
                }
            }, function(data) {
                common.mask.errorHit("请刷新")
            });
        }
        $scope.cityChange = function () {
            if($scope.city != ""){
                $scope.code = $scope.city;
                commonService.findRegionByCode( $scope.code,commonService.getValue().token).then(function(data) {
                    if(data == "" || data == null || data == "null"){
                        location.href="login.html";
                    }
                    if(data.code == 0){
                        $scope.countyList = data.data;
                        $scope.county = data.data[0].code;
                    }else {
                        common.mask.errorHit(data.msg);
                    }
                }, function(data) {
                    common.mask.errorHit("请刷新")
                });
            }else{
                $scope.county = "";
            }
        }

        $scope.save = function(){
            if( $scope.phone == "" || $scope.name == ""){
                common.mask.errorHit("请填写全部内容");
            }else {
                add();
            }
        };
        function add() {
            common.mask.loadingRem();
            newCustomerService.add(commonService.getValue().token, $scope.phone,$scope.name, $scope.remark,$scope.wishLevel, $scope.wishServiceId, $scope.sysUserId,$scope.city,$scope.county).then(function(data) {
                if(data == "" || data == null || data == "null"){
                    location.href="login.html";
                }
                if(data.code == 0){
                    common.mask.sucessHint("成功");
                    setNull();
                }else {
                    common.mask.errorHit(data.msg);
                }
                common.mask.loadingAdd();
            }, function(data) {
                common.mask.errorHit("请刷新");
                common.mask.loadingAdd();
            });
        }

        $scope.qx = function(){
            setNull();
        };
        commonService.package(commonService.getValue().token).then(function(data) {
            if(data == "" || data == null || data == "null"){
                location.href="login.html";
            }
            if(data.code == 0){
                $scope.tcList = data.data;
            }else {
                common.mask.errorHit(data.msg)
            }
        }, function(data) {
            common.mask.errorHit("请刷新")
        });

        commonService.customerService(commonService.getValue().token).then(function(data) {
            common.mask.loadingRem();
            if(data == "" || data == null || data == "null"){
                location.href="login.html";
            }
            if(data.code == 0){
                $scope.kfList = data.data;
            }else {
                common.mask.errorHit(data.msg)
            }
            common.mask.loadingAdd();
        }, function(data) {
            common.mask.errorHit("请刷新");
            common.mask.loadingAdd();
        });


        function setNull (){
            $scope.name = "";
                $scope.phone = "";
                $scope.remark = "";
                $scope.wishLevel = "1";
                $scope.wishServiceId = "";
                $scope.sysUserId = ""
        }

    }]);
});