/**
 * Created by Administrator on 2017/1/5.
 */
//var http= "http://120.24.171.173:70/mockjsdata/11/";
//var httpPre= "http://192.168.0.7:8080/admin/";
var httpPre= "/admin";
var http= httpPre+"/api/webAdmin?";

var common = {
    url:{
        uploadFile:http+"/file/fileUpload?",
        /*下载excel*/
        downloadExcel:http+"/file/exportExcel?",

        login:http+"apiVersion=1&method=login",
        logout:http+"apiVersion=1&method=logout",
        /*企业用户管理*/
        company:{
            //获取企业用户列表
            getList:http+"apiVersion=1&method=findCompany",
            get:http+"apiVersion=1&method=findCompanyById",
            //删除企业用户
            delete:http+"apiVersion=1&method=deleteCompany",
            update:http+"apiVersion=1&method=updateCompany",
            add:http+"apiVersion=1&method=addCompany"
        },
        /*订单管理*/
        order:{
            //获取订单列表
            getList:http+"apiVersion=1&method=findOrders",
            get:http+"apiVersion=1&method=findOrdersById",
            //删除订单
            delete:http+"apiVersion=1&method=deleteOrders",
            update:http+"apiVersion=1&method=updateOrders",
            add:http+"apiVersion=1&method=addOrders"
        },
        customer:{
            new:{
                getList:http+"apiVersion=1&method=findCasualUser",
                get:http+"apiVersion=1&method=findCasualUserById",
                delete:http+"apiVersion=1&method=deleteCasualUser",
                update:http+"apiVersion=1&method=updateCasualUser",
                add:http+"apiVersion=1&method=addCasualUser",
                sign:http+"apiVersion=1&method=casualUser2User"
            },
            sign:{
                get:http+"apiVersion=1&method=findUserById",
                getList:http+"apiVersion=1&method=findUser",
                delete:http+"apiVersion=1&method=deleteUser",
                update:http+"apiVersion=1&method=updateUser",
            }
        },
        package:http+"apiVersion=1&method=findAllServicePack",//套餐
        customerService:http+"apiVersion=1&method=findAllSysUser",//客服
        industry:http+"apiVersion=1&method=findAllIndustry",  //行业
        findCasualUser:http+"apiVersion=1&method=findCasualUserByKey",//获取所有客户
        findAllGiveService:http+"apiVersion=1&method=findAllGiveService",//获取赠送类容
        findRegionByCode:http+"apiVersion=1&method=findRegionByCode"//获取赠送类容



    },
    paginator:{
        visiblePages:10  //分页的个数
    },
    init:function(){
        this.mask.init();

    },
    mask:{
        tt_mask : "<div class='tt-mask none' id='tt-mask'>"+
        "<img />"+
        "<p></p>"+
        "</div>",
        load_mask:"<div class='mask none' id='loading-mask'>" +
        "<div class='hint-mask ' >"+
        "<img src='imgs/loading.png' />"+
        "</div>"+
        "</div>",
        dialog_mask:"<div class='alert alert-block alert-error none dialog-mask' id='dialog-mask'>"+
        "<h4 class='alert-heading'><i class='icon-warning-sign'></i>确认</h4>"+
        "<div class='button-set'>"+
        "<button class='btn btn-danger btn-cons' type='button' id='mask-qd'>确定</button>"+
        "<button class='btn btn-white btn-cons' type='button' id='mask-qx'>取消</button>"+
        "</div>"+
        "</div>",
        init:function(){
            this.addBody();
        },
        addBody:function(){
            $("body").append(this.tt_mask).append(this.load_mask).append(this.dialog_mask);
        },
        sucessHint:function(content){//成功提示
            $("#tt-mask").removeClass("none");
            $("#tt-mask img").attr("src","./imgs/succees.png");
            $("#tt-mask p").html(content);
            setTimeout(function () {
                $("#tt-mask").addClass("none");
            }, 1500);
        },
        errorHit:function(content){//错误提示
            $("#tt-mask").removeClass("none");
            $("#tt-mask img").attr("src","./imgs/error.png");
            $("#tt-mask p").html(content);
            setTimeout(function () {
                $("#tt-mask").addClass("none");
            }, 1500);
        },
        loadingRem:function(){
            $("#loading-mask").removeClass("none");
        },
        loadingAdd:function(){
            $("#loading-mask").addClass("none");
        },
        dialogRem:function(){
            $("#dialog-mask").removeClass("none");
        },
        dialogAdd:function(){
            $("#dialog-mask").addClass("none");
        },
    },

    validate:{
        price:function (ele) {
            var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
            if (reg.test(ele)) {
                return true;
            }else{
                return false;
            };
        },
    },
    validate_apk:function(ele){
        //alert((ele.files[0].size/(1024*1024)).toFixed(2));
        var file = ele.value;

        if(!/.(apk|APK)$/.test(file)){
            common.mask.errorHit("请上传apk文件");
            return false;
        }
        return true;
    },
    validate_img:function(ele){
// 返回 KB，保留小数点后两位
        //alert((ele.files[0].size/(1024*1024)).toFixed(2));
        var file = ele.value;

        if(!/.(gif|jpg|jpeg|png|GIF|JPG)$/.test(file)){
            common.mask.errorHit("请上传图片");
            return false;
        }else{
            //alert((ele.files[0].size).toFixed(2));
            //返回Byte(B),保留小数点后两位
            if(((ele.files[0].size).toFixed(2))>=(2*1024*1024)){
                common.mask.errorHit("请上传小于2M的图片");
                return false;
            }
        }
        return true;
    }
};
common.init();