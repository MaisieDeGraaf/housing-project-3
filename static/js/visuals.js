// Call URL using d3
let URL = 'http://127.0.0.1:5000/api/v1.0/housing';

d3.json(URL)
  .then(function(data) {
    // Log the loaded data for verification
    console.log(data);

    // Populate dropdown menu
    const dropdown = d3.select("#cityDropdown");
    const citys = ["All Cities", "Milton", "Oakville", "Vaughan", "Burlington", "Oshawa"];

    dropdown.selectAll("a")
        .data(citys)
        .enter()
        .append("a")
        .text(function(d) { return d; })
        .attr("href", "#");

    // Function to update charts based on selected city
    function updateCharts(selectedCity) {
        // Filter data for the selected city
        const cityData = data.filter(item => item.city === selectedCity);

        // Extract list and sale prices for the selected city
        const neighborhoodPrices = {};
        cityData.forEach(item => {
          const neighborhood = item.neighbourhood;
          const price = parseFloat(item.price);
          if (!neighborhoodPrices[neighborhood]) {
            neighborhoodPrices[neighborhood] = [];
          }
          neighborhoodPrices[neighborhood].push(price);
        });

        // Calculate average prices for each neighborhood in the selected city
        const neighborhoodAverages = {};
        Object.keys(neighborhoodPrices).forEach(neighborhood => {
          const prices = neighborhoodPrices[neighborhood];
          const averagePrice = prices.reduce((acc, cur) => acc + cur, 0) / prices.length;
          neighborhoodAverages[neighborhood] = averagePrice;
        });

        // Update chart datasets
        myChart4.data.labels = Object.keys(neighborhoodAverages);
        myChart4.data.datasets[0].data = Object.values(neighborhoodAverages);
        myChart4.update();

        // You can update myChart5 or any other chart similarly
    }

    // Event listener for dropdown change
    dropdown.selectAll("a").on("click", function() {
        const selectedCity = d3.select(this).text();
        updateCharts(selectedCity);
    });

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
    let averageListPricesByCity = {};
    let averageSalePricesByCity = {};
    let averageListPricesByNeighborhood = {};
    let averageSalePricesByNeighborhood = {};

    data.forEach(function(item) {
      let city = item.city;
      let neighborhood = item.neighbourhood;
      let listPrice = parseFloat(item.price);
      let salePrice = parseFloat(item.price); // Assuming the same for sale price

      if (!isNaN(salePrice)) {
        if (!averageListPricesByCity[city]) {
          averageListPricesByCity[city] = [];
          averageSalePricesByCity[city] = [];
        }

        if (!averageListPricesByNeighborhood[neighborhood]) {
          averageListPricesByNeighborhood[neighborhood] = [];
          averageSalePricesByNeighborhood[neighborhood] = [];
        }

        if (cities.indexOf(city) === -1) {
          cities.push(city);
        }

        if (neighborhoods.indexOf(neighborhood) === -1) {
          neighborhoods.push(neighborhood);
        }

        averageListPricesByCity[city].push(listPrice);
        averageSalePricesByCity[city].push(salePrice);
        averageListPricesByNeighborhood[neighborhood].push(listPrice);
        averageSalePricesByNeighborhood[neighborhood].push(salePrice);
      }
    });

    // Calculate average prices for each city
    cities.forEach(city => {
      let totalListPrice = averageListPricesByCity[city].reduce((acc, cur) => acc + cur, 0);
      let totalSalePrice = averageSalePricesByCity[city].reduce((acc, cur) => acc + cur, 0);
      let countListed = averageListPricesByCity[city].length;
      let countSold = averageSalePricesByCity[city].length;

      let averageListPrice = countListed > 0 ? totalListPrice / countListed : 0;
      let averageSalePrice = countSold > 0 ? totalSalePrice / countSold : 0;

      averageListPricesByCity[city] = averageListPrice;
      averageSalePricesByCity[city] = averageSalePrice;
    });

    // Calculate average prices for each neighborhood
    neighborhoods.forEach(neighborhood => {
      let totalListPrice = averageListPricesByNeighborhood[neighborhood].reduce((acc, cur) => acc + cur, 0);
      let totalSalePrice = averageSalePricesByNeighborhood[neighborhood].reduce((acc, cur) => acc + cur, 0);
      let countListed = averageListPricesByNeighborhood[neighborhood].length;
      let countSold = averageSalePricesByNeighborhood[neighborhood].length;

      let averageListPrice = countListed > 0 ? totalListPrice / countListed : 0;
      let averageSalePrice = countSold > 0 ? totalSalePrice / countSold : 0;

      averageListPricesByNeighborhood[neighborhood] = averageListPrice;
      averageSalePricesByNeighborhood[neighborhood] = averageSalePrice;
    });

    // Create Chart.js instances
    myChart1 = new Chart(document.getElementById('chart1'), {
      type: 'bar',
      data: {
        labels: cities,
        datasets: [{
          label: 'Average List Price',
          data: Object.values(averageListPricesByCity),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: options
    });

    myChart2 = new Chart(document.getElementById('chart2'), {
      type: 'bar',
      data: {
        labels: cities,
        datasets: [{
          label: 'Average Sale Price',
          data: Object.values(averageSalePricesByCity),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: options
    });

    myChart3 = new Chart(document.getElementById('chart3'), {
      type: 'bar',
      data: {
        labels: cities,
        datasets: [{
          label: 'Average List Price',
          data: Object.values(averageListPricesByCity),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }, {
          label: 'Average Sale Price',
          data: Object.values(averageSalePricesByCity),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: options
    });

    myChart4 = new Chart(document.getElementById('chart4'), {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Average List Price',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: options
    });

    myChart5 = new Chart(document.getElementById('chart5'), {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Average Sale Price',
          data: [],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
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
