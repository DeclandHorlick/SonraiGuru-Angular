"use strict";

(function() {

    var CreateAccountController =  function(accountService, $log, $state) {
        
      $log.log("CreateAccountController controller created");
      var vm = this;
      vm.first_name;
   	  vm.second_name;
   	  vm.acc_no;
   	  vm.obj;
        
      function init() {
        	accountService.getAccounts().then(function (results) {
           	vm.accounts = results;
           	$log.log("In the account controller the value of the result promise is ");
        	$log.log(JSON.stringify(vm.accounts));
            }, function (error) {
                vm.error = true;
                vm.errorMessage = error;
            });
      }
       
      vm.onSubmit = function(firstName, secondName, accNo) {
       		vm.first_name = firstName;
       		vm.second_name = secondName;
       		vm.acc_no = accNo;
       		
       		vm.obj = {
    			firstName: vm.first_name,
    			secondName: vm.second_name,
   				accountNumber: vm.acc_no
   			}
       		
       		$log.log(vm.obj);
       		
       		accountService.saveAccount(vm.obj).then(function (results) {
           	vm.account = results;
           	$log.log(vm.account);
           	$log.log("In the create account controller the value of the result promise is ");
        	$log.log(JSON.stringify(vm.account));

            $state.go("account");
            
            }, function (error) {
                vm.error = true;
                vm.errorMessage = error;
            });
      }
                   
    };

    angular.module('chartApp').controller('createAccountController', ['accountService','$log', '$state', CreateAccountController]);
}());