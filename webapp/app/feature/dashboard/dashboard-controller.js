"use strict";

(function() {

    var DashboardController =  function(dashboardService, $log, $cookies) {
        
    	var vm = this;

      vm.timeFrame="2016-07-09W";
      vm.chartType="line";
      vm.showSavings=false;
      vm.amountArray = [];
      vm.dateArray = [];
      vm.newDateArray = [];
      vm.formatDateArray = [];
      vm.dateArrayTwo = [];
      vm.transDate = [];
      vm.finalTransAmnt = [];
      vm.balance;
      vm.timeDuration;
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
      vm.timeDuration;
      vm.formatTransDate = "";
      }

      vm.changeTable = function()
      {
      	reset();
          vm.timeDetails = {
               dateTo : "2016-07-15", 
               dateFrom : vm.timeFrame.slice(0, vm.timeFrame.length-1)
         };
            

            $log.log(vm.timeDetails);
            $log.log("OUR DATE: "+vm.timeDetails.dateFrom);
            vm.timeDuration = vm.timeFrame.slice(vm.timeFrame.length-1, vm.timeFrame.length);
            $log.log("TYPE DATE: "+vm.timeDuration);


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

        vm.changeTable();

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
            
            vm.startingBalance = vm.balance + vm.totalTransactions;

            $log.log("Starting Balance"+ vm.startingBalance);

           // vm.firstDate = vm.dateArray[0].slice(0, 10);

           // $log.log(vm.firstDate);

           if(vm.timeDuration == "W")
           {
              vm.amountDays = 7;
           }
           else if(vm.timeDuration == "M")

           {
              vm.amountDays = 31;
           }
           else
           {
              vm.amountDays = 365;
           }

            for(var j = 0; j < vm.amountDays; j++){
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


            data.addColumn('string', 'Date');
            vm.savingsLine = vm.balance + (vm.balance*(vm.savingsPercentage/100));
            data.addColumn('number', 'Balance');
            if(vm.showSavings==true)
            {

              data.addColumn('number', 'Savings Goal');
              for(var z=vm.newDateArray.length-1;z >=0; z--)
              {
                data.addRow([vm.newDateArray[z], vm.startingBalance+= vm.finalTransAmnt[z],vm.savingsLine]);
                $log.log("Amount of days "+ z +"  In loop to build graph"+vm.startingBalance)
              }
            }
            else
            {
              for(var z=vm.newDateArray.length-1;z >=0; z--)
              {
                data.addRow([vm.newDateArray[z], vm.startingBalance+= vm.finalTransAmnt[z]]);
                $log.log("Amount of days "+ z +"  In loop to build graph"+vm.startingBalance)
              }
            }

               
            // Set chart options
            var options = {'title' : 'Account Balance',
               hAxis: {
                  title: 'Date',
                  	textStyle:{color: '#FFF'}
               },
               vAxis: {
                  title: 'Balance',
               	minValue: 0,
               	textStyle:{color: '#FFF'}
               },   
               'width':1200,
               'height':1000,
               colors:['#df691a', '#1ae000'],
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

 
        function drawPieChart(dateArray, amountArray, balance) {
            // Define the chart to be drawn.
            
           
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


            if(vm.timeDuration == "W")
           {
              vm.amountDays = 7;
           }
           else if(vm.timeDuration == "M")

           {
              vm.amountDays = 31;
           }
           else
           {
              vm.amountDays = 365;
           }

            for(var j = 0; j < vm.amountDays; j++){
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
            for(var z=vm.newDateArray.length-1;z >=0; z--)
            {
              data.addRow([vm.newDateArray[z], vm.startingBalance+= vm.finalTransAmnt[z]]);

            }
            
               
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


            if(vm.timeDuration == "W")
           {
              vm.amountDays = 7;
           }
           else if(vm.timeDuration == "M")

           {
              vm.amountDays = 31;
           }
           else
           {
              vm.amountDays = 365;
           }

            for(var j = 0; j < vm.amountDays; j++){
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
            for(var z=vm.newDateArray.length-1;z >=0; z--)
            {
              data.addRow([vm.newDateArray[z], vm.startingBalance+= vm.finalTransAmnt[z]]);
            }
            
               
            // Set chart options
            var options = {'title' : 'Account Balance',
               hAxis: {
                  title: 'Date',
                  	textStyle:{color: '#FFF'}
               },
               vAxis: {
               	minValue: 0,
                  title: 'Balance',

               	textStyle:{color: '#FFF'}

            
               },   
               'width':1200,
               'height':1000,

               colors:['#df691a'],
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
