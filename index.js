function getWeather() {

    const customSelect = document.getElementById('custom-select');
    let selectedCountry = customSelect.value;
   
    let air = document.getElementById("air");
    console.log('theAir is ',air);
  
    let airValue = air.options[air.selectedIndex];
    console.log('the AirValue is ',airValue,airValue.value);
    console.log(airValue.innerText);
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=bc9e35e67d454381a5a62032240202&q=${selectedCountry}&aqi=${airValue.innerText}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherContainer = document.getElementById('weather-container');
            let temp = "";
            if(airValue.innerText === "no"){
                temp = "data is not Available:";
            }
            else{
                temp = data.current.air_quality.co;
            }
            weatherContainer.innerHTML = `
            <table id="weather-table">
            <thead>
                <tr>
                    <th>Capital</th>
                    <th>Region</th>
                    <th>Country</th>
                    <th>Timezone ID</th>
                    <th>Temperature (°C)</th>
                    <th>Temperature (°F)</th>
                  
                </tr>
            </thead>
            <tbody id="weather-container">
              <tr>
               <td>${data.location.name}</td>
               <td>${data.location.region}</td>
               <td>${data.location.country}</td>
               <td>${data.location.tz_id}</td>
               <td>${data.current.temp_c}</td>
               <td>${data.current.temp_f}</td>
               

              </tr>
            </tbody>
        </table>
        <div id="button-container">
        <button id="reset">Reset</button>
    </div>
               
            `;

            document.getElementById("reset").addEventListener('click',()=>{
                weatherContainer.innerHTML = "";
            })
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

