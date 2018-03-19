"use strict";

(function () {

    
    function DashboardService ($log, dashboardDal) {
 
        this.getTransactions = function(trans)
        {
            $log.log("DashboardService getTransactions");
            $log.log(trans);
        	return dashboardDal.getTransactions(trans);
        };
    }

    angular.module('chartApp').service('dashboardService', ['$log', 'dashboardDal', DashboardService]);

}());