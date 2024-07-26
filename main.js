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
    let data = fetch("")
    console.log("Access the data from the API")
};

function processData(){
    console.log("Process the data from the API JSON")
};

function processInput(){
    console.log("process the data the user inputs")
};

console.log(queryBuilder("London"));
