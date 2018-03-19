"use strict";

(function () {

    angular.module('chartApp').config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/dashboard");

        $stateProvider.state("dashboard", {
            url: "/dashboard",
            templateUrl: "/project/webapp/app/feature/dashboard/dashboard.html"
        }).state("account", {
                url: "/account",
                templateUrl: "/project/webapp/app/feature/account/account.html"
        }).state("login", {
                url: "/login",
                templateUrl: "/project/webapp/app/feature/login/login.html"
        }).state("saveaccount", {
                url: "/save-account",
                templateUrl: "/project/webapp/app/feature/account/createAccount.html"
        }).state("updateAccount", {
                url: "/update-account",
                params: {
                	id: null,
                	firstName: null,
                	secondName: null,
                	accountNumber: null
                },
                templateUrl: "/project/webapp/app/feature/account/updateAccount.html"
        })
    });
}());