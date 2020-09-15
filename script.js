var cityInfo = [ 
    {
        name: "",
        icon: "",
        lat: "",
        lon: "",
        temp: "",
        humidity: "", 
        wind: "",
        UVindex: ""
    },
    {
        icon: [],
        temp: [],
        humidity: [],
    }

]

init();

function init() {
    // Parsing the JSON string to time block object
    var storedCityInfo = JSON.parse(localStorage.getItem("cityInfo"));
    // If todos were retrieved from localStorage, update the todos array to it
    if (storedCityInfo !== null) {
    cityInfo = storedCityInfo;
    } 
    // Render time blocks
   
};


var storeCityInfo = function(){
    localStorage.setItem("cityInfo",JSON.stringify(cityInfo))
};

// mousedown function will trigger the first AJAX Call
$("#city-search-button").mousedown(function(event) {

    event.preventDefault();

    weatherInfoPartOne();
});

// mouseup function will trigger the first AJAX Call
$("#city-search-button").mouseup(function(event) {
    
    event.preventDefault();

    weatherInfoPartTwo();

    displayMainCityInfo();
});

//First AJAX call
var weatherInfoPartOne = function() {

    var city = $("#city-search").val();
 
    var APIKey = "4c8113c3872d27727117d0ff8046adaa";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        cityInfo[0].lon = response.coord.lon;
        cityInfo[0].lat = response.coord.lat;
        cityInfo[0].name = response.name;
        //cityInfo[0].icon = response.weather.icon;
        cityInfo[0].temp = response.main.temp;
        cityInfo[0].humidity = response.main.humidity;
        cityInfo[0].wind = response.wind.speed;

        storeCityInfo();
    });
};

//SecondAJAX call has UV index and 5 day forcast 
var weatherInfoPartTwo = function() {

    var APIKey = "4c8113c3872d27727117d0ff8046adaa";
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityInfo[0].lat + "&lon=" + cityInfo[0].lon + "&exclude={part}&appid=" + APIKey + "&units=imperial";

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then (function(response) {

        cityInfo[0].UVindex = response.daily[0].uvi;

        for (i=0; i<5; i++) {

            console.log(response.daily[1].temp.day);
            console.log(response.daily[1].humidity);

        };
        //console.log(queryURL);
        //console.log(response);
        //console.log(response.daily[0].uvi)
        //console.log(response.daily[1].temp.day);
    
        //console.log(response.daily[1].humidity)
        //UV index
        
        //5 day forecast 

        storeCityInfo();
        displayPreviousSearch();
    });


}

var displayPreviousSearch = function() {
    $("#recent-city").empty()
    var previousSearchEl = $("<li>");
    previousSearchEl.addClass("list-group-item list-group-item-action");
    previousSearchEl.text(cityInfo[0].name)
    $("#recent-city").append(previousSearchEl)
}

var displayMainCityInfo = function(){
    
    $("#city-display").empty()
    var cityMainInfoDiv = $("<div>")
    var cityMainInfoEl = $("#city-display");
    var cityMainInfo = $("<div>");
    var cityEl = $("<h3>");
    var tempEl = $("<p>");
    var humidityEl = $("<p>");
    var windEl = $("<p>");
    var uvIndexEl = $("<p>");

    cityMainInfoDiv.addClass("card mt-3");
    cityMainInfo.addClass("card-body");
    cityEl.text((cityInfo[0].name) + "  current date  ");
    humidityEl.text("Humidity: " + cityInfo[0].humidity + "%");
    tempEl.text("Temperature: " + cityInfo[0].temp + "degrees F");
    windEl.text("Wind Speed: " + cityInfo[0].wind + "MPH");
    uvIndexEl.text("UV Index: " + cityInfo[0].UVindex);

    cityMainInfoEl.append(cityMainInfoDiv);
    cityMainInfoDiv.append(cityMainInfo)
    cityMainInfo.append(cityEl);
    cityMainInfo.append(tempEl);
    cityMainInfo.append(humidityEl);
    cityMainInfo.append(windEl);
    cityMainInfo.append(uvIndexEl);

};

// var fiveDayForecast = function() {
//     var title = $("<h4>")
//     var fiveDayForecastEl = $("<div>");
//     var cardBase = 
// }

var forcastDisplay = function() {
    // create element
    var forcastDiv = $("<div>");
    forcastDiv.addClass("card text-white bg-primary mb-3 ml-4 mt-2");
    forcastEl = $("<div>");
    forcastEl.addClass("card-body");
    forcastTitle = $("<h5>");
    forcastTitle.addClass("card-title");
    forcastTemp = $("<p>");
    forcastTemp.addClass("card-text");
    forcastHumidity = $("<p>");
    forcastHumidity.addClass("card-text");

    // add content


    // append to existing
    $("#forcastInfo").append(forcastDiv);
    forcastDiv.append(forcastEl);
    forcastEl.append(forcastTitle);
    forcastEl.append(forcastTemp);
    forcastEl.append(forcastHumidity);
   
}

 






// set up array of objects to be displayed in main depending

// on query results 


//---- city search
// create variable to save user input
// save user input to the local storage 

// -------- ajax query search based on city name 
// --------- take returned information and display in main: 
// city (date) weather icon header
// temperature in F
// humidity 
// windspeed mph
// uv index (color-coded)
// --- take returned information and display below main:
// 5 day forecast: 5 columns (card class)
// date
// weather icon
// temp in F
// humididty



// --- show last searched city below searchbar
// create element
// add content (user input)
// append to existing element (div below searchbar)

