// Set up API website and API Key

const APIKEY = "HT5ZKT8RYEGF3V64XZFXSYZ75"
const APISITESTART = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
const APISITEEND = "?unitGroup=metric&include=events%2Cdays%2Ccurrent%2Chours%2Calerts&key=" + APIKEY + "&contentType=json"

// Initialize HTML elements to update with weather

let cityNameElement = document.getElementById('temp-city');
let currentTempElement = document.getElementById('temp-current-value');
let maxTempElement = document.getElementById('temp-max-value');
let minTempElement = document.getElementById('temp-min-value');
let weatherImageElement = document.getElementById('weather-image')

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
    cityNameElement.innerHTML = data.address;
    currentTempElement.innerHTML = data.currentConditions.temp;
    maxTempElement.innerHTML = data.days[0].tempmax
    minTempElement.innerHTML = data.days[0].tempmin
    console.log(data)
};

function processInput(location){
    fetchData(location)
};

processInput("London");
