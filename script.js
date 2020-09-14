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
    }

]

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
        //console.log(queryURL);
        //console.log(response);

        cityInfo[0].lon = response.coord.lon;
        console.log(cityInfo[0].lon);
        cityInfo[0].lat = response.coord.lat;
        console.log(cityInfo[0].lat);
        cityInfo[0].name = response.name;
        console.log(cityInfo[0].name);
        //---- icon problems meh
        //cityInfo[0].icon = response.weather.icon;
        //console.log(cityInfo[0].icon);
        cityInfo[0].temp = response.main.temp;
        console.log(cityInfo[0].temp);
        cityInfo[0].humidity = response.main.humidity;
        console.log(cityInfo[0].humidity);
        cityInfo[0].wind = response.wind.speed;
        console.log(cityInfo[0].wind);

        storeCityInfo();
    });

};

//SecondAJAX call has UV index and 5 day forcast 
var weatherInfoPartTwo = function() {
    
    init();

    console.log(cityInfo[0].lat);
    console.log(cityInfo[0].lon);
    //API key
    var APIKey = "4c8113c3872d27727117d0ff8046adaa";
    //Query url
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityInfo[0].lat + "&lon=" + cityInfo[0].lon + "&exclude={part}&appid=" + APIKey + "&units=imperial";

   

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        console.log(queryURL);
        //console.log(response);
        console.log(response);
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

