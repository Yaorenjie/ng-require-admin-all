/**
 * Created by Administrator on 2017/2/27.
 */
/**
 * Created by Administrator on 2017/1/5.
 */
define(['app','signCustomerService'],function(app){
    app.controller('signCustomerInfoController', ['$scope','$q','$http','signCustomerService','commonService',function($scope,$q,$http,signCustomerService,commonService) {
        $scope.pageClass = 'page-about';
        $scope.none = false;
        $scope.data = {};
        $scope.id= getQueryString("id");
        $scope.ifJb = true;
        $scope.ifyw = true;

        $scope.localData ={};
        var type = 1,sysUserId = "",name="",remark="",cityId="",countyId="";

        if(commonService.getValue().token == "" || commonService.getValue().token == null || commonService.getValue().token == "null"){
         location.href="login.html";
         }

        getInfo();
        $scope.code = "510000";

        findRegionByCode();
        function findRegionByCode() {
            commonService.findRegionByCode( $scope.code,commonService.getValue().token).then(function(data) {
                if(data == "" || data == null || data == "null"){
                    location.href="login.html";
                }
                if(data.code == 0){
                    $scope.cityList = data.data;
                }else {
                    common.mask.errorHit(data.msg)
                }
            }, function(data) {
                common.mask.errorHit("请刷新")
            });
        }
        $scope.cityChange = function () {
            if($scope.data.cityId != ""){
                commonService.findRegionByCode( $scope.data.cityId,commonService.getValue().token).then(function(data) {
                    if(data == "" || data == null || data == "null"){
                        location.href="login.html";
                    }
                    if(data.code == 0){
                        $scope.countyList = data.data;
                        $scope.data.countyId = data.data[0].code;
                    }else {
                        common.mask.errorHit(data.msg);
                    }
                }, function(data) {
                    common.mask.errorHit("请刷新")
                });
            }else{
                $scope.data.countyId = "";
            }
        }
        commonService.customerService(commonService.getValue().token).then(function(data) {
            if(data == "" || data == null || data == "null"){
                location.href="login.html";
            }
            if(data.code == 0){
                $scope.kfList = data.data;
            }else {
                common.mask.errorHit(data.msg)
            }
        }, function(data) {
            common.mask.errorHit("请刷新")
        });

        $scope.jbBtn = function(bool,bo){
            $scope.ifJb = bool;
            if(bool){
                if(bo){
                    if($scope.data.name == ""){
                        common.mask.errorHit("客户名称不能为空")
                    }else {
                        type = 1;
                        updata();
                        getInfo();
                    }
                }
                $(".disabledJb").attr("disabled","disabled");
            }else{
                $(".disabledJb").removeAttr("disabled");

            }
        };
        $scope.ywBtn = function(bool,bo){
            $scope.ifyw = bool;
            if(bool){
                if(bo){
                    type = 2;
                    updata();
                    getInfo();
                }
                $(".disabledyw").attr("disabled","disabled");
            }else{
                $(".disabledyw").removeAttr("disabled");

            }
        };


        function updata(){
            if(type == 1){
                common.mask.loadingRem();
                console.log(sysUserId);
                signCustomerService.update($scope.id,commonService.getValue().token,$scope.data.name,$scope.data.remark,sysUserId,$scope.data.cityId,$scope.data.countyId).then(function(data) {
                    if(data == "" || data == null || data == "null"){
                        location.href="login.html";
                    }
                    if(data.code == 0){
                        common.mask.sucessHint("成功");
                    }else {
                        common.mask.errorHit(data.msg)
                    }
                    getInfo();
                    common.mask.loadingAdd();
                }, function(data) {
                    common.mask.errorHit("请刷新");
                    getInfo();
                    common.mask.loadingAdd();
                });
            }else if(type == 2){
                common.mask.loadingRem();
                signCustomerService.update($scope.id,commonService.getValue().token,name,remark,$scope.data.sysUserId,cityId,$scope.localData.countyId).then(function(data) {
                    if(data == "" || data == null || data == "null"){
                        location.href="login.html";
                    }
                    if(data.code == 0){
                        common.mask.sucessHint("成功");
                    }else {
                        common.mask.errorHit(data.msg)
                    }
                    getInfo();
                    common.mask.loadingAdd();
                }, function(data) {
                    common.mask.errorHit("请刷新");
                    getInfo();
                    common.mask.loadingAdd();
                });

            }

        }
        function getInfo(){
            common.mask.loadingRem();
            signCustomerService.get($scope.id,commonService.getValue().token).then(function(data) {
                if(data == "" || data == null || data == "null"){
                    location.href="login.html";
                }
                if(data.code == 0){
                    $scope.data = data.data;
                    name =  data.data.name;
                    remark = data.data.remark;
                    cityId = data.data.cityId;
                    countyId = data.data.countyId;
                    sysUserId = data.data.sysUserId;
                    if(data.data.cityId != ""){
                        commonService.findRegionByCode( data.data.cityId,commonService.getValue().token).then(function(data) {
                            if(data == "" || data == null || data == "null"){
                                location.href="login.html";
                            }
                            if(data.code == 0){
                                $scope.countyList = data.data;
                            }else {
                                common.mask.errorHit(data.msg)
                            }
                        }, function(data) {
                            common.mask.errorHit("请刷新")
                        });
                    }
                }else {
                    common.mask.errorHit(data.msg);
                }
                common.mask.loadingAdd();
            }, function(data) {
                common.mask.errorHit("请刷新");
                common.mask.loadingAdd();
            });

        }


        function getQueryString(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            if(window.location.hash.split("?").length == 1 ){
                return null;
            }
            var r = window.location.hash.split("?")[1].match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        };

    }]);
});