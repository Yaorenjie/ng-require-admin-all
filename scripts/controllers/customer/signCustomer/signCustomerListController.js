/**
 * Created by Administrator on 2017/2/27.
 */
/**
 * Created by Administrator on 2017/2/27.
 */
/**
 * Created by Administrator on 2017/1/5.
 */
define(['app','jqPaginator','signCustomerService'],function(app){
    app.controller('signCustomerListController', ['$scope','$q','$http','signCustomerService','commonService',function($scope,$q,$http,signCustomerService,commonService) {
        $scope.value = "";
        if(commonService.getValue().token == "" || commonService.getValue().token == null || commonService.getValue().token == "null"){
            location.href="login.html";
        }
        $scope.paramsType = "";
        $scope.id="";
        $scope.index="";
        $scope.type="";
        $scope.state = "";
        $scope.sort_key = "update_time";
        $scope.sort_type = "desc";

        //删除
        $scope.remove = function(id,index){
            common.mask.dialogRem();
            $scope.id=id;
            $scope.index=index;
            $scope.type=1;
        };
        $("body").on("click","#mask-qd",function(){
            if($scope.id != ""){
                common.mask.loadingRem();
                signCustomerService.remove($scope.id,commonService.getValue().token).then(function(data) {  // 调用承诺API获取数据 .resolve
                    common.mask.dialogAdd();
                    common.mask.loadingAdd();
                    if(data.code == 0){
                        $scope.list.splice($scope.index,1);
                        common.mask.sucessHint("删除成功");
                    }else{
                        common.mask.errorHit(data.msg);
                    }

                }, function(data) {  // 处理错误 .reject
                    common.mask.dialogAdd();
                    common.mask.loadingAdd();
                    common.mask.errorHit("服务器忙，请刷新")
                });
            }

        });

        //条件查询会计师
        $scope.search = function(data){
            search();
        };
        var search = function(data){
            common.mask.loadingRem();
            //获取会计师列表
            signCustomerService.getList($scope.value,$scope.paramsType,0,common.paginator.visiblePages,commonService.getValue().token,$scope.sort_key,$scope.sort_type).then(function(data) {  // 调用承诺API获取数据 .resolve
                common.mask.loadingAdd();
                if(data == "" || data == null || data == "null"){
                    location.href="login.html";
                }
                if(data.code == "999"){
                    common.mask.errorHit("请登录后使用")
                    location.href="login.html";
                }
                $scope.list = data.data.list;
                $.jqPaginator( '#pagination',{
                    totalPages : Math.ceil(data.data.rowCount/ common.paginator.visiblePages),
                    visiblePages : common.paginator.visiblePages,
                    currentPage : 1,
                    prev : '<li class="prev"><a href="javascript:;">上一页</a></li>',
                    next : '<li class="next"><a href="javascript:;">下一页</a></li>',
                    page : '<li class="page"><a href="javascript:;">{{page}}</a></li>',
                    onPageChange : function(num,type) {
                        if (type == "change") {
                            common.mask.loadingRem();
                            signCustomerService.getList($scope.value,$scope.paramsType,num,common.paginator.visiblePages,commonService.getValue().token,$scope.sort_key,$scope.sort_type).then(function(data) {
                                if(data == ""){
                                    location.href="login.html";
                                }
                                common.mask.loadingAdd();
                                $scope.list = data.data.list;
                            }, function(data) {  // 处理错误 .reject
                                location.href="login.html";
                            });
                        }
                    }
                });
            }, function(data) {  // 处理错误 .reject
                location.href="login.html";
            });
        };
        //第一次进入
        search();

        var sorting_updateTime = true;
        $scope.sortingPx=function(type){
            switch (type) {
                case "updateTime":
                    $scope.sort_key = "update_time";
                    if (sorting_updateTime) {
                        $scope.sort_type = "asc";
                        $("#updateTime").addClass("sorting_asc").removeClass("sorting_desc").siblings().removeClass("sorting_asc").removeClass("sorting_desc");
                    } else {
                        $scope.sort_type = "desc";
                        $("#updateTime").addClass("sorting_desc").removeClass("sorting_asc").siblings().removeClass("sorting_asc").removeClass("sorting_desc");
                    }
                    sorting_updateTime = !sorting_updateTime;
                    search();
                    break;
            }
        }
    }]);
});