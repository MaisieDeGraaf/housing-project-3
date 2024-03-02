// Call URL using d3
let URL = 'http://127.0.0.1:5000/api/v1.0/housing';

d3.json(URL)
  .then(function(data) {
    // Log the loaded data for verification
    console.log(data);

    // Step 2: Create a canvas element for the chart
    let canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    document.body.appendChild(canvas);

    // Step 3: Define options for your charts
    let options = {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Cities' // Label for the x-axis
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value, index, values) {
              return '$' + value;
            }
          },
          scaleLabel: {
            display: true,
            labelString: 'Price'
          },
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      }
    };

    // Step 4: Create Chart.js instances
    let myChart1, myChart2, myChart3, myChart4, myChart5, myChart6, myChart7;

    // Step 5: Function to update chart data
    function updateChartData(chart, newData) {
      chart.data.datasets[0].data = newData;
      chart.update();
    }

    // Step 6: Extract data for visualization
    let cities = [];
    let neighborhoods = [];
    let averagePricesByCity = {};
    let averagePricesByNeighborhood = {};

    data.forEach(function(item) {
      let city = item.city;
      let neighborhood = item.neighbourhood;
      let Price = parseFloat(item.price);

      if (!isNaN(Price)) {
        if (!averagePricesByCity[city]) {
          averagePricesByCity[city] = [];
        }

        if (!averagePricesByNeighborhood[neighborhood]) {
          averagePricesByNeighborhood[neighborhood] = [];
        }

        if (cities.indexOf(city) === -1) {
          cities.push(city);
        }

        if (neighborhoods.indexOf(neighborhood) === -1) {
          neighborhoods.push(neighborhood);
        }

        averagePricesByCity[city].push(Price);
        averagePricesByNeighborhood[neighborhood].push(Price);
      }
    });

    // Calculate average prices for each city
    cities.forEach(city => {
      let totalPrice = averagePricesByCity[city].reduce((acc, cur) => acc + cur, 0);
      let countListed = averagePricesByCity[city].length;

      let averagePrice = countListed > 0 ? totalPrice / countListed : 0;

      averagePricesByCity[city] = averagePrice;
    });

    // Calculate average prices for each neighborhood
    neighborhoods.forEach(neighborhood => {
      let totalPrice = averagePricesByNeighborhood[neighborhood].reduce((acc, cur) => acc + cur, 0);
      let countListed = averagePricesByNeighborhood[neighborhood].length;

      let averagePrice = countListed > 0 ? totalPrice / countListed : 0;

      averagePricesByNeighborhood[neighborhood] = averagePrice;
    });

    // Create Chart.js instances
    myChart1 = new Chart(document.getElementById('chart1'), {
      type: 'bar',
      data: {
        labels: cities,
        datasets: [{
          label: 'Average Home Price (By City)',
          data: Object.values(averagePricesByCity),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: options
    });
    myChart4 = new Chart(document.getElementById('chart4'), {
      type: 'bar',
      data: {
        labels: neighborhoods,
        datasets: [{
          label: 'Average Home Price (By Neighborhood)',
          data: Object.values(averagePricesByNeighborhood),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: options
    });

    // Add 6th chart
    myChart6 = new Chart(document.getElementById('chart6'), {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'Houses Marked (by City)',
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          data: cities.map(city => ({
            x: city,
            y: data.filter(item => item.city === city).length,
            r: data.filter(item => item.city === city).length * 5
          }))
        }]
      },
      options: {
        scales: {
          y: {
            display: false
          }
        }
      }
    });

    // Add 7th chart
    myChart7 = new Chart(document.getElementById('chart7'), {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'Houses Marked (by Neighborhood)',
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          data: neighborhoods.map(neighborhood => ({
            x: neighborhood,
            y: data.filter(item => item.neighbourhood === neighborhood).length,
            r: data.filter(item => item.neighbourhood === neighborhood).length * 5
          }))
        }]
      },
      options: {
        scales: {
          y: {
            display: false
          }
        }
      }
    });

  }).catch(function(error) {
    console.log('Error loading data:', error);
  });
