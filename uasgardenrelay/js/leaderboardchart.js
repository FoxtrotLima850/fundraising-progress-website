
/* Should I use this?
jQuery(document).ready(function($) {

} */


$(document).ready(function() {
    var ctx = document.getElementById('leaderboardChart');
    
    // AJAX request to get each UAS' progress
    $.ajax({    //create an ajax request to getProgress.php
        type: "GET",
        url: "./php/getUASProgress.php",             
        dataType: "json",   //expect json to be returned
        data: { 
            //access_key: access_key, 
        },                
        success: function(response){
            //alert(response.totaldist);
            //console.log(response.data) // array of UASs and distances (data.UAS, and data.distance respectively)
            var UAS_arr = [];
            var dist_arr = [];
            response.data.forEach(function(dat) {
                UAS_arr.push(dat.UAS);
                dist_arr.push(dat.distance);
            });
            
            var myChart = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: UAS_arr,
                    datasets: [{
                        label: 'km run',
                        data: dist_arr,
                        backgroundColor: 'rgba(12, 100, 187)',
                        barPercentage: 0.7
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "Distance run (km)",
                            }
                        }]
                    },
                    legend: {
                        display: false
                    },
                    maintainAspectRatio: false,
                }
            });
        }
    });
});
