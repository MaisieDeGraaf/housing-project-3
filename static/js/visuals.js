// Call URL using d3
let URL = 'http://127.0.0.1:5000/api/v1.0/housing';
let weatherURL = "http://127.0.0.1:5000/api/v1.0/weather";

d3.json(weatherURL).then(weatherData => {
    console.log("Weather data:", weatherData);
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();

    let weatherDataForCurrentDate = weatherData.filter(entry => {
        let entryDate = new Date(entry.local_date);
        let entryMonth = entryDate.getMonth() + 1;
        let entryDay = entryDate.getDate();
        return entryMonth === currentMonth && entryDay === currentDay;
    });
    console.log("Weather data for current month and day:", weatherDataForCurrentDate);

    let averageMaxTemperature = weatherDataForCurrentDate.reduce((acc, curr) => acc + curr.max_temperature, 0) / weatherDataForCurrentDate.length;
    let averageMinTemperature = weatherDataForCurrentDate.reduce((acc, curr) => acc + curr.min_temperature, 0) / weatherDataForCurrentDate.length;
    let averageWindSpeed = weatherDataForCurrentDate.reduce((acc, curr) => acc + curr.wind_speed, 0) / weatherDataForCurrentDate.length;
    let averagePrecipitation = weatherDataForCurrentDate.reduce((acc, curr) => acc + curr.total_precipitation, 0) / weatherDataForCurrentDate.length;

    let weatherBox = document.getElementById("weather-box");
    weatherBox.innerHTML = `
        <h2>Weather Information for ${currentMonth}/${currentDay}</h2>
        <p>Average Max Temperature: ${averageMaxTemperature.toFixed(2)}</p>
        <p>Average Min Temperature: ${averageMinTemperature.toFixed(2)}</p>
        <p>Average Wind Speed: ${averageWindSpeed.toFixed(2)}</p>
        <p>Average Precipitation: ${averagePrecipitation.toFixed(2)}</p>
    `;
});

document.getElementById('weather-toggle').addEventListener('click', function() {
    let weatherBox = document.getElementById('weather-box');
    let arrowIcon = document.getElementById('arrow-icon');
    
    if (weatherBox.style.display === 'none') {
        weatherBox.style.display = 'block';
        arrowIcon.classList.add('fa-chevron-up');
        arrowIcon.classList.remove('fa-chevron-down');
    } else {
        weatherBox.style.display = 'none';
        arrowIcon.classList.remove('fa-chevron-up');
        arrowIcon.classList.add('fa-chevron-down');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let currentDate = new Date();
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = currentDate.toLocaleDateString('en-US', options);
    document.getElementById('weather-header').textContent += formattedDate;
});

d3.json(URL)
  .then(function(data) {
    // Log the loaded data for verification
    console.log(data);

    // Extract house status types and their counts
    let houseStatusCounts = {};

    data.forEach(function(item) {
      let houseStatus = item.status;
      if (!houseStatusCounts[houseStatus]) {
        houseStatusCounts[houseStatus] = 1;
      } else {
        houseStatusCounts[houseStatus]++;
      }
    });

    // Get house status labels and counts
    let houseStatusLabels = Object.keys(houseStatusCounts);
    let houseStatusData = Object.values(houseStatusCounts);

    
    // Populate dropdown menu
    const dropdown = d3.select("#cityDropdown");
    const citys = ["All Cities","Burlington", "Milton", "Oakville","Oshawa", "Vaughan"];

    dropdown.selectAll("a")
        .data(citys)
        .enter()
        .append("a")
        .text(function(d) { return d; })
        .attr("href", "#");

   // Function to update charts based on selected city
    function updateCharts(selectedCity) {
        // Filter data for the selected city or show all data if "All Cities" is selected
        const cityData = selectedCity === "All Cities" ? data : data.filter(item => item.city === selectedCity);
        // Extract house status types and their counts
        let houseStatusCounts = {};

        cityData.forEach(function(item) { // Change 'data' to 'cityData'
            let houseStatus = item.status;
            if (!houseStatusCounts[houseStatus]) {
                houseStatusCounts[houseStatus] = 1;
            } else {
                houseStatusCounts[houseStatus]++;
            }
        });

        // Get house status labels and counts
        let houseStatusLabels = Object.keys(houseStatusCounts);
        let houseStatusData = Object.values(houseStatusCounts);

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

        // Extract house types and their counts for the selected city
        let houseTypes = {};
        cityData.forEach(function(item) {
            let houseType = item.type_of_house;
            if (!houseTypes[houseType]) {
                houseTypes[houseType] = 0;
            }
            houseTypes[houseType]++;
        });

        myChart1.data.labels = houseStatusLabels;
        myChart1.data.datasets[0].data = houseStatusData;
        myChart1.update();

        myChart4.data.labels = Object.keys(neighborhoodAverages);
        myChart4.data.datasets[0].data = Object.values(neighborhoodAverages);
        myChart4.update();

        // Update chart 5 data
        myChart5.data.labels = Object.keys(houseTypes);
        myChart5.data.datasets[0].data = Object.values(houseTypes);
        myChart5.update();

        // Update chart 7 data
        myChart7.data.labels = Object.keys(neighborhoodPrices);
        myChart7.data.datasets[0].data = Object.values(neighborhoodPrices).map(prices => prices.length);
        myChart7.update();
    }

    // Event listener for dropdown change
    dropdown.selectAll("a").on("click", function() {
        const selectedCity = d3.select(this).text();
        updateCharts(selectedCity);
    });

    // Extract house types and their counts
    let houseTypes = {};
    data.forEach(function(item) {
        let houseType = item.type_of_house;
        if (!houseTypes[houseType]) {
            houseTypes[houseType] = 0;
        }
        houseTypes[houseType]++;
    });

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
    let myChart1, myChart3, myChart4, myChart5, myChart6, myChart7;

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
        let salePrice = parseFloat(item.sold_price);

        // Only consider entries where salePrice is not zero
        if (!isNaN(salePrice) && salePrice !== 0) {
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

   
    myChart1 = new Chart(document.getElementById('chart1'), {
        type: 'doughnut',
        data: {
            labels: houseStatusLabels,
            datasets: [{
                label: 'House Status',
                data: houseStatusData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)' // Add more colors if needed
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins:{
                title: {
                    display: true,
                    text: 'House Status',
                    font : {size:20}
            }},
            legend: {
                display: true,
                position: 'right',
                labels: {
                    boxWidth: 20
                }
            }
        }
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
        options: {
            plugins:{
                    title:{
                        display:true,
                        text: 'Average List Price vs Average Sale Price per City',
                        font : {size : 20}

                    }},
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Cities'
                    }
                },
                y: {
                    title:{
                        display: true,
                        text: 'Price'
                    },
                    beginAtZero: true,
                    ticks: {
                        callback: function(value, index, values) {
                            return '$' + value.toLocaleString();
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
        }
    });

    myChart4 = new Chart(document.getElementById('chart4'), {
      type: 'bar',
      data: {
          labels: Object.keys(averageListPricesByNeighborhood), // Use neighborhood names as labels
          datasets: [{
              label: 'Average List Price',
              data: Object.values(averageListPricesByNeighborhood),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
          }, {
              label: 'Average Sale Price',
              data: Object.values(averageSalePricesByNeighborhood),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
          }]
      },
      options: {
            plugins :{
                title : {
                    display: true,
                    text : 'Average List Price vs Average Sale Price per Neighborhood',
                    font: {size : 20}
                    
                }},
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Neighborhoods' // Label for the x-axis
                  }
              },
              y: {
                title : {
                    display : true,
                    text : 'Price'
                },
                  beginAtZero: true,
                  ticks: {
                      callback: function(value, index, values) {
                          return '$' + value.toLocaleString();
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
      }
  });

  myChart5 = new Chart(document.getElementById('chart5'), {
    type: 'bar',
    data: {
        labels: Object.keys(houseTypes),
        datasets: [{
            label: 'Number of Houses',
            data: Object.values(houseTypes),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {            
        plugins : {
            title : {
                display : true,
                text : 'Number of Houses per House Type',
                font : {size :20}

        }},
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Type of House'
                }
            },
            y: {
                title : {
                    display : true,
                    text: 'Number of Houses'
                },
                beginAtZero: true,
                ticks: {
                    callback: function(value, index, values) {
                        return value; // Remove '$' from the axis
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Number of Houses'
                },
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            }
        }
    }
});


    // Add 6th chart (changed to Polar Area)
    myChart6 = new Chart(document.getElementById('chart6'), {
        type: 'polarArea',
        data: {
            labels: cities,
            datasets: [{
                label: 'Houses Marked (by City)',
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
                data: cities.map(city => data.filter(item => item.city === city).length)
            }]
        },
        options: {
            plugins : {
                title : {
                    display : true,
                    text : 'Number of Houses per City',
                    font : {size : 20}
                }},
            scale: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    });

    // Add 7th chart (changed to Pie Chart)
    myChart7 = new Chart(document.getElementById('chart7'), {
        type: 'pie',
        data: {
            labels: neighborhoods,
            datasets: [{
                label: 'Houses Marked (by Neighborhood)',
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
                data: neighborhoods.map(neighborhood => data.filter(item => item.neighbourhood === neighborhood).length)
            }]
        },
        options: {
            plugins: {
                title:{
                    display : true,
                    text : 'Number of Houses per Neighborhood',
                    font : {size : 20}

            }},
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
