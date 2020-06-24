
//setting variables
var inputValue = $(".weatherInput");
var name = $(".name");
var description = $(".description");
var temp = $(".temp");
//api key = 472a07ec988fe068670c8e23411bee88


//setting api call
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=london&appid=472a07ec988fe068670c8e23411bee88";

$.getJSON(queryURL, weatherCallback);

function weatherCallback(weatherData) {
    console.log(weatherData);
}