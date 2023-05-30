const searchbar = document.querySelector("#searchbar");
const submitBtn = document.querySelector("#search-btn");
const tempCurrent = document.querySelector(".temp-current");
const windCurrent = document.querySelector(".wind-current");
const humidityCurrent = document.querySelector(".humidity-current");
const cityInfo = document.querySelector(".city-info");
const cityIcon = document.querySelector(".city-info-icon");
const forcastList = document.querySelector(".forcast-list");
const searchHistory = document.querySelector(".search-history-container");
const historyBtn = document.querySelector(".history-btn");

const apiKey = "5801529235171737e0bd3af3fc3c74fc";

let weatherUrl = "";
let geocodeUrl = "";
let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
localStorage.setItem('searchHistory', JSON.stringify(history));
populateSearchHistory();

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let city = searchbar.value;
  geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},&limit=1&appid=${apiKey}`;
  getWeather();
  addToLocalStorage(city);
  populateSearchHistory();
});

// Format the date from the api into something more presentable
function formatDate(inputDate) {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `(${day}/${month.toString().padStart(2, "0")}/${year})`;
  return formattedDate;
}

function getWeather() {
  fetch(geocodeUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let lon = data[0].lon;
      let lat = data[0].lat;
      weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      fetch(weatherUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          console.log(data.city.name);
          console.log();
          let formattedDate = formatDate(data.list[0].dt_txt);
          cityIcon.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
          let cityText = data.city.name;
          cityInfo.textContent = `${cityText} ${formattedDate}`;
          tempCurrent.textContent = data.list[0].main.temp + "\u00B0" + "F";
          windCurrent.textContent = data.list[0].wind.speed + " Mph";
          humidityCurrent.textContent = data.list[0].main.humidity + " %";
          createCards(data);
        });
    });
}

// Create daily forcast cards
function createCards(data) {
    while (forcastList.firstChild) {
      forcastList.removeChild(forcastList.firstChild);
    }
  for (i = 8; i < 40; i += 8) {
    // create card elements
    const newCard = document.createElement("li");
    newCard.classList.add("forcast-card");
    forcastList.appendChild(newCard);
    const date = document.createElement("h5");
    date.classList.add("card-date");
    newCard.appendChild(date);
    const cardIcon = document.createElement("img");
    cardIcon.classList.add("card-icon");
    newCard.appendChild(cardIcon);
    const temp = document.createElement("p");
    temp.classList.add("card-temp");
    newCard.appendChild(temp);
    const wind = document.createElement("p");
    wind.classList.add("card-wind");
    newCard.appendChild(wind);
    const humidity = document.createElement("h5");
    humidity.classList.add("card-humidity");
    newCard.appendChild(humidity);
    // populate card
    date.textContent = formatDate(data.list[i].dt_txt);
    cardIcon.src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`;
    temp.textContent = data.list[i].main.temp + "\u00B0" + "F";
    wind.textContent = data.list[i].wind.speed + " Mph";
    humidity.textContent = data.list[i].main.humidity + " %";
  }
}

function addToLocalStorage(city) {
  let localSearchHistory =
    JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!localSearchHistory.includes(city)) {
    localSearchHistory.push(city);
  }
  localStorage.setItem("searchHistory", JSON.stringify(localSearchHistory));
}

function populateSearchHistory() {
  while (searchHistory.firstChild) {
    searchHistory.removeChild(searchHistory.firstChild);
  }
  history = JSON.parse(localStorage.getItem("searchHistory"));
    for (let i = 0; i < history.length; i++) {
      const newBtn = document.createElement("button");
      newBtn.classList.add("btn", "history-btn");
      searchHistory.appendChild(newBtn);
      newBtn.textContent = history[i];
      newBtn.addEventListener("click", function (event) {
        event.preventDefault();
        let city = this.textContent;
        geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},&limit=1&appid=${apiKey}`;
        getWeather();
        populateSearchHistory();
      });
    }
}
