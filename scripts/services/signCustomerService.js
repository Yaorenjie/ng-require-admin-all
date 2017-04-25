/**
 * Created by Administrator on 2017/2/27.
 */
define(['app'],function(app){
    app.service('signCustomerService', function ($http,$q,ajaxFactory) {
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
            return ajaxFactory.post(common.url.customer.sign.getList,data,defer);
        };
        this.remove = function(id,token){
            var defer = $q.defer();
            //删除企业的ajax
            var data = {
                id:id,
                token:token
            };
            return ajaxFactory.post(common.url.customer.sign.delete,data,defer);
        };
        this.update = function(id,token,name,remark,sysUserId,cityId,countyId){
            var defer = $q.defer();
            //删除企业的ajax
            var data = {
                id:id,
                token:token,
                name:name,
                remark:remark,
                sysUserId:sysUserId,
                cityId:cityId,
                countyId:countyId
            }
            return ajaxFactory.post(common.url.customer.sign.update,data,defer);
        };
        this.get = function(id,token){
            var defer = $q.defer();
            //删除企业的ajax
            var data = {
                id:id,
                token:token
            };
            return ajaxFactory.post(common.url.customer.sign.get,data,defer);
        };
    })
});
