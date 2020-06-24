
//setting variables
var inputName = $(".cityInput");
var submitBtn = $("#button");
var name = $("#cityName");
var temp = $("#temp");
var humidity = $("#humidity");
var windSpeed = $("#windSpeed");
var uv = $("#uvIndex");

var apiKey = "472a07ec988fe068670c8e23411bee88";

//setting api call
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
console.log(queryURL);
//when button clicked, city name typed by user is read
$("#submitBtn").on("click", function () {
    console.log("element clicked");
    
    //ajax call   
    $.ajax({
        url: queryURL,
        type: "GET",
        dataType: "json"
    }).then(function(response) {
        console.log(response);

    });
        
   
});
