$(document).ready(function() { 
//setting variables
var inputName = $(".cityInput");
var submitBtn = $("#submitBtn");
var name = $("#cityName");
var city = $("#current-pic");
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
    // getForecast(city);
    
});

//adding weather call in
function getWeather(city) {
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    console.log(queryURL);
    //ajax call   
    $.ajax({
        url: queryURL,
        type: "GET",
        dataType: "json"
    }).then(function(response) {
        console.log(response);
        console.log('name', name);
            //attach city name to heading
            name.text(response.name);
            //attach date to heading
            var currentDate = new Date();
            console.log(currentDate);
            const d = new Date('2010-08-05')
            const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
            const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
            name.append(` (${da}-${mo}-${ye})`);
            //attach weather icon to heading
            var weatherIcon = $("<img>");
            weatherIcon.attr('src', 'https://openweathermap.org/img/wn/'+ response.weather[0].icon +'.png')
            name.append(weatherIcon);
            //add temp input 
            temp.text(tempChange(response.main.temp) + '°F');
            //add humidity input
            humidity.text(response.main.humidity);
            //add windspeed input
            windSpeed.text(response.wind.speed);
            //add Uv index
            var lat=response.coord.lat;
            var lon=response.coord.lon;
            var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat +"&lon=" + lon;
            //ajax call
                $.ajax({
                    url: queryURL,
                    type: "GET",
                    dataType: "json"
                }).then(function(responseUV) {
                    var uvIndex = $("<span>");
                    uvIndex.attr("class", "badge badge-danger");
                    uvIndex.text = response.data[0].value;
                    uv.append(uvIndex);
                })

    });

}
// change temp from K to F function
function tempChange(K) {
    return Math.floor((K - 273.15) *1.8 +32);
}
// //adding forecast in
// function getForecast(city) {
//     var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
//     console.log(queryURL);
//     //ajax call   
//     $.ajax({
//         url: queryURL,
//         type: "GET",
//         dataType: "json"
//     }).then(function(response) {
//         console.log(response);
//     });

// }



//end of document ready function
});