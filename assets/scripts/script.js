const searchbar = document.querySelector("#searchbar");
const submitBtn = document.querySelector("#search-btn");
const tempCurrent = document.querySelector(".temp-current");
const windCurrent = document.querySelector(".wind-current");
const humidityCurrent = document.querySelector(".humidity-current");


const apiKey = "5801529235171737e0bd3af3fc3c74fc";

let weatherUrl = "";
let geocodeUrl = "";

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let city = searchbar.value;
  geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},&limit=1&appid=${apiKey}`;
  getWeather();
});

function getWeather() {
  fetch(geocodeUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let lon = data[0].lon;
      let lat = data[0].lat;
      weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      console.log(`Longitude: ${lon}`);
      console.log(`Latitude: ${lat}`);

      fetch(weatherUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          tempCurrent.textContent = data.list[0].main.temp + "\u00B0" + "F";
          windCurrent.textContent = data.list[0].wind.speed + " Mph";
          humidityCurrent.textContent = data.list[0].main.humidity +" %";
        });
    });
}

// function createCard (data) {

// }
