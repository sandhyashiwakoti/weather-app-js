/*============ DOM Element Selectors ============*/
const containerElement = document.querySelector(".container");
const cityNameElement = document.querySelector("#city-name");
const dateElement = document.querySelector("#date");
const dayElement = document.querySelector("#day");
const weatherConditionElement = document.querySelector("#weather-condition");
const weatherConditionDescriptionElement = document.querySelector(
  "#weather-condition-description"
);
const weatherIconElement = document.querySelector("#weather-icon");
const temperatureELement = document.querySelector("#temperature");
const pressureElement = document.querySelector("#pressure");
const humidityElement = document.querySelector("#humidity");
const windSpeedElement = document.querySelector("#wind-speed");
const windDirectionElement = document.querySelector("#wind-direction");
const searchInputElement = document.querySelector("#search-input");
const searchButtonElement = document.querySelector("#search-button");
const loadingElement = document.querySelector(".loading");
const errorMessageElement = document.querySelector(".error-message");
const toastMessageContainerElement = document.querySelector(
  ".toast-message-container"
);
const toastMessageElement = document.querySelector(".toast-message");
const weatherCardElement = document.querySelector("#weather-card");

/*============ Variables ============*/
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiId = "628770553edec8791fd2881b449223d4";

/*============ Functions ============*/

// Format date
const getFormattedDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${months[month]} ${day}, ${year}`;
};

// Get day from date
const getDayFromDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDay();
  return days[day];
};

// Format temperature
const getFormattedTemperature = (temperature) => {
  return Math.round(temperature);
};

// Display weather information
const displayWeatherInformation = (data) => {
  containerElement.style.backgroundImage = `url(${getBackgroundImage(data.weather[0].id)})`;
  cityNameElement.textContent = data.name;
  dayElement.textContent = getDayFromDate(data.dt_txt || new Date());
  dateElement.textContent = getFormattedDate(data.dt_txt || new Date());
  weatherConditionElement.textContent = data.weather[0].main;
  weatherConditionDescriptionElement.textContent = data.weather[0].description;
  weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  temperatureELement.innerHTML = getFormattedTemperature(data.main.temp) + "°C";
  pressureElement.textContent = data.main.pressure + "hPa";
  humidityElement.textContent = data.main.humidity + "%";
  windSpeedElement.textContent = data.wind.speed + "m/s";
  windDirectionElement.innerHTML = data.wind.deg + "deg";
  weatherCardElement.style.display = "block";
};

const getBackgroundImage = (weatherId) => {
  if (weatherId >= 200 && weatherId <= 232) return "https://i.gifer.com/8nKy.gif";
  if (weatherId >= 300 && weatherId <= 321) return "https://i.gifer.com/IxI.gif";
  if (weatherId >= 500 && weatherId <= 531) return "https://i.gifer.com/73j6.gif";
  if (weatherId >= 600 && weatherId <= 622) return "https://i.gifer.com/YWuH.gif";
  if (weatherId >= 701 && weatherId <= 781) return "https://i.gifer.com/8AC8.gif";
  if (weatherId >= 801 && weatherId <= 804) return "https://i.gifer.com/srG.gif";
  if (weatherId === 800) return "https://i.gifer.com/Lx0q.gif";
  return "https://i.gifer.com/g1vA.gif";
};


const saveCityDataLocally = (city, data) => {
  localStorage.setItem(city.toLowerCase(), JSON.stringify(data));
};

const getLocalCityData = (city) => {
  return JSON.parse(localStorage.getItem(city.toLowerCase()));
};

// Fetch data from weather api and display the information
const fetchAndDisplayWeatherData = async (city) => {
  try {
    loadingElement.style.display = "block";
    errorMessageElement.style.display = "none";
    weatherCardElement.style.display = "none";

    if (!city || city.trim() === "") {
      errorMessageElement.style.display = "block";
      errorMessageElement.innerHTML = "Please enter a valid city name";
      return;
    }

    if (navigator.onLine) {
const response = await fetch(`${apiUrl}?q=${city}&units=metric&appid=${apiId}`);

      if (response.status == 404) {
        errorMessageElement.style.display = "block";
        errorMessageElement.innerHTML = "Data Not Found!";
      } else if (response.ok) {
        const data = await response.json();
        saveCityDataLocally(city, data);
        displayWeatherInformation(data);
      }
    } else {
      const data = getLocalCityData(city);
      displayWeatherInformation(data);
    }
  } catch (error) {
    errorMessageElement.style.display = "block";
    errorMessageElement.innerHTML = "Something went wrong!";
  } finally {
    loadingElement.style.display = "none";
  }
};

/*============ Event Listeners ============*/

// Search button click
searchButtonElement.addEventListener("click", () => {
  fetchAndDisplayWeatherData(searchInputElement.value);
});

// Search input key press
searchInputElement.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchAndDisplayWeatherData(searchInputElement.value);
  }
});

// Online
window.addEventListener("online", () => {
  toastMessageContainerElement.style.display = "flex";
  toastMessageElement.innerHTML =
    "🙌 Internet connection restored! <br/> You are back online!";
  toastMessageElement.classList.add("success");
  setTimeout(() => {
    toastMessageContainerElement.style.display = "none";
    toastMessageElement.innerHTML = "";
    toastMessageElement.classList.remove("success");
  }, 3000);
});

// Offline
window.addEventListener("offline", () => {
  toastMessageContainerElement.style.display = "flex";
  toastMessageElement.innerHTML =
    "⚠️ No internet connection<br/> You are in offline mode!";
  toastMessageElement.classList.add("error");
  setTimeout(() => {
    toastMessageContainerElement.style.display = "none";
    toastMessageElement.innerHTML = "";
    toastMessageElement.classList.remove("error");
  }, 3000);
});

/*============ Initialization ============*/

fetchAndDisplayWeatherData("Colchester");
