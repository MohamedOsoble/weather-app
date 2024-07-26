const APIKEY = "HT5ZKT8RYEGF3V64XZFXSYZ75"
const APISITESTART = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
const APISITEEND = "?unitGroup=metric&include=events%2Cdays%2Ccurrent%2Chours%2Calerts&key=" + APIKEY + "&contentType=json"


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
