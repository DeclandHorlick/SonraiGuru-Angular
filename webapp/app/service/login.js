"use strict";

(function () {

    
    function LoginService ($log, loginDal) {
 
        this.signIn = function(user)
        {
            $log.log("LoginService signIn");
            $log.log(user);
        	return loginDal.signIn(user);
        };
    }

    angular.module('chartApp').service('loginService', ['$log', 'loginDal', LoginService]);

}());
    