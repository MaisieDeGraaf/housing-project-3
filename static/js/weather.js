let weatherURL = "http://127.0.0.1:5000/api/v1.0/weather";

d3.json(weatherURL).then(weatherData => {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();
    
    let weatherDataForCurrentMonthDay = weatherData.filter(entry => {
        let entryDate = new Date(entry.local_date);
        return entryDate.getMonth() + 1 === currentMonth && entryDate.getDate() === currentDay;
    });

    // Calculate average values
    let averageMaxTemperature = weatherDataForCurrentMonthDay.reduce((acc, curr) => acc + curr.max_temperature, 0) / weatherDataForCurrentMonthDay.length;
    let averageMinTemperature = weatherDataForCurrentMonthDay.reduce((acc, curr) => acc + curr.min_temperature, 0) / weatherDataForCurrentMonthDay.length;
    let averageWindSpeed = weatherDataForCurrentMonthDay.reduce((acc, curr) => acc + curr.wind_speed, 0) / weatherDataForCurrentMonthDay.length;
    let averagePrecipitation = weatherDataForCurrentMonthDay.reduce((acc, curr) => acc + curr.total_precipitation, 0) / weatherDataForCurrentMonthDay.length;

    // Display average weather information
    let weatherBox = document.getElementById("weather-box");
    weatherBox.innerHTML = `
        <h2>Weather Information for ${currentMonth}/${currentDay}</h2>
        <p>Average Max Temperature: ${averageMaxTemperature.toFixed(2)}</p>
        <p>Average Min Temperature: ${averageMinTemperature.toFixed(2)}</p>
        <p>Average Wind Speed: ${averageWindSpeed.toFixed(2)}</p>
        <p>Average Precipitation: ${averagePrecipitation.toFixed(2)}</p>
    `;
})