# Server_APIs

## Description

A weather website was created to allow a user to check the outlook for up to five days in order to plan their trip. This website was pulling all of the weather information from OpenWeather API. The resulting page would look as shown below: 

![weather dashboard demo](./assets/06-server-side-apis-homework-demo.png)

## Working with APIs

While working on this project, it was important to first connect the API successfully by asking for an API Key from [OpenWeather API](https://openweathermap.org/api) to complete the URL request. Testing the page works with a console log with show a dropdown of the object response from the website. From that list, elements were identified and called into Javascript to pull the information onto the website. 

## Issues
Since this is the first time working with API's, Ajax call were the easiest way to call a response of all the data. Trying to write out how to put all the data onto the page was a little difficult when it came sticking with plain vanilla Javascript text or using Jquery, so there is a mix of both on the script page.

Formatting the array for the 5 day weather forecast proved to be challenging as well in terms of playing the data nicely into one card repeatedly. 

## Credits

[GetBootStrap](https://getbootstrap.com/docs/4.5/components/card/)
[OpenWeather API](https://openweathermap.org/api)