/**
 * Created by Administrator on 2017/1/5.
 */
define(['app','newCustomerService'],function(app){
    app.controller('newCustomerInfoController', ['$scope','$q','$http','newCustomerService','commonService',function($scope,$q,$http,newCustomerService,commonService) {
        $scope.pageClass = 'page-about';

        $scope.tcList =[];
        $scope.none = false;
        $scope.data = {};
        $scope.id= getQueryString("id");
        $scope.ifJb = true;
        $scope.ifYw = true;

        var type = 1,sysUserId = "",name="",remark="",cityId="",countyId="",wishLevel="".wishServiceId="";


        if(commonService.getValue().token == "" || commonService.getValue().token == null || commonService.getValue().token == "null"){
         location.href="login.html";
         }

        getInfo();
        findAllGiveService();
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
        commonService.package(commonService.getValue().token).then(function(data) {
            if(data == "" || data == null || data == "null"){
                location.href="login.html";
            }
            if(data.code == 0){
                $scope.tcLists = data.data;
                $scope.tcListId = data.data[0].id;
                $scope.addYw();
            }else {
                common.mask.errorHit(data.msg)
            }
        }, function(data) {
            common.mask.errorHit("请刷新")
        });

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

        function findAllGiveService() {
            commonService.findAllGiveService(commonService.getValue().token).then(function(data) {
                if(data == "" || data == null || data == "null"){
                    location.href="login.html";
                }
                if(data.code == 0){
                    $scope.zsList = data.data;
                }else {
                    common.mask.errorHit(data.msg)
                }
            }, function(data) {
                common.mask.errorHit("请刷新")
            });
        }
        $scope.addYw = function(){
            var tc = {
                "index": $scope.tcList.length,
                "value":$scope.tcListId,//11111111111111111111
                "data":""
            };
            $scope.tcList.push(tc);
        };
        $scope.qyBtn = function(bool){
            $scope.none = bool;
        };
        $scope.servicePackIds = [];
        $scope.qytjBtn = function(){
            $scope.servicePackIds = [];
            for(var i = 0;i<$scope.tcList.length;i++){
                var ob = {
                    serviceId:"",
                    giveServiceId:""
                }
                ob.serviceId = $scope.tcList[i].value;
                ob.giveServiceId = $scope.tcList[i].data;
                $scope.servicePackIds.push(ob)
            }
            newCustomerService.sign($scope.id,commonService.getValue().token,JSON.stringify($scope.servicePackIds)).then(function(data) {
                if(data == "" || data == null || data == "null"){
                    location.href="login.html";
                }
                if(data.code == 0){
                    common.mask.sucessHint("成功");
                    $scope.none = false;
                    location.href="index.html#/signCustomerList";
                }else {
                    common.mask.errorHit(data.msg);
                }
            }, function(data) {
                common.mask.errorHit("请刷新")
            });
        };
        $scope.deleteTc = function (index){
             $(".qy-div").children("div").get(index).remove();
            $scope.tcList.splice(index,1)
        };

        $scope.jbBtn = function(bool,bo){
            $scope.ifJb = bool;
            if(bool){
                if(bo){
                    if($scope.data.name == ""){
                        common.mask.errorHit("客户名称不能为空");
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
            $scope.ifYw = bool;
            if(bool){
                if(bo){
                    type = 2;
                    updata();
                    getInfo();
                }
                $(".disabledYw").attr("disabled","disabled");
            }else{

                $(".disabledYw").removeAttr("disabled");
            }

        };
        $scope.jlBtn = function(){
            updata();
            getInfo();
        };

        function updata(){
            if(type==1){
                newCustomerService.update($scope.id,commonService.getValue().token,$scope.data.fellowInfo,$scope.data.name,$scope.data.remark,sysUserId,wishLevel,wishServiceId,$scope.data.cityId,$scope.data.countyId).then(function(data) {
                    if(data == "" || data == null || data == "null"){
                        location.href="login.html";
                    }
                    if(data.code == 0){
                        common.mask.sucessHint("成功");

                    }else {
                        common.mask.errorHit(data.msg);
                    }
                    getInfo();
                }, function(data) {
                    common.mask.errorHit("请刷新")
                    getInfo();
                });
            }else if(type==2){
                newCustomerService.update($scope.id,commonService.getValue().token,$scope.data.fellowInfo,name,remark,$scope.data.sysUserId,$scope.data.wishLevel,$scope.data.wishServiceId,cityId,countyId).then(function(data) {
                    if(data == "" || data == null || data == "null"){
                        location.href="login.html";
                    }
                    if(data.code == 0){
                        common.mask.sucessHint("成功");

                    }else {
                        common.mask.errorHit(data.msg);
                    }
                    getInfo();
                }, function(data) {
                    common.mask.errorHit("请刷新")
                    getInfo();
                });
            }

        }
        function getInfo(){
            common.mask.loadingRem();
            newCustomerService.get($scope.id,commonService.getValue().token).then(function(data) {
                if(data == "" || data == null || data == "null"){
                    location.href="login.html";
                }
                if(data.code == 0){
                    data.data.wishLevel = data.data.wishLevel.toString();
                    $scope.data = data.data;
                    name =  data.data.name;
                    remark = data.data.remark;
                    cityId = data.data.cityId;
                    countyId = data.data.countyId;
                    sysUserId = data.data.sysUserId;
                    wishLevel = data.data.wishLevel;
                    wishServiceId = data.data.wishServiceId;
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