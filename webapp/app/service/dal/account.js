"use strict";

(function () {

    function AccountDal ($log, dal) {

        this.getAccounts = function () {
            $log.log("AccountDal getAccounts");
            return dal.http.GET("rest/account/json");
        };

        this.saveAccount = function (accountToSave) {
            $log.log("AccountDal saveAccounts");
            return dal.http.POST("rest/account/json", accountToSave);
        };

        this.updateAccount = function (accountToUpdate) {
            $log.log("AccountDal UPDATEAccounts");
            return dal.http.PUT("rest/account/json", accountToUpdate);
        };

        this.deleteAccount = function (accountToDelete) {
            $log.log("AccountDal deleteAccounts");
            return dal.http.DELETE("rest/account/json/", accountToDelete);
        };
    }
    
    angular.module("chartApp").service("accountDal", ["$log", "dal", AccountDal]);
}());