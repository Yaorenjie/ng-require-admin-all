define(['app'],function(app){
    app.service('commonService', function($http,$q,ajaxFactory) {
        this.download=function(invoke,type,token,params){
            //下载excle
            var defer = $q.defer();
            var data = "invoke="+invoke
                +"&params="+params
                +"&type="+type
                +"&token="+token;
            return ajaxFactory.post(common.url.downloadExcel,data,defer);
        };
        //上传文件
        this.upload = function(token,type){
            var defer = $q.defer();
            $('#fileUploader').attr("action",common.url.uploadFile+"token="+token+"&type="+type);
            $("#fileUploader").ajaxSubmit({
                success:function(data){
                    defer.resolve(data);
                },
                error:function(data){
                    common.mask.errorHit("服务器忙，请刷新")
                }
            });
            return defer.promise;
        }
        //登录
        this.login = function(username,password){
            var defer = $q.defer();
            var data = "account="+username+"&password="+password;
            return ajaxFactory.post(common.url.login,data,defer);
        };

        // 获取本地token和userName
        var _value = {
            token:"",
            username:"",
            id:"",

        };
        this.getValue = function(){
            _value.token = sessionStorage.getItem("adminwebtoken");
            _value.username = sessionStorage.getItem("adminwebusername");
            _value.id = sessionStorage.getItem("adminwebuserid");
            return _value;
        };
        this.setValue = function(token,username,id){
            _value.token = token;
            _value.username = username;
            _value.id = id;
            sessionStorage.setItem("adminwebtoken", token);
            sessionStorage.setItem("adminwebusername", username);
            sessionStorage.setItem("adminwebuserid", id);
        };

        this.init = function(){

        };
        this.sorting_asc = function(id){
            id.addClass("sorting_asc").removeClass("sorting_desc").siblings().removeClass("sorting_asc").removeClass("sorting_desc");
        };
        this.sorting_desc = function(id){
           id.addClass("sorting_desc").removeClass("sorting_asc").siblings().removeClass("sorting_asc").removeClass("sorting_desc");
        };

        this.customerService = function(token){
            var defer = $q.defer();
            var data = {
                token:token
            };
            return ajaxFactory.post(common.url.customerService,data,defer);
        };
        this.findCasualUser = function(key,token){
            var defer = $q.defer();
            var data = {
                key:key,
                token:token
            };
            return ajaxFactory.post(common.url.findCasualUser,data,defer);
        };
        this.package = function(token){
            var defer = $q.defer();
            var data = {
                token:token
            };
            return ajaxFactory.post(common.url.package,data,defer);
        };
        this.industry = function(token){
            var defer = $q.defer();
            var data = {
                token:token
            };
            return ajaxFactory.post(common.url.industry,data,defer);
        };
        this.findAllGiveService = function(token){
            var defer = $q.defer();
            var data = {
                token:token
            };
            return ajaxFactory.post(common.url.findAllGiveService,data,defer);
        };
        this.findRegionByCode = function(code,token){
            var defer = $q.defer();
            var data = {
                code:code,
                token:token
            };
            return ajaxFactory.post(common.url.findRegionByCode,data,defer);
        };
    })
});