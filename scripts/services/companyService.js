define(['app'],function(app){
    app.service('companyService', function ($http,$q,ajaxFactory) {
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
            return ajaxFactory.post(common.url.company.getList,data,defer);
        };
        this.get = function(id,token){
            var defer = $q.defer();
            //获取公司列表的ajax
            var data = {
                id:id,
                token:token
            };
            return ajaxFactory.post(common.url.company.get,data,defer);
        };
        this.remove = function(id,token){
            var defer = $q.defer();
            //删除企业的ajax
            var data = {
                id:id,
                token:token
            };
            return ajaxFactory.post(common.url.company.delete,data,defer);
        };
        this.update = function(id,name,taxType,token,trade,code){
            var defer = $q.defer();
            //删除企业的ajax
            var data = {
                id:id,
                name:name,
                taxType:taxType,
                token:token,
                trade:trade,
                code:code
            };
            return ajaxFactory.post(common.url.company.update,data,defer);
        };
        this.add = function(code,name,taxType,token,trade,userId){
            var defer = $q.defer();
            //删除企业的ajax
            var data = {
                code:code,
                name:name,
                taxType:taxType,
                token:token,
                trade:trade,
                userId:userId
            };
            return ajaxFactory.post(common.url.company.add,data,defer);
        }

    })
});
