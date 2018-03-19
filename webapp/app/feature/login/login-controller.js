"use strict";

(function() {

    var LoginController =  function(loginService, $log, $state, $cookies) {
        
      $log.log("LoginController controller created");
      var vm = this;
      vm.user_name;
      vm.password;
      vm.obj;
        
      vm.onSubmit = function(userName, pass) {
            vm.user_name = userName;
            vm.password = pass;
            
            vm.obj = {
                username: vm.user_name,
                password: vm.password
            }
            
            $log.log(vm.obj);

            loginService.signIn(vm.obj).then(function (results) {
            if(results=="successful login"){ 

            vm.user = results;
            $log.log(vm.user);
            $log.log("In the login controller the value of the result promise is ");
            $log.log(JSON.stringify(vm.user));


            $cookies.put('Username', vm.user_name);
            console.log($cookies.get('Username'));

            $state.go("dashboard");
          } else {
              vm.user = results;
              $log.log(vm.user);
          }
            
            }, function (error) {
                vm.error = true;
                vm.errorMessage = error;
            });
      }
                   
    };

    angular.module('chartApp').controller('loginController', ['loginService','$log', '$state', '$cookies', LoginController]);
}());
