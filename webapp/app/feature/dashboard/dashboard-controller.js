"use strict";

(function() {

    var DashboardController =  function(dashboardService, $log, $cookies) {
        
    	var vm = this;

      // vm.timeFrame="2016-03-29";
      vm.timeFrame;
      vm.amountArray = [];
      vm.dateArray = [];
      vm.newDateArray = [];
      vm.formatDateArray = [];
      vm.dateArrayTwo = [];
      vm.transDate = [];
      vm.finalTransAmnt = [];
      vm.balance;
      vm.formatTransDate = "";

      vm.user_name_cookie = $cookies.get('Username');

      $log.log("Dash: "+vm.user_name_cookie);

      function reset()
      {
	      vm.amountArray = [];
	      vm.dateArray = [];
	      vm.newDateArray = [];
	      vm.formatDateArray = [];
	      vm.dateArrayTwo = [];
	      vm.transDate = [];
	      vm.finalTransAmnt = [];
	      vm.balance;
	      vm.formatTransDate = "";
      }

      vm.changeTable = function()
      {
      	reset();
          vm.timeDetails = {
               dateTo : "2016-07-15", 
               dateFrom : vm.timeFrame
         };
            
 //           $log.log(vm.timeDetails);
 //           $log.log("OUR DATE: "+vm.timeDetails.dateTo);

            dashboardService.getTransactions(vm.timeDetails).then(function (results) {
            
  //          $log.log(results);
            vm.transactions = results;
            $log.log(vm.transactions);
            $log.log("In the dashboard controller the value of the result promise is ");
 //           $log.log(JSON.stringify(vm.transactions));  

            vm.amountArray = vm.transactions.slice(0, (vm.transactions.length/2));
            vm.dateArray = vm.transactions.slice((vm.transactions.length/2), vm.transactions.length-1);
            vm.balance = vm.transactions.slice(vm.transactions.length-1, vm.transactions.length);
   //         $log.log(vm.amountArray);
  //          $log.log(vm.dateArray);
   //         $log.log(vm.balance);

            // specifyTypeChart(drawLineChart);
            
            if(vm.chartType == "pie") {
	             $log.log("pie");
	             specifyTypeChart(drawPieChart(vm.dateArray, vm.amountArray, vm.balance));

            }
            else if(vm.chartType == "bar") {
            	$log.log("bar");
    	         specifyTypeChart(drawBarChart(vm.dateArray, vm.amountArray, vm.balance));
            }
            else {
            	$log.log("line");
            	 specifyTypeChart(drawLineChart(vm.dateArray, vm.amountArray, vm.balance));
        	}

            }, function (error) {
                vm.error = true;
                vm.errorMessage = error;
            });
      }

       // vm.changeTable();

        function drawLineChart(dateArray, amountArray, balance) {
            // Define the chart to be drawn.
            //vm.bal += balance + amountArray[0] + amountArray[1] + amountArray[2] + amountArray[3] + amountArray[4] + amountArray[5] + amountArray[6]
            var data = new google.visualization.DataTable();
            $log.log(balance);
            vm.bal = balance[0];
            $log.log(vm.bal);
            vm.balance = vm.bal;
          
            vm.totalTransactions = 0;
            for (var i = 0;i < amountArray.length;i++)
            {
              vm.totalTransactions -= amountArray[i];
              $log.log("in loop" + vm.totalTransactions + "transAmount  " + amountArray[i]);

            }
            $log.log("Total"+ vm.totalTransactions);
            $log
            vm.startingBalance = vm.balance + vm.totalTransactions;

            $log.log("Starting Balance"+ vm.startingBalance);

           // vm.firstDate = vm.dateArray[0].slice(0, 10);

           // $log.log(vm.firstDate);


            for(var j = 0; j < 7; j++){
              var temp = new Date(vm.timeDetails.dateTo);
              temp.setDate(temp.getDate()-j);
              vm.formatDate = String(temp).slice(4, 15);
              vm.newDateArray.push(vm.formatDate);
            }
            //var temp = new Date(vm.firstDate);
            //temp.setDate(temp.getDate()-1);

            $log.log(vm.newDateArray);


            // for(var k = 0; k < vm.newDateArray.length; k++) {
            //   vm.formatDate = String(vm.newDateArray[k]).slice(4, 15);
            //   vm.formatDateArray.push(vm.formatDate);
            // }

            // $log.log(vm.formatDateArray);

            for(var l = 0; l < vm.dateArray.length; l++){
              var tempTwo = new Date(vm.dateArray[l]);
              tempTwo.setDate(tempTwo.getDate());
              vm.formatTransDate = String(tempTwo).slice(4, 15);
              vm.transDate.push(vm.formatTransDate);
            }

            for(var d = 0; d< vm.newDateArray.length;d++)
            {
              vm.checkingAmount = 0;
              for(var e = 0; e < vm.transDate.length;e++ )
              {
                if(vm.newDateArray[d] == vm.transDate[e])
                {
                  if(vm.checkingAmount == 0)
                  {
                  vm.finalTransAmnt.push(vm.amountArray[e]);
                  vm.checkingAmount = vm.amountArray[e]
                  }
                  else
                  {
                    vm.checkingAmount= vm.amountArray[e];
                    vm.finalTransAmnt[d] += vm.checkingAmount;
                    vm.checkingAmount = vm.finalTransAmnt[d];
                  }
                }

              }
              if(vm.checkingAmount == 0)
              {
                vm.finalTransAmnt.push(0);
              }

            }

            $log.log("The New One: "+vm.finalTransAmnt);

            $log.log(vm.transDate);

            $log.log(amountArray);

            data.addColumn('string', 'Day');
            data.addColumn('number', 'Balance');
            data.addRows([
               [vm.newDateArray[6], vm.startingBalance+= vm.finalTransAmnt[6]],
               [vm.newDateArray[5], vm.startingBalance+= vm.finalTransAmnt[5]],
               [vm.newDateArray[4], vm.startingBalance+= vm.finalTransAmnt[4]],
               [vm.newDateArray[3], vm.startingBalance+= vm.finalTransAmnt[3]],
               [vm.newDateArray[2], vm.startingBalance+= vm.finalTransAmnt[2]],
               [vm.newDateArray[1], vm.startingBalance+= vm.finalTransAmnt[1]],
               [vm.newDateArray[0], vm.startingBalance+= vm.finalTransAmnt[0]]
            ]);
            
               
            // Set chart options
            var options = {'title' : 'Account Balance',
               hAxis: {
                  title: 'Date'
               },
               vAxis: {
                  title: 'Balance',
               	minValue: 0
               },   
               'width':1200,
               'height':1000,
  //             'colors':['#FF8C00'],
               backgroundColor: { fill:'transparent' },
               pointsVisible: true      
            };

            // Instantiate and draw the chart.
            var chart = new google.visualization.LineChart(document.getElementById('container'));
            chart.draw(data, options);
         }

          // specifyTypeChart(drawLineChart(vm.dateArray, vm.amountArray));

         function specifyTypeChart(type) {
            google.charts.setOnLoadCallback(type);
         }

 /*         function drawPieChart()
        {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Month');
            data.addColumn('number', 'Tokyo');
            data.addColumn('number', 'New York');
            data.addColumn('number', 'Berlin');
            data.addColumn('number', 'London');
            data.addRows([
               ['Jan',  7.0, -0.2, -0.9, 3.9],
               ['Feb',  6.9, 0.8, 0.6, 4.2],
               ['Mar',  9.5,  5.7, 3.5, 5.7],
               ['Apr',  14.5, 11.3, 8.4, 8.5],
               ['May',  18.2, 17.0, 13.5, 11.9],
               ['Jun',  21.5, 22.0, 17.0, 15.2],
               
               ['Jul',  25.2, 24.8, 18.6, 17.0],
               ['Aug',  26.5, 24.1, 17.9, 16.6],
               ['Sep',  23.3, 20.1, 14.3, 14.2],
               ['Oct',  18.3, 14.1, 9.0, 10.3],
               ['Nov',  13.9,  8.6, 3.9, 6.6],
               ['Dec',  9.6,  2.5,  1.0, 4.8]
            ]);
               
            // Set chart options
            var options = {'title' : 'Average Temperatures of Cities',
               hAxis: {
                  title: 'Month'
               },
               vAxis: {
                  title: 'Temperature'
               },   
               'width':1200,
               'height':1000,
               backgroundColor: { fill:'transparent' },
               pointsVisible: true      
            };

            // Instantiate and draw the chart.
            var chart = new google.visualization.PieChart(document.getElementById('container'));
            chart.draw(data, options);
        }
*/
        function drawPieChart(dateArray, amountArray, balance) {
            // Define the chart to be drawn.
            //vm.bal += balance + amountArray[0] + amountArray[1] + amountArray[2] + amountArray[3] + amountArray[4] + amountArray[5] + amountArray[6]
            var data = new google.visualization.DataTable();
            $log.log(balance);
            vm.bal = balance[0];
            $log.log(vm.bal);
            vm.balance = vm.bal;
          
            vm.totalTransactions = 0;
            for (var i = 0;i < amountArray.length;i++)
            {
              vm.totalTransactions -= amountArray[i];
              $log.log("in loop" + vm.totalTransactions + "transAmount  " + amountArray[i]);

            }
            $log.log("Total"+ vm.totalTransactions);
            $log
            vm.startingBalance = vm.balance + vm.totalTransactions;

            $log.log("Starting Balance"+ vm.startingBalance);

           // vm.firstDate = vm.dateArray[0].slice(0, 10);

           // $log.log(vm.firstDate);


            for(var j = 0; j < 7; j++){
              var temp = new Date(vm.timeDetails.dateTo);
              temp.setDate(temp.getDate()-j);
              vm.formatDate = String(temp).slice(4, 15);
              vm.newDateArray.push(vm.formatDate);
            }
            //var temp = new Date(vm.firstDate);
            //temp.setDate(temp.getDate()-1);

            $log.log(vm.newDateArray);


            // for(var k = 0; k < vm.newDateArray.length; k++) {
            //   vm.formatDate = String(vm.newDateArray[k]).slice(4, 15);
            //   vm.formatDateArray.push(vm.formatDate);
            // }

            // $log.log(vm.formatDateArray);

            for(var l = 0; l < vm.dateArray.length; l++){
              var tempTwo = new Date(vm.dateArray[l]);
              tempTwo.setDate(tempTwo.getDate());
              vm.formatTransDate = String(tempTwo).slice(4, 15);
              vm.transDate.push(vm.formatTransDate);
            }

            for(var d = 0; d< vm.newDateArray.length;d++)
            {
              vm.checkingAmount = 0;
              for(var e = 0; e < vm.transDate.length;e++ )
              {
                if(vm.newDateArray[d] == vm.transDate[e])
                {
                  if(vm.checkingAmount == 0)
                  {
                  vm.finalTransAmnt.push(vm.amountArray[e]);
                  vm.checkingAmount = vm.amountArray[e]
                  }
                  else
                  {
                    vm.checkingAmount= vm.amountArray[e];
                    vm.finalTransAmnt[d] += vm.checkingAmount;
                    vm.checkingAmount = vm.finalTransAmnt[d];
                  }
                }

              }
              if(vm.checkingAmount == 0)
              {
                vm.finalTransAmnt.push(0);
              }

            }

            $log.log("The New One: "+vm.finalTransAmnt);

            $log.log(vm.transDate);

            $log.log(amountArray);

            data.addColumn('string', 'Day');
            data.addColumn('number', 'Balance');
            data.addRows([
               [vm.newDateArray[6], vm.startingBalance+= vm.finalTransAmnt[6]],
               [vm.newDateArray[5], vm.startingBalance+= vm.finalTransAmnt[5]],
               [vm.newDateArray[4], vm.startingBalance+= vm.finalTransAmnt[4]],
               [vm.newDateArray[3], vm.startingBalance+= vm.finalTransAmnt[3]],
               [vm.newDateArray[2], vm.startingBalance+= vm.finalTransAmnt[2]],
               [vm.newDateArray[1], vm.startingBalance+= vm.finalTransAmnt[1]],
               [vm.newDateArray[0], vm.startingBalance+= vm.finalTransAmnt[0]]
            ]);
            
               
            // Set chart options
            var options = {'title' : 'Account Balance',
               hAxis: {
                  title: 'Date'
               },
               vAxis: {
                  title: 'Balance',
               	minValue: 0
               },   
               'width':1200,
               'height':1000,
               backgroundColor: { fill:'transparent' },
               pointsVisible: true,
               pieSliceText:'value'      
            };

            // Instantiate and draw the chart.
            var chart = new google.visualization.PieChart(document.getElementById('container'));
            chart.draw(data, options);
         }

	function drawBarChart(dateArray, amountArray, balance) {
            // Define the chart to be drawn.
            //vm.bal += balance + amountArray[0] + amountArray[1] + amountArray[2] + amountArray[3] + amountArray[4] + amountArray[5] + amountArray[6]
            var data = new google.visualization.DataTable();
            $log.log(balance);
            vm.bal = balance[0];
            $log.log(vm.bal);
            vm.balance = vm.bal;
          
            vm.totalTransactions = 0;
            for (var i = 0;i < amountArray.length;i++)
            {
              vm.totalTransactions -= amountArray[i];
              $log.log("in loop" + vm.totalTransactions + "transAmount  " + amountArray[i]);

            }
            $log.log("Total"+ vm.totalTransactions);
            $log
            vm.startingBalance = vm.balance + vm.totalTransactions;

            $log.log("Starting Balance"+ vm.startingBalance);

           // vm.firstDate = vm.dateArray[0].slice(0, 10);

           // $log.log(vm.firstDate);


            for(var j = 0; j < 7; j++){
              var temp = new Date(vm.timeDetails.dateTo);
              temp.setDate(temp.getDate()-j);
              vm.formatDate = String(temp).slice(4, 15);
              vm.newDateArray.push(vm.formatDate);
            }
            //var temp = new Date(vm.firstDate);
            //temp.setDate(temp.getDate()-1);

            $log.log(vm.newDateArray);


            // for(var k = 0; k < vm.newDateArray.length; k++) {
            //   vm.formatDate = String(vm.newDateArray[k]).slice(4, 15);
            //   vm.formatDateArray.push(vm.formatDate);
            // }

            // $log.log(vm.formatDateArray);

            for(var l = 0; l < vm.dateArray.length; l++){
              var tempTwo = new Date(vm.dateArray[l]);
              tempTwo.setDate(tempTwo.getDate());
              vm.formatTransDate = String(tempTwo).slice(4, 15);
              vm.transDate.push(vm.formatTransDate);
            }

            for(var d = 0; d< vm.newDateArray.length;d++)
            {
              vm.checkingAmount = 0;
              for(var e = 0; e < vm.transDate.length;e++ )
              {
                if(vm.newDateArray[d] == vm.transDate[e])
                {
                  if(vm.checkingAmount == 0)
                  {
                  vm.finalTransAmnt.push(vm.amountArray[e]);
                  vm.checkingAmount = vm.amountArray[e]
                  }
                  else
                  {
                    vm.checkingAmount= vm.amountArray[e];
                    vm.finalTransAmnt[d] += vm.checkingAmount;
                    vm.checkingAmount = vm.finalTransAmnt[d];
                  }
                }

              }
              if(vm.checkingAmount == 0)
              {
                vm.finalTransAmnt.push(0);
              }

            }

            $log.log("The New One: "+vm.finalTransAmnt);

            $log.log(vm.transDate);

            $log.log(amountArray);

            data.addColumn('string', 'Month');
            data.addColumn('number', 'Balance');
            data.addRows([
               [vm.newDateArray[6], vm.startingBalance+= vm.finalTransAmnt[6]],
               [vm.newDateArray[5], vm.startingBalance+= vm.finalTransAmnt[5]],
               [vm.newDateArray[4], vm.startingBalance+= vm.finalTransAmnt[4]],
               [vm.newDateArray[3], vm.startingBalance+= vm.finalTransAmnt[3]],
               [vm.newDateArray[2], vm.startingBalance+= vm.finalTransAmnt[2]],
               [vm.newDateArray[1], vm.startingBalance+= vm.finalTransAmnt[1]],
               [vm.newDateArray[0], vm.startingBalance+= vm.finalTransAmnt[0]]
            ]);
            
               
            // Set chart options
            var options = {'title' : 'Account Balance',
               hAxis: {
                  title: 'Date'
               },
               vAxis: {
               	minValue: 0,
                  title: 'Balance'

            
               },   
               'width':1200,
               'height':1000,
 //              'colors':['#FF8C00'],
               backgroundColor: { fill:'transparent' },
               pointsVisible: true,
               bars: 'vertical'      
            };

            // Instantiate and draw the chart.
            var chart = new google.visualization.ColumnChart(document.getElementById('container'));
            chart.draw(data, options);
         }

            
    };

    angular.module('chartApp').controller('dashboardController', ['dashboardService','$log', '$cookies', DashboardController]);
}());
