
//setting variables
var inputName = $(".cityInput");
var submitBtn = $("#button");
var name = $("#cityName");
var temp = $("#temp");
var humidity = $("#humidity");
var windSpeed = $("#windSpeed");
var uv = $("#uvIndex");

var apiKey = "472a07ec988fe068670c8e23411bee88";


//when button clicked, city name typed by user is read
$("#submitBtn").on("click", function () {
    console.log("element clicked");     
    var city = inputName.val();  
    getWeather(city);
    
});


function getWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    console.log(queryURL);
    //ajax call   
    $.ajax({
        url: queryURL,
        type: "GET",
        dataType: "json"
    }).then(function(response) {
        console.log(response);
    });

}

function getWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    console.log(queryURL);
    //ajax call   
    $.ajax({
        url: queryURL,
        type: "GET",
        dataType: "json"
    }).then(function(response) {
        console.log(response);
    });

}