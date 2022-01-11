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
        //add in JSON
        console.log(response)
    });
}

//current weather conditions for that city
    //current weather with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    //the UV index color coded to indicate if conditions are favorable, moderate, or severe

        //store city information
      

 //event listener for button
$("#weatherSearch").on("click", searchWeatherInCity);

//search for a city with geolocation api
//var lat = "";
//var lon = "";
//city is added to the search history
//current weather conditions for that city
//current weather with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//the UV index color coded to indicate if conditions are favorable, moderate, or severe
//future  5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
//a city in the search history provides current and future conditions for that city


// var APIKey = "d2d9bc8002577dcf660cef71f30ebecb";
// $.ajax({
//     url: "http://api.openweathermap.org/geo/1.0/reverse?lat=" + lat + "&lon=" + lon + "&limit=5&appid=" + APIKey;
//     method: "GET"
// }).then(function(response) {
//     console.log(response)
// });
    //event listener for button