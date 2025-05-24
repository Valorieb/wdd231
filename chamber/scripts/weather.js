const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");
const todayTemp = document.querySelector("#today-temp");
const tomorrowTemp = document.querySelector("#tomorrow-temp");
const thirdTemp = document.querySelector("#third-day-temp");

const thisDay = new Date();
const tomorrow = new Date();
const thirdDay = new Date();

tomorrow.setDate(thisDay.getDate() + 1);
thirdDay.setDate(thisDay.getDate() + 2);



const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dayName = daysOfWeek[thisDay.getDay()];
const tomorrowName =daysOfWeek[tomorrow.getDay()];
const thirdDayName = daysOfWeek[thirdDay.getDay()];

console.log(dayName);
console.log(tomorrowName);

const currentWeatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat=33.42&lon=-111.83&units=imperial&appid=01b71e62aa3532f45a7b65c6d95d0258";

const dailyWeatherUrl =
  "https://api.openweathermap.org/data/2.5/forecast?lat=33.42&lon=-111.83&units=imperial&appid=01b71e62aa3532f45a7b65c6d95d0258";

async function apiFetch(url, display) {
  console.log("function called");
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      display(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

apiFetch(currentWeatherUrl, displayCurrentWeather);
apiFetch(dailyWeatherUrl, displayDailyForecast);

function displayCurrentWeather(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", desc);
  captionDesc.textContent = `${desc}`;
}

function displayDailyForecast(data) {
  todayTemp.innerHTML = `${data.list[0].main.temp}&deg;F`;
  tomorrowTemp.innerHTML = `${tomorrowName}: ${data.list[4].main.temp}&deg;F`;
  thirdTemp.innerHTML = `${thirdDayName}: ${data.list[12].main.temp}&deg;F`;
}
