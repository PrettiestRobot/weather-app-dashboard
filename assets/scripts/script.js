document.querySelector("#searchbar");

const apiKey = "5801529235171737e0bd3af3fc3c74fc";
const city = "Seattle";
longitude = "";
latitude = "";

// const url = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apikey}`
const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apiKey}`;
const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},&limit=1&appid=${apiKey}`;

fetch(weatherUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

function getLocation () {
    fetch(geocodeUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      longitude = data[0].lon;
      latitude = data[0].lat;
  
      console.log(`Longitude: ${longitude}`);
      console.log(`Latitude: ${latitude}`);
    });
}

getLocation();


