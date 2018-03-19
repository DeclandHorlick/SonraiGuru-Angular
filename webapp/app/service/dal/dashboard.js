"use strict";

(function () {

    function DashboardDal ($log, dal) {

        this.getTransactions = function (trans) {
            $log.log("DashboardDal getTransactions");
            $log.log(trans);
            return dal.http.POST("http://localhost:5002/", trans);
        };
    }
    
    angular.module('chartApp').service('dashboardDal', ['$log', 'dal', DashboardDal]);
}());