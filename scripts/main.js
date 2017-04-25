
require.config({
    //定义基础路径，其他的path等路径是基于基础路径进行引入的。如果不配置，默认为引入requireJS页面所在的位置

    paths:{

        //定义组件名称，以及组件js所在的路径
        "jquery": "lib/jquery203",
        "angular" : "http://cdn.bootcss.com/angular.js/1.5.5/angular.min",
        "angular-route" : "lib/angular-route.min",
        "angular-sanitize" : "lib/angular-sanitize.min",
        "angular-resource":"lib/angular-resource.min",
        "app":"app",
        "router":"router",
        "jqPaginator":"lib/jqPaginator",

        "mainController":"controllers/mainController",
        "newCustomerListController":"controllers/customer/newCustomer/newCustomerListController",
        "newCustomerAddController":"controllers/customer/newCustomer/newCustomerAddController",
        "newCustomerInfoController":"controllers/customer/newCustomer/newCustomerInfoController",
        "signCustomerListController":"controllers/customer/signCustomer/signCustomerListController",
        "signCustomerInfoController":"controllers/customer/signCustomer/signCustomerInfoController",
        "companyListController":"controllers/company/companyListController",
        "companyAddController":"controllers/company/companyAddController",
        "companyInfoController":"controllers/company/companyInfoController",
        "orderListController":"controllers/order/orderListController",
        "orderAddController":"controllers/order/orderAddController",
        "orderInfoController":"controllers/order/orderInfoController",

        "newCustomerService":"services/newCustomerService",
        "signCustomerService":"services/signCustomerService",
        "companyService":"services/companyService",
        "orderService":"services/orderService",

        "commonService":"services/commonService",

        "ajaxFactory":"factory/ajax"

    },
    //
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route':{
            deps: ["angular"],
            exports: 'angular-route'
        },
        'angular-sanitize':{
            deps: ["angular"],
            exports: 'angular-sanitize'
        },
        'angular-resource':{
            deps: ["angular"],
            exports: 'angular-resource'
        },
    },
    waitSeconds: 0
});
require([

    'jquery',
    'angular',
    'angular-route',
    'angular-resource',
    'angular-sanitize',
    'app',
    'router',
    'jqPaginator',

    'mainController',
    "newCustomerListController",
    "newCustomerAddController",
    "newCustomerInfoController",
    "signCustomerListController",
    "signCustomerInfoController",
    "companyListController",
    "companyAddController",
    "companyInfoController",
    "orderListController",
    "orderAddController",
    "orderInfoController",

    "newCustomerService",
    "signCustomerService",
    "companyService",
    "orderService",

    "commonService",
    "ajaxFactory"

],function($,angular){
        angular.bootstrap(document,["pinganApp"]);
});

