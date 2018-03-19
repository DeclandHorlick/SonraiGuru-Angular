"use strict";

(function () {

    
    function AccountService ($log, accountDal) {

        this.getAccounts = function()
        {
            $log.log("AccountService getAccounts");
        	return accountDal.getAccounts();
        };
        
        this.saveAccount = function(user)
        {
            $log.log("AccountService createAccounts");
            $log.log(user);
        	return accountDal.saveAccount(user);
        };

        this.deleteAccount = function(accountId)
        {
            $log.log("AccountService deleteAccounts");
            $log.log(accountId);
            return accountDal.deleteAccount(accountId);
        };

        this.updateAccount = function(account)
        {
            $log.log("AccountService updateAccounts");
            $log.log(account);
            return accountDal.updateAccount(account);
        };
    }
    
    angular.module("chartApp").service("accountService", ["$log", "accountDal", AccountService]);

}());