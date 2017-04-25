/**
 * Created by Administrator on 2017/1/5.
 */
define(['app','orderService'],function(app){
    app.controller('orderInfoController', ['$scope','$q','$http','orderService','commonService',function($scope,$q,$http,orderService,commonService) {
        $scope.pageClass = 'page-about';

          if(commonService.getValue().token == "" || commonService.getValue().token == null || commonService.getValue().token == "null"){
         location.href="login.html";
         }

        $scope.btn = true;
        $scope.taxpayerType = "";
        $scope.companyName = "";
        $scope.id= getQueryString("id");

        getInfo();
        function getInfo(){
            common.mask.loadingRem();
            orderService.get( $scope.id, commonService.getValue().token).then(function(data) {
                if(data == "" || data == null || data == "null"){
                    location.href="login.html";
                }
                if(data.code == 0){
                    data.data.status = data.data.status.toString();
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

        $scope.bj = function(){
            $(".disabled").removeAttr("disabled");
            $scope.btn = false;
        };
        $scope.bc = function(bool){
            if(bool){
                common.mask.loadingRem();

                orderService.update($scope.id,$scope.data.status,commonService.getValue().token).then(function(data) {  // 调用承诺API获取数据 .resolve
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
            $(".disabled").attr("disabled","disabled");
            $scope.btn = true;

        };
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
