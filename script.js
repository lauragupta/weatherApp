var today = moment().format("dddd, MMMM, D, YYYY");
var APIKey = "d2d9bc8002577dcf660cef71f30ebecb";
var storedCities = getCities();

$.each(storedCities, function(i, city) {
    var $button = $("<button>").text(city);
    $("#cityHistory").append($button);
});

//GIVEN a weather dashboard with form input
function searchWeatherInCity(event){
    event.preventDefault();
    // run the search for weather with city name
    var inputCity = $("#weatherLocation").val().trim();
    console.log(inputCity);
    getAndRenderCurrentWeather(inputCity);
    var storedCities = getCities();
    storedCities.unshift(inputCity);
    //city is added to the search history
    //create button for input city
    $.each(storedCities, function(i, city) {
        var $button = $("<button>").text(city);
        $("#cityHistory").append($button);
    }) 
    localStorage.setItem("city", JSON.stringify(storedCities));
    
}

 //store city information
 function getCities() {
     var storedCities = JSON.parse(localStorage.getItem("city"));
     if(storedCities === null) {
         storedCities = [];
         return storedCities;
     }
     return storedCities;
 }

 //a city in the search history provides current and future conditions for that city
 function searchCityAgain(event){
    event.preventDefault();
    var $clickedButton = $(event.target);
    console.log($clickedButton);
    var inputCity = $clickedButton[0].innerHTML;
    console.log(inputCity);
    getAndRenderCurrentWeather(inputCity);
 }

function getAndRenderCurrentWeather(inputCity) {
    //$("#weatherToday").empty();
    $("#day0").empty();
    $("#day1").empty();
    $("#day2").empty();
    $("#day3").empty();
    $("#day4").empty();
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&appid=" + APIKey + "&units=imperial",
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var currentLat = response.coord.lat;
        var currentLon = response.coord.lon;
        //current weather conditions for that city
        //current weather with the city name, the date, an icon representation of weather conditions, 
        //the temperature, the humidity, the wind speed
        var weatherTodayHtml = `<h2>${response.name}</h2><h3>${today}</h3><img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png"/><h3>Temperature: ${response.main.temp}°F</h3><p>Humidity: ${response.main.humidity}%</p><p>Wind Speed ${response.wind.speed} MPH</p>`

        var $weatherToday = $("#weatherToday");
        $weatherToday.html(weatherTodayHtml);
        getUVAndForcast(currentLat, currentLon);
        return inputCity;
    });
}

//event listener for button
$("#weatherSearch").on("click", searchWeatherInCity);
    
//the UV index color coded to indicate if conditions are favorable, moderate, or severe        
function getUVAndForcast(currentLat, currentLon) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + currentLat + "&lon=" + currentLon + "&exclude=minutely&appid=" + APIKey + "&units=imperial",
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var currentUVIndex = response.current.uvi;
        console.log(currentUVIndex);
        var $uvIndex = $("<p id='uvIndex'>").html("UV Index: " + currentUVIndex);
        $("#weatherToday").append($uvIndex);
        colorUVIndex(currentUVIndex);
        renderForecast(response);
        
    });
}

//future  5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
function renderForecast(response) {
    var forecast = response.daily;
    $.each(forecast, function(i, day) {
        console.log(day);
        var forecastDate = moment.unix(response.daily[i].dt).format("MMM Do, YYYY");
        var $forecastDate = $("<h4>").text(forecastDate);
        var $forecastIcon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png");
        var $forecastTemp = $("<h5>").text("Temperature: " + response.daily[i].temp.day + "°F");
        var $forecastHumidity = $("<p>").text("Humidity: " + response.daily[i].humidity + "%");
        var $myForecast = $("#day" + i);
        $myForecast.append($forecastDate, $forecastIcon, $forecastTemp, $forecastHumidity);
    })
    
}

//the UV index color coded to indicate if conditions are favorable, moderate, or severe
function colorUVIndex(currentUVIndex) {
    if (currentUVIndex < 3) {
        $("#uvIndex").css("color", "limegreen");
    } else if (currentUVIndex >= 3 && currentUVIndex < 6) {
        $("#uvIndex").css("color", "yellow");
    } else if (currentUVIndex >= 6 && currentUVIndex < 8) {
        $("#uvIndex").css("color", "orange");
    } else if (currentUVIndex >= 8 && currentUVIndex < 10) {
        $("#uvIndex").css("color", "red");
    } else if (currentUVIndex >=11) {
        $("#uvIndex").css("color", "purple");
    }
}

    //event listener for button
    $("#cityHistory").on("click", searchCityAgain);