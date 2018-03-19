"use strict";

(function () {

    function LoginDal ($log, dal) {

        this.signIn = function (user) {
            $log.log("LoginDal signIn");
            $log.log(user);
            return dal.http.POST("http://localhost:5000/login", user);
        };
    }
    
    angular.module('chartApp').service('loginDal', ['$log', 'dal', LoginDal]);
}());