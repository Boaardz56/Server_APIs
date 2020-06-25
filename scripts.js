$(document).ready(function() { 
//setting variables
var inputName = $(".cityInput");
var name = $("#cityName");
var temp = $("#temp");
var humidity = $("#humidity");
var windSpeed = $("#windSpeed");
var uv = $("#uvIndex");
var history = $("#history");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
// console.log(searchHistory);

var apiKey = "472a07ec988fe068670c8e23411bee88";

//when button clicked, city name typed by user is read
$("#submitBtn").on("click", function () {
    // console.log("element clicked");     
    var city = inputName.val();  
    getWeather(city);
    getForecast(city);
    //add search history
    searchHistory = [];
    searchHistory.push(city);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    getSearchHistory();
});


//adding weather call in
function getWeather(city) {
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    // console.log(queryURL);
    //ajax call   
    $.ajax({
        url: queryURL,
        type: "GET",
        dataType: "json"
    }).then(function(response) {
        console.log(response);
        // console.log('name', name);
            //attach city name to heading
            name.text(response.name);
            //attach date to heading
            // var currentDate = new Date();
            // console.log(currentDate);
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
            var UVqueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + apiKey+ "&lat=" + lat + "&lon=" + lon;
            // console.log(UVqueryURL);
            //ajax call for uv index
                $.ajax({
                    url: UVqueryURL,
                    type: "GET",
                    dataType: "json"
                }).then(function(response) {
                    // console.log(response);
                    uv.text(response[0].value);
                    uv.append();
                });
        //get 5 day forcast
            

    });
}

function getForecast(city) {
    var forecastqueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
   //ajax call   
   $.ajax({
       url: forecastqueryURL,
       type: "GET",
       dataType: "json"
   }).then(function(response) {
       console.log(response);
       var forecastData = $(".forecast");
       //create for loop
           for (var i=0; i<forecastData.length; i++) {
               forecastData[i].innerHTML = "";
               var forecastArray = i*8 +4;
               console.log(forecastArray);
                //date data
               var forecastDate = new Date(response.list[forecastArray].dt * 1000);
               var forecastDay = forecastDate.getDate() + 1;
               var forecastMonth = forecastDate.getMonth();
               var forecastYear = forecastDate.getFullYear();
               var forecastTotal = $("<p>");
               forecastTotal.attr("class", "mt-3 mb-0 rounded forecast-date");
               forecastTotal.text(forecastMonth + "/" + forecastDay + "/" + forecastYear);
               forecastData.append(forecastTotal);
            //adding weather icon for card
                var cardWeatherIcon = $("<img>");
                 cardWeatherIcon.attr('src', 'https://openweathermap.org/img/wn/'+ response.list[forecastArray].weather[0].icon +'.png')
                 forecastData.append(cardWeatherIcon);
            //adding forecast temp for card
                var cardTemp = $("<p>");
                cardTemp.text(tempChange(response.list[forecastArray].main.temp) + '°F');
                forecastData.append(cardTemp);
            //adding forecast humidity for card
                var cardHumidity = $("<p>");
                cardHumidity.text("Humidity: " + response.list[forecastArray].main.humidity + "%");
                forecastData.append(cardHumidity);
           }
   });
}

// change temp from K to F function
function tempChange(K) {
    return Math.floor((K - 273.15) *1.8 +32);
}
// search history addon
function getSearchHistory() {
    history.text = "";
    for (var i=0; i<searchHistory.length;i++) {
        var historyEl = $("<input>");
        historyEl.attr("type", "text");
        historyEl.attr("readonly", true);
        historyEl.attr("class", "form-control d-block bg-white");
        historyEl.attr("value", searchHistory[i]);
        $(historyEl).on("click", function () {
            getWeather(historyEl.val());

    })
        history.append(historyEl); 
    }
}

getSearchHistory();
if (searchHistory.length > 0) {
    getWeather(searchHistory[searchHistory.length - 1]);
}



//end of document ready function
});