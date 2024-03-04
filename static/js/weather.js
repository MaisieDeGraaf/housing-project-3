let weatherURL = "http://127.0.0.1:5000/api/v1.0/weather";

d3.json(weatherURL).then(weatherData => {

  let currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  let weatherDataForCurrentDate = weatherData.filter(entry => entry.local_date === currentDate);

  // Calculate average values
  let averageMaxTemperature = weatherDataForCurrentDate.reduce((acc, curr) => acc + curr.max_temperature, 0) / weatherDataForCurrentDate.length;
  let averageMinTemperature = weatherDataForCurrentDate.reduce((acc, curr) => acc + curr.min_temperature, 0) / weatherDataForCurrentDate.length;
  let averageWindSpeed = weatherDataForCurrentDate.reduce((acc, curr) => acc + curr.wind_speed, 0) / weatherDataForCurrentDate.length;
  let averagePrecipitation = weatherDataForCurrentDate.reduce((acc, curr) => acc + curr.total_precipitation, 0) / weatherDataForCurrentDate.length;

  // Display average weather information
  let weatherBox = document.getElementById("weather-box");
  weatherBox.innerHTML = `
      <h2>Weather Information for ${currentDate}</h2>
      <p>Average Max Temperature: ${averageMaxTemperature.toFixed(2)}</p>
      <p>Average Min Temperature: ${averageMinTemperature.toFixed(2)}</p>
      <p>Average Wind Speed: ${averageWindSpeed.toFixed(2)}</p>
      <p>Average Precipitation: ${averagePrecipitation.toFixed(2)}</p>
  `;
});

