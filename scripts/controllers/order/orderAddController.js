
define(['app','orderService'],function(app){
    app.controller('orderAddController', ['$scope','$q','$http','orderService','commonService',function($scope,$q,$http,orderService,commonService) {
        $scope.pageClass = 'page-about';

           if(commonService.getValue().token == "" || commonService.getValue().token == null || commonService.getValue().token == "null"){
         location.href="login.html";
         }
        $scope.data = {

        };
        $scope.taxType = "1";
        $scope.casual = {
            name:"",
            phone:"",
            id:"",
            cityName:"",
            countyName:""
        };
        $scope.giveServiceId = "";
        findCasualUser();
        package();
        findAllGiveService();
        function findCasualUser(){
            commonService.findCasualUser($scope.casual.name,commonService.getValue().token).then(function(data) {
                if(data == "" || data == null || data == "null"){
                    location.href="login.html";
                }
                if(data.code == 0){
                    $scope.listData = data.data;
                }else {
                    common.mask.errorHit(data.msg)
                }
            }, function(data) {
                common.mask.errorHit("请刷新")
            });
        }
        function package(){
            commonService.package(commonService.getValue().token).then(function(data) {
                if(data == "" || data == null || data == "null"){
                    location.href="login.html";
                }
                if(data.code == 0){
                    $scope.inList = data.data;
                }else {
                    common.mask.errorHit(data.msg)
                }
            }, function(data) {
                common.mask.errorHit("请刷新")
            });
        }
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
        $scope.searchName = function(){
            findCasualUser();
        };
        $scope.ulIf = false;
        $scope.ulNone = function(index){
            if(index == 1){
                $scope.ulIf = true;
            }else if(index == 2){
                $scope.ulIf = false;
                $(".ip-se-yyy").blur();
            }
        };
        $(".select-yyy").on("mouseover","li",function(){
            $(this).addClass("active").siblings().removeClass("active");
        });
        $scope.liClick = function(index,list){
            $scope.customerName =  $scope.listData[index];
            $scope.ulIf = false;
            $scope.casual = list;
        };





        $scope.save = function(){
            if($scope.price == "" || $scope.serviceId == "" || $scope.casual.id == "" ){
                common.mask.errorHit("请填写全部信息")
            }else if(!common.validate.price($scope.price)){
                common.mask.errorHit("请正确填写价格")
            } else {
                add ()
            }
        };
        function add () {
            common.mask.loadingRem();
            orderService.add($scope.price,$scope.serviceId,commonService.getValue().token , $scope.casual.id,$scope.giveServiceId).then(function(data) {
                if(data == "" || data == null || data == "null"){
                    location.href="login.ht ml";
                }
                if(data.code == 0){
                    common.mask.sucessHint("成功");
                    setNull();
                }else {
                    common.mask.errorHit(data.msg);
                }
                common.mask.loadingAdd();
            }, function(data) {
                common.mask.loadingAdd();
                common.mask.errorHit("请刷新")
            });
        }
        $scope.qx = function(){
            setNull();
        };
        function setNull(){
            $scope.price= "";
            $scope.serviceId = "";
            $scope.casual = {
                name:"",
                phone:"",
                id:"",
                cityName:"",
                countyName:""
            };
        }
    }]);
});