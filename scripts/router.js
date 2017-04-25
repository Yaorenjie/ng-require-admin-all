/**
 * 路由
 */
define(['app'], function(app){

    return app.config(['$routeProvider',function($routeProvider) {
        $routeProvider

        // home page
            .when('/', {
                templateUrl: 'pages/home.html',
                controller: 'mainController'
            })
            .when('/home', {
                templateUrl: 'pages/home.html',
                controller: 'mainController'
            })
            // 新增客户列表页面路由
            .when('/newCustomerList', {
                templateUrl: 'pages/customer/newCustomer/newCustomerList.html',
                controller: 'newCustomerListController'
            })
            // 添加新增客户页面路由
            .when('/newCustomerAdd', {
                templateUrl: 'pages/customer/newCustomer/newCustomerAdd.html',
                controller: 'newCustomerAddController'
            })
            // 新增客户详情页面路由
            .when('/newCustomerInfo', {
                templateUrl: 'pages/customer/newCustomer/newCustomerInfo.html',
                controller: 'newCustomerInfoController'
            })

            // 签约客户列表页面路由
            .when('/signCustomerList', {
                templateUrl: 'pages/customer/signCustomer/signCustomerList.html',
                controller: 'signCustomerListController'
            })
            // 签约客户详情页面路由
            .when('/signCustomerInfo', {
                templateUrl: 'pages/customer/signCustomer/signCustomerInfo.html',
                controller: 'signCustomerInfoController'
            })

            // 公司列表页面路由
            .when('/companyList', {
                templateUrl: 'pages/company/companyList.html',
                controller: 'companyListController'
            })
            // 添加公司页面路由
            .when('/companyAdd', {
                templateUrl: 'pages/company/companyAdd.html',
                controller: 'companyAddController'
            })
            // 公司详情页面路由
            .when('/companyInfo', {
                templateUrl: 'pages/company/companyInfo.html',
                controller: 'companyInfoController'
            })

            // 订单列表页面路由
            .when('/orderList', {
                templateUrl: 'pages/order/orderList.html',
                controller: 'orderListController'
            })
            // 订单公司页面路由
            .when('/orderAdd', {
                templateUrl: 'pages/order/orderAdd.html',
                controller: 'orderAddController'
            })
            // 订单详情页面路由
            .when('/orderInfo', {
                templateUrl: 'pages/order/orderInfo.html',
                controller: 'orderInfoController'
            })
            .otherwise({redirectTo:'/'});

        //$locationProvider.html5Mode(true).hashPrefix('!');

    }])


})