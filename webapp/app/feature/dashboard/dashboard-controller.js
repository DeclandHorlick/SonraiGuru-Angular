"use strict";

(function() {

    var DashboardController =  function(dashboardService, $log, $cookies) {
        
    	var vm = this;

      // vm.timeFrame="2016-03-29";
      vm.timeFrame;

      vm.user_name_cookie = $cookies.get('Username');

      $log.log("Dash: "+vm.user_name_cookie);

      vm.changeTable = function()
      {
          vm.timeDetails = {
               dateTo : "2016-09-04", 
               dateFrom : vm.timeFrame
         };
            
            $log.log(vm.timeDetails);

            dashboardService.getTransactions(vm.timeDetails).then(function (results) {
            
            vm.transactions = results;
            $log.log(vm.transactions);
            $log.log("In the dashboard controller the value of the result promise is ");
            $log.log(JSON.stringify(vm.transactions));         
            
            }, function (error) {
                vm.error = true;
                vm.errorMessage = error;
            });
      }

        // vm.changeTable();

        function drawLineChart() {
            // Define the chart to be drawn.
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
            var chart = new google.visualization.LineChart(document.getElementById('container'));
            chart.draw(data, options);
         }

        specifyTypeChart(drawLineChart);

         function specifyTypeChart(type) {
            google.charts.setOnLoadCallback(type);
         }

          function drawPieChart()
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

          function drawBarChart()
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
            var chart = new google.visualization.BarChart(document.getElementById('container'));
            chart.draw(data, options);
        }


            
    };

    angular.module('chartApp').controller('dashboardController', ['dashboardService','$log', '$cookies', DashboardController]);
}());
