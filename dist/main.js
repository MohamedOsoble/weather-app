(()=>{let e=document.getElementById("current-city"),n=document.getElementById("temp-current-value"),t=document.getElementById("temp-max-value"),o=document.getElementById("temp-min-value");document.getElementById("weather-image"),fetch(function(e){return"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+e+"?unitGroup=metric&include=events%2Cdays%2Ccurrent%2Chours%2Calerts&key=HT5ZKT8RYEGF3V64XZFXSYZ75&contentType=json"}("London"),{mode:"cors"}).then((function(e){return e.json()})).then((function(r){var c;c=r,e.innerHTML=c.address,n.innerHTML=c.currentConditions.temp,t.innerHTML=c.days[0].tempmax,o.innerHTML=c.days[0].tempmin,console.log(c)})).catch((function(e){console.log("Got an error"),console.log(e)}))})();