// Store arrays for each feature (median value ordered by year)
let years = featuresByYear['year'];
let danceability = featuresByYear['danceability'];
let energy = featuresByYear['energy'];
let loudness = featuresByYear['loudness'];
let speechiness = featuresByYear['speechiness'];
let acousticness = featuresByYear['acousticness'];
let instrumentalness = featuresByYear['instrumentalness'];
let liveness = featuresByYear['liveness'];
let valence = featuresByYear['valence'];
let tempo = featuresByYear['tempo'];
let duration_ms = featuresByYear['duration_ms'];


let featuresCanvas = document.getElementById("featuresChart");

let danceabilityData = {
    label: "Danceability",
    data: danceability,
    lineTension: 0,
    fill: false
    // borderColor: 'red'
};

let energyData = {
    label: "Energy",
    data: energy,
    lineTension: 0,
    fill: false
    // borderColor: 'blue'
};

let loudnessData = {
    label: "Loudness",
    data: loudness,
    lineTension: 0,
    fill: false
    // borderColor: 'blue'
};

let speechinessData = {
    label: "Speechiness",
    data: speechiness,
    lineTension: 0,
    fill: false
    // borderColor: 'blue'
};

let acousticnessData = {
    label: "Acousticness",
    data: acousticness,
    lineTension: 0,
    fill: false
};
  
let livenessData = {
    label: "Liveness",
    data: liveness,
    lineTension: 0,
    fill: false
};

let featuresYearlyData = {
    labels: years,
    datasets: [danceabilityData, energyData, loudnessData, 
        speechinessData, acousticnessData, livenessData]
  };

let chartOptions = {
    maintainAspectRatio: false,
    scales: {
        y: {
            title: {
                display: true,
                text: 'Yearly Median Value'
            }
        }
    },
    legend: {
        display: true,
        position: 'top',
        labels: {
            boxWidth: 80,
            fontColor: 'black'
        }
    }
};

const lineChart = new Chart(featuresCanvas, {
    type: 'line',
    data: featuresYearlyData,
    options: chartOptions
});

/////////////////////////////////////

let ctx = document.getElementById('gauge-canvas').getContext('2d');;

let gaugeChart = new Chart(ctx, {
    type:"doughnut",
    data: {
        labels : ["Billboard Hit","Non-Charting"],
        datasets: [{
            label: "Gauge",
            data : [.902,.098],
            backgroundColor: ["#56AADD",
                                "#f4974d"
            ]
        }]
    },
    options: {
        responsive:true,
        maintainAspectRatio: false,
        circumference: 180,
        rotation : -90,
        cutoutPercentage : 80,
        plugins: {
            datalabels: {
                display: 'true',
                // color: 'white',
                formatter: function (value, context) {
                    return context.chart.data.labels[
                        context.dataIndex
                    ];
                },
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderColor: '#ffffff',
                color: function(context) {
                    return context.dataset.backgroundColor;
                },
                // font: function(context) {
                //     var w = context.chart.width;
                //     return {
                //         size: w < 512 ? 18 : 20
                //     }
                // },
                align: 'end',
                anchor: 'end',
                offset: 0,
                borderRadius: 4,
                borderWidth: 1
            }
        },
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        }
    }
});


function change_gauge(chart, label, data){
    chart.data.datasets.forEach((dataset) => {
      if(dataset.label == label){
        dataset.data = data;
      }  
    });
    chart.update();
}
