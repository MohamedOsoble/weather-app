// Set imports for project
import './style.css';

// Set up API website and API Key
const APIKEY = "HT5ZKT8RYEGF3V64XZFXSYZ75"
const APISITESTART = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
const APISITEEND = "?unitGroup=metric&include=events%2Cdays%2Ccurrent%2Chours%2Calerts&key=" + APIKEY + "&contentType=json"

// Initialize °C const
const DEGREE = "°C"

// Initialize Current location and Date elements
const currCity = document.getElementById('curr-location');
const currDate = document.getElementById('curr-date');

// Initialize current weather elements
const currTemp = document.getElementById('curr-temp');
const currMinMax = document.getElementById('curr-min-max');
const feelsLikeTemp = document.getElementById('curr-feels-like');
const currWeatherImg = document.getElementById('curr-weather-img');
const currWeatherDesc = document.getElementById('curr-weather-desc');
const currFeelsLike = document.getElementById('curr-feels-like');

// Initialize weekly forecast elements
// To be entered dynamically later

//Initialize button to handle updating location/temp
//document.getElementById('search-button').addEventListener("click", console.log(document.getElementById('location-search').value))

function queryBuilder(location){
    return APISITESTART + location + APISITEEND

};

function fetchData(location){
    let data = fetch(queryBuilder(location), {mode: 'cors'})
    .then(function(response) {
        return response.json()
    })
    .then(function(response){
        processData(response)
    })
    .catch(function(err) {
        console.log("Got an error")
        console.log(err)
    })
};

function processData(data){
    console.log(data)
    currCity.textContent = data.resolvedAddress;
    currDate.textContent = getDate() + " " + data.currentConditions.datetime;
    currTemp.textContent = data.currentConditions.temp + DEGREE;
    currWeatherImg.src = getIcon(data.currentConditions.icon)
    currWeatherImg.alt = data.currentConditions.conditions + ' icon';
    currWeatherDesc.textContent = data.currentConditions.conditions;
    currFeelsLike.textContent = "Feels like: " + data.currentConditions.feelslike + DEGREE
    currMinMax.textContent = "Min Today: " + data.days[0].tempmin + DEGREE + " | Max Today: " + data.days[0].tempmax + DEGREE;
    // currMinMax.innerHTML = data.days[0].tempmax
    // feelsLikeTemp.innerHTML = data.days[0].tempmin
    // console.log(data)
};

function processInput(location){
    fetchData(location)
};

function getDate(){
    let timeElapsed = Date.now();
    let today = new Date(timeElapsed);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    return today.toLocaleString('en-GB', options);
}

function getIcon(iconName){
    return './icons/' + iconName.toString() + '.png';
};

processInput("London");
