var today = moment().format("dddd, MMMM, D, YYYY");
//GIVEN a weather dashboard with form input
function searchWeatherInCity(event){
    event.preventDefault();
    // run the search for weather with city name
    var inputCity = $("#weatherLocation").val().trim();
    console.log(inputCity);
    var APIKey = "d2d9bc8002577dcf660cef71f30ebecb";
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&appid=" + APIKey + "&units=imperial",
        method: "GET"
    }).then(function(response) {
        console.log(response);

        myWeather = $("#weatherToday");
        var currentLat = response.coord.lat;
        var currentLon = response.coord.lon;
        console.log(currentLon);
        //current weather conditions for that city
        //current weather with the city name, the date, an icon representation of weather conditions, 
        //the temperature, the humidity, the wind speed, and the UV index
        var currentCity = $("<h2>").text(response.name);
        var currentDate = $("<h3>").text(today);
        var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        var currentTemp = $("<h3>").text("Temperature: " + response.main.temp + "°F");
        var currentHumidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
        var currentWindSpeed = $("<p>").text("Wind Speed " + response.wind.speed + " MPH");
        

        myWeather.append(currentCity, currentDate, currentIcon, currentTemp, currentHumidity, currentWindSpeed);
        getUVAndForcast(currentLat, currentLon, APIKey)
        //store city information
    
    });
}
//event listener for button
$("#weatherSearch").on("click", searchWeatherInCity);
    
//the UV index color coded to indicate if conditions are favorable, moderate, or severe        
function getUVAndForcast(currentLat, currentLon, APIKey){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + currentLat + "&lon=" + currentLon + "&exclude=minutely&appid=" + APIKey + "&units=imperial",
        method: "GET"
    }).then(function(response) {
        console.log(response);

    });
}
           

 


//search for a city with geolocation api

//city is added to the search history
//current weather conditions for that city
//current weather with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//the UV index color coded to indicate if conditions are favorable, moderate, or severe
//future  5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
//a city in the search history provides current and future conditions for that city


    //event listener for button

// var APIKey = "d2d9bc8002577dcf660cef71f30ebecb";
// $.ajax({
//     url: "http://api.openweathermap.org/geo/1.0/reverse?lat=" + lat + "&lon=" + lon + "&limit=5&appid=" + APIKey;
//     method: "GET"
// }).then(function(response) {
//     console.log(response)
// });