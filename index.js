document.getElementById('checkWeather').addEventListener('click', async() =>{
    const cityName = document.getElementById('cityName').value.trim();
    if(!cityName) {
        alert("Please check the city name");
        return;
    }
    try {
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`);
        if(!geoResponse.ok) {
            throw new Error(geoResponse.status);
        }
        const geoData = await geoResponse.json();
    
        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;
        const userCityName = geoData.results[0].name;

        const weatherResponse = await fetch( `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation&temperature_unit=fahrenheit&precipitation_unit=mm` );
        if(!weatherResponse.ok) {
            throw new Error(weatherResponse.status);
        }
        const weatherData = await weatherResponse.json();

        const rain = weatherData.current.precipitation ?? 0;
        const temperature = weatherData.current.temperature_2m;
        
        document.getElementById('location').textContent = `Location: ${userCityName}`;
        document.getElementById('rain').textContent = `Current rainfall: ${rain} mm`;
        document.getElementById('temperature').textContent = `Current temperature: ${temperature}°F`;

        if(rain > 0) {
            document.getElementById('umbrella').textContent = "☔ Don't forget to bring an umbrella!";
            document.body.style.backgroundColor = "#7FA1C3";
        } else {
            document.getElementById('umbrella').textContent = "No rain today :)";
            document.body.style.backgroundColor = "#D38CAD";
        }
    } catch(error) {
        console.error(error);
    }
});