"use strict";

(function() {

    var AccountController =  function(accountService, $log, $state) {
        
        $log.log("AccountController controller created");
    	var vm = this;
        vm.isHidden = false;

        vm.account_id;
        vm.first_name;
        vm.last_name;
        vm.account_number;
        
        vm.hideTable = function()
        {
        	vm.isHidden = !vm.isHidden
        };
        
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
       
        vm.updateAcc = function(accId, fName, lName, accNo) {
       	
       		vm.account_id = accId;
       		vm.first_name = fName;
       		vm.last_name = lName;
       		vm.account_number = accNo;
  
            var accountObject = {
            			id:vm.account_id,
            			firstName:vm.first_name,
            			secondName:vm.last_name,
            			accountNumber:vm.account_number
            }
            		              		  
            $log.log(accountObject);
           
           	$state.go('updateAccount', accountObject);
        }

        vm.deleteAcc = function(accId) {
            var obj = {
            			id:accId
            		  }
            		  
            $log.log(accId);
            $log.log(obj);
            accountService.deleteAccount(obj).then(function (results) {
            vm.account = results;
            $log.log(vm.account);
            $log.log("In the delete account controller the value of the result promise is ");
            $log.log(JSON.stringify(vm.account));
            init();
            }, function (error) {
                vm.error = true;
                vm.errorMessage = error;
            });
       }
       
       init();
            
    };

    angular.module('chartApp').controller('accountController', ['accountService','$log', '$state', AccountController]);
}());