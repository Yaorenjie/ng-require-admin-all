/**
 * Created by Administrator on 2017/2/27.
 */
define(['app'],function(app){
    app.service('newCustomerService', function ($http,$q,ajaxFactory) {
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
            return ajaxFactory.post(common.url.customer.new.getList,data,defer);
        };
        this.remove = function(id,token){
            var defer = $q.defer();
            //删除企业的ajax
            var data = {
                id:id,
                token:token
            };
            return ajaxFactory.post(common.url.customer.new.delete,data,defer);
        };
        this.update = function(id,token,fellowInfo,name,remark,sysUserId,wishLevel,wishServiceId,cityId,countyId){
            var defer = $q.defer();
            //删除企业的ajax
            var data = {
                id:id,
                token:token,
                fellowInfo:fellowInfo,
                name:name,
                remark:remark,
                sysUserId:sysUserId,
                wishLevel:wishLevel,
                wishServiceId:wishServiceId,
                cityId:cityId,
                countyId:countyId
            };
            return ajaxFactory.post(common.url.customer.new.update,data,defer);
        };
        this.add = function(token,phone,name,remark,wishLevel,wishServiceId,sysUserId,cityId,countyId){
            var defer = $q.defer();
            //删除企业的ajax
            var data = {
                token:token,
                phone:phone,
                name:name,
                remark:remark,
                wishLevel:wishLevel,
                wishServiceId:wishServiceId,
                sysUserId:sysUserId,
                cityId:cityId,
                countyId:countyId
            };
            return ajaxFactory.post(common.url.customer.new.add,data,defer);
        };
        this.get = function(id,token){
            var defer = $q.defer();
            //删除企业的ajax
            var data = {
                id:id,
                token:token
            };
            return ajaxFactory.post(common.url.customer.new.get,data,defer);
        };
        this.sign = function(id,token,servicePackIds){
            var defer = $q.defer();
            //删除企业的ajax
            var data = {
                id:id,
                token:token,
                servicePackIds:servicePackIds
            };
            return ajaxFactory.post(common.url.customer.new.sign,data,defer);
        };
    })
});
