/**
 * Created by Administrator on 2017/1/5.
 */
define(['app','companyService'],function(app){
    app.controller('companyInfoController', ['$scope','$q','$http','companyService','commonService',function($scope,$q,$http,companyService,commonService) {
        $scope.pageClass = 'page-about';

          if(commonService.getValue().token == "" || commonService.getValue().token == null || commonService.getValue().token == "null"){
         location.href="login.html";
         }

        $scope.btn = true;
        $scope.taxpayerType = "";
        $scope.companyName = "";
        $scope.id= getQueryString("id");
        getInfo();
        industry();
        function getInfo(){
            common.mask.loadingRem();
            companyService.get( $scope.id, commonService.getValue().token).then(function(data) {
                console.log(data);
                if(data == "" || data == null || data == "null"){
                    location.href="login.html";
                }
                if(data.code == 0){
                    data.data.taxType = data.data.taxType.toString();
                    data.data.trade = data.data.trade.toString();
                    $scope.data = data.data;
                }else {
                    common.mask.errorHit(data.msg)
                }
                common.mask.loadingAdd();
            }, function(data) {
                common.mask.errorHit("请刷新");
                common.mask.loadingAdd();
            });
        }
        function industry(){
            commonService.industry(commonService.getValue().token).then(function(data) {
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
        $scope.bj = function(){
           $(".disabled").removeAttr("disabled");
            $scope.btn = false;
        };
        $scope.bc = function(bool){
            if(bool){
                if($scope.data.name == ""){
                    common.mask.errorHit("公司名称不能为空")
                }else {
                    update();
                }

            }
            $(".disabled").attr("disabled","disabled");
            $scope.btn = true;
        };
        function update() {
            common.mask.loadingRem();
            companyService.update($scope.id,$scope.data.name,$scope.data.taxType,commonService.getValue().token,$scope.data.trade,$scope.data.code).then(function(data) {  // 调用承诺API获取数据 .resolve
                common.mask.loadingAdd();
                if(data.code == 0){
                    common.mask.sucessHint("修改成功");
                }else{
                    common.mask.errorHit("修改失败")
                }
            }, function(data) {  // 处理错误 .reject
                common.mask.loadingAdd();
                common.mask.errorHit("服务器忙，请刷新");
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