$(document).ready(function() {

    var date = moment().format('M/D/YYYY');

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
    },
    {
        prev: [],
    }
    
    ];

    init();

    function init() {

    var storedCityInfo = JSON.parse(localStorage.getItem("cityInfo"));

    if (storedCityInfo !== null) {
    cityInfo = storedCityInfo;
    } 

    };

    var storeCityInfo = function(){
    localStorage.setItem("cityInfo",JSON.stringify(cityInfo));
    };

// display previous search
    var displayPreviousSearch = function() {

    if (cityInfo[2].prev.length > 0) {
    var previousSearchEl = $("<li>");
    previousSearchEl.addClass("list-group-item list-group-item-action city-click");
    previousSearchEl.text(cityInfo[2].prev[0]);
    $("#recent-city").prepend(previousSearchEl);
    };
    };

// display weather info
    var displayMainCityInfo = function(){
    
    $("#city-display").empty()
    var cityMainInfoDiv = $("<div>")
    var cityMainInfoEl = $("#city-display");
    var cityMainInfo = $("<div>");
    var cityEl = $("<h3>");
    var iconEl = $("<img>");
    var tempEl = $("<p>");
    var humidityEl = $("<p>");
    var windEl = $("<p>");
    var uvIndexEl = $("<p>");

    cityMainInfoDiv.addClass("card mt-3");
    cityMainInfo.addClass("card-body");
    iconEl.attr("src","http://openweathermap.org/img/w/" + cityInfo[0].icon + ".png");
    cityEl.text((cityInfo[0].name) + " " + date);
    humidityEl.text("Humidity: " + cityInfo[0].humidity + "%");
    tempEl.text("Temperature: " + cityInfo[0].temp + " ˚F");
    windEl.text("Wind Speed: " + cityInfo[0].wind + " MPH");
    uvIndexEl.text("UV Index: " + cityInfo[0].UVindex);

    cityMainInfoEl.append(cityMainInfoDiv);
    cityMainInfoDiv.append(cityMainInfo);
    cityMainInfo.append(cityEl);
    cityEl.append(iconEl);
    cityMainInfo.append(tempEl);
    cityMainInfo.append(humidityEl);
    cityMainInfo.append(windEl);
    cityMainInfo.append(uvIndexEl);

    };
// display 5 day forcast
    var forcastDisplay = function() {
    
    $("#forcastInfo").empty();

    var fiveDayForcast = $("<h4>");
    fiveDayForcast.addClass("mt-4");
    $("#fiveDayForcast").append(fiveDayForcast);

    for (i=0; i<cityInfo[1].temp.length; i++) {
        // create element
        var forcastDiv = $("<div>");
        forcastDiv.addClass("card text-white bg-primary mb-3 ml-4 mt-2");
        forcastDiv.attr("style","max-width: 15rem");
        var forcastEl = $("<div>");
        forcastEl.addClass("card-body");
        var forcastTitle = $("<h5>");
        forcastTitle.addClass("card-title");
        var iconImg = $("<img>");
        var forcastTemp = $("<p>");
        forcastTemp.addClass("card-text");
        var forcastHumidity = $("<p>");
        forcastHumidity.addClass("card-text");
        // add content
        iconImg.attr("src","http://openweathermap.org/img/w/" + cityInfo[1].icon[i] + ".png");
        forcastTitle.text(moment().add((i + 1), 'days').format('M/D/YYYY'));
        forcastTemp.text(cityInfo[1].temp[i] + " ˚F");
        forcastHumidity.text(cityInfo[1].humidity[i] + "%");
        // append to existing
        $("#forcastInfo").append(forcastDiv);
        forcastDiv.append(forcastEl);
        forcastEl.append(forcastTitle);
        forcastEl.append(iconImg);
        forcastEl.append(forcastTemp);
        forcastEl.append(forcastHumidity);
    };
    
    };

    displayPreviousSearch();
// click will trigger the event 
    $("#city-search-button").click(function(event) {

    event.preventDefault();

    var city = $("#city-search").val();

    cityInfo[2].prev.unshift($("#city-search").val());
    //console.log(cityInfo[2].prev)
 
    var APIKey = "4c8113c3872d27727117d0ff8046adaa";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        cityInfo[0].lon = response.coord.lon;
        cityInfo[0].lat = response.coord.lat;
        cityInfo[0].name = response.name;
        cityInfo[0].icon = response.weather[0].icon;
        //console.log(response.weather[0].icon);
        cityInfo[0].temp = response.main.temp;
        cityInfo[0].humidity = response.main.humidity;
        cityInfo[0].wind = response.wind.speed;
        
        var APIKey = "4c8113c3872d27727117d0ff8046adaa";
        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityInfo[0].lat + "&lon=" + cityInfo[0].lon + "&exclude={part}&appid=" + APIKey + "&units=imperial";
        
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then (function(response) {
            
            cityInfo[0].UVindex = response.daily[0].uvi;
            // clear previous forcast
            cityInfo[1].icon = [];
            cityInfo[1].temp = [];
            cityInfo[1].humidity = [];

            for (i=1; i<6; i++) {
                
                //console.log(response.daily[i].temp.day);
                cityInfo[1].temp.push(response.daily[i].temp.day);
                cityInfo[1].humidity.push(response.daily[i].humidity);
                cityInfo[1].icon.push(response.daily[i].weather[0].icon)
    
            };
            
            storeCityInfo();
            displayMainCityInfo();
            forcastDisplay();
            displayPreviousSearch();
        });
    });
    });

    $(".city-click").click(function(event) {

    console.log($(this).text());
    event.preventDefault();

    var city = $(this).text();

    cityInfo[2].prev.unshift($("#city-search").val());
        //console.log(cityInfo[2].prev)
 
    var APIKey = "4c8113c3872d27727117d0ff8046adaa";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {

        cityInfo[0].lon = response.coord.lon;
        cityInfo[0].lat = response.coord.lat;
        cityInfo[0].name = response.name;
        cityInfo[0].icon = response.weather[0].icon;
        cityInfo[0].temp = response.main.temp;
        cityInfo[0].humidity = response.main.humidity;
        cityInfo[0].wind = response.wind.speed;
        
        var APIKey = "4c8113c3872d27727117d0ff8046adaa";
        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityInfo[0].lat + "&lon=" + cityInfo[0].lon + "&exclude={part}&appid=" + APIKey + "&units=imperial";
        
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then (function(response) {
            
            cityInfo[0].UVindex = response.daily[0].uvi;
            // clear previous forcast
            cityInfo[1].icon = [];
            cityInfo[1].temp = [];
            cityInfo[1].humidity = [];

            for (i=1; i<6; i++) {
                
                //console.log(response.daily[i].temp.day);
                cityInfo[1].temp.push(response.daily[i].temp.day);
                cityInfo[1].humidity.push(response.daily[i].humidity);
                cityInfo[1].icon.push(response.daily[i].weather[0].icon);

    
            };
            
            storeCityInfo();
            displayMainCityInfo();
            forcastDisplay();
        });
    });

    });
});