// Call URL using d3
let URL = 'http://127.0.0.1:5000/api/housing';

d3.json(URL)
  .then(function(data) {
    // Log the loaded data for verification
    console.log(data);

    // Step 1: Load Chart.js library
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
    let myChart1, myChart2, myChart3, myChart4, myChart5, myChart6, myChart7;

    // Step 5: Function to update chart data
    function updateChartData(chart, newData) {
      chart.data.datasets[0].data = newData;
      chart.update();
    }

    // Step 6: Calculate average prices for each city and neighborhood
    let cities = [];
    let neighborhoods = [];
    let averageListPricesByCity = {};
    let averageSalePricesByCity = {};
    let averageListPricesByNeighborhood = {};
    let averageSalePricesByNeighborhood = {};

    data.forEach(function(item) {
      let city = item.City;
      let neighborhood = item.Neighborhood;
      let listPrice = parseFloat(item.Price);
      let salePrice = parseFloat(item.SalePrice);

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

    // Step 7: Create Chart.js instances
    myChart1 = new Chart(ctx, {
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

    myChart2 = new Chart(ctx, {
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

    myChart3 = new Chart(ctx, {
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

    myChart4 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: neighborhoods,
        datasets: [{
          label: 'Average List Price',
          data: Object.values(averageListPricesByNeighborhood),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: options
    });

    myChart5 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: neighborhoods,
        datasets: [{
          label: 'Average Sale Price',
          data: Object.values(averageSalePricesByNeighborhood),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: options
    });

    // Add 6th chart
    myChart6 = new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'Houses Marked (by City)',
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          data: cities.map(city => ({
            x: city,
            y: data.filter(item => item.City === city).length, // Number of houses marked
            r: data.filter(item => item.City === city).length * 5 // Bubble size based on the number of houses
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
    myChart7 = new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'Houses Marked (by Neighborhood)',
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          data: neighborhoods.map(neighborhood => ({
            x: neighborhood,
            y: data.filter(item => item.Neighborhood === neighborhood).length, // Number of houses marked
            r: data.filter(item => item.Neighborhood === neighborhood).length * 5 // Bubble size based on the number of houses
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

    // Event listener for city selection
    document.querySelectorAll('#cityDropdown .dropdown-content a').forEach(item => {
      item.addEventListener('click', function() {
        let selectedCity = this.getAttribute('data-info');
        console.log("Selected city: ", selectedCity); // For testing purposes, log the selected city

        // Update charts based on the selected city
        updateCharts(selectedCity);
      });
    });

    // Function to update charts based on the selected city
    function updateCharts(selectedCity) {
      // Your logic to fetch data based on the selected city and its neighborhoods
      // Update charts (Chart 3 and Chart 4) with new data
      let averagePrices = calculateAveragePrices(selectedCity, data);

      // Update Chart 3 with new data
      myChart3.data.labels = ['Average List Price', 'Average Sale Price'];
      myChart3.data.datasets[0].data = [averagePrices.averageListPrice, averagePrices.averageSalePrice];
      myChart3.update();
    }

    // Function to calculate average prices for the selected city
    function calculateAveragePrices(selectedCity, data) {
      let filteredData = data.filter(item => item.City === selectedCity);
      let averageListPrice = 0;
      let averageSalePrice = 0;
      let countListed = 0;
      let countSold = 0;

      filteredData.forEach(function(item) {
        let listPrice = parseFloat(item.Price);
        let salePrice = parseFloat(item.SalePrice);

        if (!isNaN(listPrice)) {
          averageListPrice += listPrice;
          countListed++;
        }

        if (!isNaN(salePrice)) {
          averageSalePrice += salePrice;
          countSold++;
        }
      });

      if (countListed > 0) {
        averageListPrice /= countListed;
      }

      if (countSold > 0) {
        averageSalePrice /= countSold;
      }

      return {
        averageListPrice: averageListPrice,
        averageSalePrice: averageSalePrice
      };
    }

  }).catch(function(error) {
    console.log('Error loading data:', error);
  });
