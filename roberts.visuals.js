/// Step 1: Load Chart.js library
let script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
document.head.appendChild(script);

// Step 2: Create a canvas element for the chart
let canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);

// Step 3: Define options for your charts
let options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
};

// Step 4: Create a new Chart instance with the canvas element
let ctx = canvas.getContext('2d');
let myChart1, myChart2, myChart3, myChart4;

// Step 5: Function to update chart data
function updateChartData(chart, newData) {
  chart.data.datasets[0].data = newData;
  chart.update();
}

// Step 6: Load CSV data using D3.js
d3.csv('housingdata.csv').then(function(data) {
  // Log the loaded data for verification
  console.log(data);

  // Convert data to numbers if needed
  data.forEach(function(d) {
    d.Value = +d.Value;
  });

  // Extract data for each chart
  let chartData1 = data.map(d => d.Data1);
  let chartData2 = data.map(d => d.Data2);
  let chartData3 = data.map(d => d.Data3);
  let chartData4 = data.map(d => d.Data4);

  // Step 7: Create Chart.js instances
  myChart1 = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.Label),
      datasets: [{
        label: 'Data 1',
        data: chartData1,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: options
  });

  myChart2 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.Label),
      datasets: [{
        label: 'Data 2',
        data: chartData2,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: options
  });

  myChart3 = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.Label),
      datasets: [{
        label: 'Data 3',
        data: chartData3,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      }]
    },
    options: options
  });

  myChart4 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.Label),
      datasets: [{
        label: 'Data 4',
        data: chartData4,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: options
  });
}).catch(function(error) {
  console.log('Error loading data:', error);
});
