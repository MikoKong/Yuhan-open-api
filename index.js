fetch("https://api.open-meteo.com/v1/forecast?latitude=47.6062&longitude=-122.3321&daily=weather_code,sunrise,sunset,precipitation_probability_max,precipitation_hours,precipitation_sum&hourly=temperature_2m,precipitation_probability&current=temperature_2m,rain,is_day,relative_humidity_2m")
    .then((response) => {
        if(!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
    .then((data) => {
        const location = document.getElementById('location');
        location.textContent += `Latitude: ${data.latitude} Longitude: ${data.longitude}`;

        const rain = document.getElementById('rain');
        rain.textContent += `Current rainfall :${data.current.rain}`;

        const tempe = document.createElement('p');
        tempe.textContent = `Current temperature :${data.current.temperature_2m}°F`
        document.body.appendChild(tempe);
    })
    .catch((error) =>{
        console.error(error);
    });