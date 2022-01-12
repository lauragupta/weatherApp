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
        //the temperature, the humidity, the wind speed
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
        var myUVIndex = $("#uvIndex");
        var currentUVIndex = response.current.uvi;
        $("#uvIndex").text("UV Index: " + currentUVIndex);
        colorUVIndex(currentUVIndex, myUVIndex);
        renderForecast(response)
        
    });
}

function renderForecast(response) {
    var forecast = response.daily;
    $.each(forecast, function(i, day) {
        console.log(day);
        var forecastIcon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png");
        var forecastTemp = $("<h5>").text("Temperature: " + response.daily[i].temp.day + "°F");
        var forecastHumidity = $("<p>").text("Humidity: " + response.daily[i].feels_like.humidity + "%");
        var myForecast = $("#day" + i);
        myForecast.append(forecastIcon, forecastTemp, forecastHumidity);
    })
    
    //var forcastDate = 

}

//the UV index color coded to indicate if conditions are favorable, moderate, or severe
function colorUVIndex(currentUVIndex, myUVIndex) {
    if (currentUVIndex < 3) {
        $("#uvIndex").css("color", "limegreen");
        //myUVIndex.append(currentUVIndex);
    } else if (currentUVIndex >= 3 && currentUVIndex < 6) {
        $("#uvIndex").css("color", "yellow");
    } else if (currentUVIndex >= 6 && currentUVIndex < 8) {
        $("#uvIndex").css("color", "orange");
    } else if (currentUVIndex >= 8 && currentUVIndex < 10) {
        $("#uvIndex").css("color", "red");
    } else if (currentUVIndex >=11) {
        $("#uvIndex").css("color", "purple");
        //myUVIndex.append(currentUVIndex);
    }
}
//future  5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity



//search for a city with geolocation api
//city is added to the search history

//a city in the search history provides current and future conditions for that city


    //event listener for button

// var APIKey = "d2d9bc8002577dcf660cef71f30ebecb";
// $.ajax({
//     url: "http://api.openweathermap.org/geo/1.0/reverse?lat=" + lat + "&lon=" + lon + "&limit=5&appid=" + APIKey;
//     method: "GET"
// }).then(function(response) {
//     console.log(response)
// });