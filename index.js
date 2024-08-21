// Set up API website and API Key
const APIKEY = "HT5ZKT8RYEGF3V64XZFXSYZ75"
const APISITESTART = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
const APISITEEND = "?unitGroup=metric&include=events%2Cdays%2Ccurrent%2Chours%2Calerts&key=" + APIKEY + "&contentType=json"

// Initialize °C const
const DEGREE = "°C"

// Initialize days of week array
const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Initialize Search elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('location-search');
const searchButton = document.getElementById('search-button')
searchForm.addEventListener("click", function(event){
    event.preventDefault()
    searchLocation();

});

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
const weeklyContainer = document.getElementById('forecast-card-container');
const weeklyForecast = document.getElementById('weekly-title');


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
    currCity.textContent = data.resolvedAddress;
    currDate.textContent = getDate() + " " + data.currentConditions.datetime;
    currTemp.textContent = data.currentConditions.temp + DEGREE;
    currWeatherImg.src = getIcon(data.currentConditions.icon)
    currWeatherImg.alt = data.currentConditions.conditions + ' icon';
    currWeatherDesc.textContent = data.currentConditions.conditions;
    currFeelsLike.textContent = "Feels like: " + data.currentConditions.feelslike + DEGREE
    currMinMax.textContent = "Min Today: " + data.days[0].tempmin + DEGREE + " | Max Today: " + data.days[0].tempmax + DEGREE;
    processForecast(data.days);
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

function processForecast(forecastArray){

    // Clear all forecasts
    weeklyForecast.innerHTML = '<h3> Weekly Forecast: </h3>'
    for(let i = 1; i < 7; i++){
        genForecastCard(forecastArray[i], i)
    };
};

function genForecastCard(forecast, day){

    container = createCardDivs(day);
    weeklyContainer.appendChild(container)
    iconDiv = document.getElementById('day-' + day + '-icon');
    dateDiv = document.getElementById('day-' + day + '-day');
    tempHigh = document.getElementById('day-' + day + '-high');
    tempLow = document.getElementById('day-' + day + '-low');

    // Get day of week
    date = new Date(forecast.datetime);
    weekDay = dayOfWeek[date.getDay()];

    // Update card content
    iconDiv.src = getIcon(forecast.icon);
    iconDiv.alt = forecast.icon + ' icon'
    dateDiv.textContent = weekDay;
    tempHigh.textContent = 'High: ' + forecast.tempmax + DEGREE;
    tempLow.textContent = 'Low: ' + forecast.tempmin + DEGREE;

};

function createDiv(){
    let div = document.createElement('div');
    return div
};

function createCardDivs(day){

    let containerDiv = createDiv();
    let iconDiv = document.createElement('img');
    let dateDiv = createDiv();
    let tempContainer = createDiv();
    let tempHigh = createDiv();
    let tempLow = createDiv();

    containerDiv.setAttribute('class', 'forecast-card');
    containerDiv.id = ('day-' + day + '-container');
    iconDiv.id = ('day-' + day + '-icon');
    dateDiv.id = ('day-' + day + '-day');
    tempContainer.id = ('day-' + day + '-temp-container');
    tempContainer.setAttribute('class', 'temp-container');
    tempHigh.id = ('day-' + day + '-high')
    tempLow.id = ('day-' + day + '-low')

    containerDiv.appendChild(iconDiv);
    containerDiv.appendChild(dateDiv);

    tempContainer.appendChild(tempHigh);
    tempContainer.appendChild(tempLow);

    containerDiv.appendChild(tempContainer);
    return containerDiv;

};

function searchLocation(){
    const newLocation = searchInput.value;
    processInput(newLocation);
};

processInput("London");
