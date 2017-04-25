/**
 * Created by Administrator on 2017/2/27.
 */
define(['app'],function(app){
    app.service('orderService', function ($http,$q,ajaxFactory) {
        this.getList = function(params,paramsType,begin,size,token,sort_key,sort_type){
            var defer = $q.defer();
            //获取公司列表的ajax
            var data = {
                count:size,
                key:params,
                keyType:paramsType,
                orderBy:JSON.stringify([{
                    key:sort_key,
                    sort:sort_type
                }]),
                page:begin,
                token:token
            };
            return ajaxFactory.post(common.url.order.getList,data,defer);
        };

        this.get = function(id,token){
            var defer = $q.defer();
            //获取公司列表的ajax
            var  data = {
                id:id,
                token:token
            };
            return ajaxFactory.post(common.url.order.get,data,defer);
        };
        this.remove = function(id,token){
            var defer = $q.defer();
            //删除企业的ajax
            var data = {
                id:id,
                token:token
            };
            return ajaxFactory.post(common.url.order.delete,data,defer);
        };
        this.update = function(id,status,token){
            var defer = $q.defer();
            //删除企业的ajax
            var data = {
                id:id,
                status:status,
                token:token
            };
            return ajaxFactory.post(common.url.order.update,data,defer);
        };
        this.add = function(price,serviceId,token,userId,giveServiceId){
            var defer = $q.defer();
            //删除企业的ajax
            var data = {
                price:price,
                serviceId:serviceId,
                token:token,
                userId:userId,
                giveServiceId:giveServiceId
            };
            return ajaxFactory.post(common.url.order.add,data,defer);
        }

    })
});
