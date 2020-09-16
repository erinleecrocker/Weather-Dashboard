# Weather-Dashboard

The goal of this project was to create a weather dashboard that allows the user to see the weather outlook for multiple cities.

This was done by using html, javascript, and the OpenWeather API.

<img width="1440" alt="Screen Shot 2020-09-15 at 11 40 15 PM" src="https://user-images.githubusercontent.com/69767328/93291269-97204280-f7b0-11ea-81f7-5d46d349d782.png">

When the user views the page, they are presented with a search bar that instructs them to search for a city. I was able to take this imput and use it in an Ajax request, however the information I needed required two requests so I nested my second request inside the first. Following this I used javascript to dynamically populate the page with information on the city name, the date (thanks to moment.js), weather conditions with an ICON! (which took some experimentation and help from OpenWeather's documentation for me to understand how to accomplish) also temperature, humidity, wind speed, and the UV index.

<img width="714" alt="Screen Shot 2020-09-15 at 11 41 44 PM" src="https://user-images.githubusercontent.com/69767328/93291167-5b857880-f7b0-11ea-8b63-67cc479cb525.png">

 I also included a section below the current weather conditions; a 5 day forcast that shows the weather conditions, temp, and humidity. 
as an added bonus the user can view their recent searches under the search bar and click on them to get that city's weather information. When the user closes out of the window and returns their most recent search will still be there. 


here is a link to the deployed site: 

https://erinleecrocker.github.io/Weather-Dashboard/