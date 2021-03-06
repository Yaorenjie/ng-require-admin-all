/**
 * Created by Administrator on 2017/2/27.
 */
define(['app','jqPaginator','companyService'],function(app){
    app.controller('companyListController', ['$scope','$q','$http','companyService','commonService',function($scope,$q,$http,companyService,commonService) {
        $scope.pageClass = 'page-about';
        if(commonService.getValue().token == "" || commonService.getValue().token == null || commonService.getValue().token == "null"){
            location.href="login.html";
        }
        $scope.value = "";
        $scope.id="";
        $scope.index="";
        $scope.paramsType = "";
        $scope.type="";
        $scope.state = "";
        $scope.sort_key = "create_time";
        $scope.sort_type = "desc";
        //删除会计师
        $scope.remove = function(id,index){
            common.mask.dialogRem();
            $scope.id=id;
            $scope.index=index;
            $scope.type=1;
        };

        $scope.maskQd = function () {

        }
        $("body").on("click","#mask-qd",function(){
            if($scope.id != ""){
                common.mask.loadingRem();
                companyService.remove($scope.id,commonService.getValue().token).then(function(data) {  // 调用承诺API获取数据 .resolve
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
            companyService.getList($scope.value,$scope.paramsType,0,common.paginator.visiblePages,commonService.getValue().token,$scope.sort_key,$scope.sort_type).then(function(data) {  // 调用承诺API获取数据 .resolve
                console.log(data);
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
                            companyService.getList($scope.value,$scope.paramsType,num,common.paginator.visiblePages,commonService.getValue().token,$scope.sort_key,$scope.sort_type).then(function(data) {
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

        var sorting_taxType = true;
        var sorting_createTime = true;
        $scope.sortingPx=function(type){
            switch (type) {
                case "createTime":
                    $scope.sort_key = "create_time";
                    if (sorting_createTime) {
                        $scope.sort_type = "asc";
                        $("#createTime").addClass("sorting_asc").removeClass("sorting_desc").siblings().removeClass("sorting_asc").removeClass("sorting_desc");
                    } else {
                        $scope.sort_type = "desc";
                        $("#createTime").addClass("sorting_desc").removeClass("sorting_asc").siblings().removeClass("sorting_asc").removeClass("sorting_desc");
                    }
                    sorting_createTime = !sorting_createTime;
                    search();
                    break;
                case "taxType":
                    $scope.sort_key = "tax_type";
                    if (sorting_taxType) {
                        $scope.sort_type = "asc";
                        $("#taxType").addClass("sorting_asc").removeClass("sorting_desc").siblings().removeClass("sorting_asc").removeClass("sorting_desc");
                    } else {
                        $scope.sort_type = "desc";
                        $("#taxType").addClass("sorting_desc").removeClass("sorting_asc").siblings().removeClass("sorting_asc").removeClass("sorting_desc");
                    }
                    sorting_taxType = !sorting_taxType;
                    search();
                    break;
            }
        }
    }]);
});
