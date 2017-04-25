/**
 * Created by Administrator on 2017/1/5.
 */
define(['app','companyService'],function(app){
    app.controller('companyAddController', ['$scope','$q','$http','companyService','commonService',function($scope,$q,$http,companyService,commonService) {
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
        findCasualUser();
        industry();
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

        function industry(){
            commonService.industry(commonService.getValue().token).then(function(data) {
                if(data == "" || data == null || data == "null"){
                    location.href="login.html";
                }
                if(data.code == 0){
                    $scope.inList = data.data;

                    $scope.trade = data.data[0].code.toString();

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
            if($scope.name == "" || $scope.casual.id == ""){
                common.mask.errorHit("请填写公司和客户名称");
            }else {
                add();
            }
        };
        function add() {
            common.mask.loadingRem();
            companyService.add($scope.code,$scope.name, $scope.taxType,commonService.getValue().token ,$scope.trade, $scope.casual.id).then(function(data) {
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
                common.mask.loadingAdd();
                common.mask.errorHit("请刷新")
            });
        }
        function setNull(){
            $scope.code= "";
            $scope.name = "";
            $scope.taxType = "1";
            $scope.trade = "";
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