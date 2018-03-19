"use strict";

(function() {

    var UpdateAccountController =  function(accountService, $log, $stateParams, $state) {
        
      $log.log("UpdateAccountController controller created");
      var vm = this;

      vm.acc_id = $stateParams.id;
      vm.first_name = $stateParams.firstName;
      vm.second_name = $stateParams.secondName;
      vm.acc_no = $stateParams.accountNumber;

      $log.log(vm.acc_id);
      $log.log(vm.first_name);
      $log.log(vm.second_name);
      $log.log(vm.acc_no);

      vm.updateOnSubmit = function() {
            
        var accountToUpdate = {
              id: vm.acc_id,
              firstName: vm.first_name,
              secondName: vm.second_name,
              accountNumber: vm.acc_no
        };
          
        $log.log(accountToUpdate);
          
        accountService.updateAccount(accountToUpdate).then(function (results) {
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

    angular.module('chartApp').controller('updateAccountController', ['accountService','$log', '$stateParams', '$state', UpdateAccountController]);
}());