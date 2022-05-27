let now = new Date();
let mainDay = document.querySelector('#now-day');

let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
let day = days[now.getDay()];
mainDay.innerHTML = `${day}`;

let mainDegrees = document.querySelector('#main-degrees');

let date = now.getDate();
let mainDate = document.querySelector('#now-date');
mainDate.innerHTML = `${date}`;

let mainMonth = document.querySelector('#now-month');

let monthes = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
let month = monthes[now.getMonth()];
mainMonth.innerHTML = `${month}`;

let year = now.getFullYear();
let mainYear = document.querySelector('#now-year');
mainYear.innerHTML = `${year}`;

let hour = now.getHours();
if (hour < 10) hour = `0${hour}`;
let minutes = now.getMinutes();
if (minutes < 10) minutes = `0${minutes}`;
let mainTime = document.querySelector('#now-time');
mainTime.innerHTML = `${hour} : ${minutes}`;

function celsusAccent() {
  let farengheitUnit = document.querySelector('#farengheit');
  farengheitUnit.style.fontSize = 10 + 'px';
  farengheitUnit.style.color = '#00cdff';
  let celsusUnit = document.querySelector('#celsus');
  celsusUnit.style.fontSize = 30 + 'px';
  celsusUnit.style.color = '#0512d8';
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return days[day];
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = 'e75845b1b358b448cb604a8d108e8ed3';
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector('#forecast');
  let forecastHTML = `<tr>`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML += `<td class="weather">
      <div class="day" id="forecast-day">${formatDay(forecastDay.dt)}</div>
     <br/>
     <div><img id="forecast-icon" src="https://openweathermap.org/img/wn/${
       forecastDay.weather[0].icon
     }@2x.png" alt="" width="32" ></div>
     <div class="temperature"> <span id="forecast-degree">${
       forecastDay.temp.day
     }</span> °C </div>
     <div class="wet">💧<span id="forecast-humidity">${
       forecastDay.humidity
     }</span>% </div>
   </td>`;
    }
  });
  forecastHTML += `</tr>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector('h1');

  let cityInput = document.querySelector('#search-text-input');
  console.log(cityInput.value);
  cityElement.innerHTML = `Today in ${cityInput.value}`;
  let city = cityInput.value;
  console.log(city);
  let apiKey = 'e75845b1b358b448cb604a8d108e8ed3';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  function showTemperature(response) {
    console.log(response.data);

    celsiusTemperature = Math.round(response.data.main.temp);
    let tempElement = document.querySelector('#main-degrees');
    tempElement.innerHTML = celsiusTemperature;
    celsusAccent();
    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    console.log(lat);
    console.log(lon);
    let iconElement = document.querySelector('#current-icon');
    console.log(iconElement);
    let icon = response.data.weather[0].icon;
    iconElement.setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );

    let description = response.data.weather[0].main;
    console.log(description);
    let descriptionElement = document.querySelector('#current-description');
    descriptionElement.innerHTML = description;

    let humidity = Math.round(response.data.main.humidity);
    console.log(humidity);
    let wind = Math.round(response.data.wind.speed);
    console.log(wind);

    let wetElement = document.querySelector('#current-wet');
    wetElement.innerHTML = humidity;
    let windElement = document.querySelector('#current-wind');
    windElement.innerHTML = wind;
    getForecast(response.data.coord);
    showForecast(response);
  }

  axios.get(apiUrl).then(showTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', search);

function convertToFarengheit(event) {
  event.preventDefault();
  let mainTemp = document.querySelector('#main-degrees');
  mainTemp.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);

  let farengheitUnit = document.querySelector('#farengheit');
  farengheitUnit.style.fontSize = 30 + 'px';
  farengheitUnit.style.color = '#0512d8';
  let celsusUnit = document.querySelector('#celsus');
  celsusUnit.style.fontSize = 10 + 'px';
  celsusUnit.style.color = '#00cdff';
}

function convertToCelsus(event) {
  event.preventDefault();
  let mainTemp = document.querySelector('#main-degrees');
  mainTemp.innerHTML = celsiusTemperature;
  celsusAccent();
}

let farengheitLink = document.querySelector('#farengheit');
farengheitLink.addEventListener('click', convertToFarengheit);

let celsusLink = document.querySelector('#celsus');
celsusLink.addEventListener('click', convertToCelsus);

function showWeather(event) {
  function showPosition(position) {
    console.log(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiKey = 'e75845b1b358b448cb604a8d108e8ed3';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    function showTemperature(response) {
      console.log(response);
      let currentCity = response.data.name;
      console.log(currentCity);
      let h1 = document.querySelector('h1');
      h1.innerHTML = `You are in ${currentCity} now`;
      celsiusTemperature = Math.round(response.data.main.temp);
      let tempElement = document.querySelector('#main-degrees');
      tempElement.innerHTML = celsiusTemperature;
      celsusAccent();
      let iconElement = document.querySelector('#current-icon');
      console.log(iconElement);
      let icon = response.data.weather[0].icon;
      iconElement.setAttribute(
        'src',
        `http://openweathermap.org/img/wn/${icon}@2x.png`
      );
      let description = response.data.weather[0].main;
      console.log(description);
      let descriptionElement = document.querySelector('#current-description');
      descriptionElement.innerHTML = description;

      let humidity = Math.round(response.data.main.humidity);
      console.log(humidity);
      let wind = Math.round(response.data.wind.speed);
      console.log(wind);

      let wetElement = document.querySelector('#current-wet');
      wetElement.innerHTML = humidity;
      let windElement = document.querySelector('#current-wind');
      windElement.innerHTML = wind;
    }
    axios.get(apiUrl).then(showTemperature);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector('#current-button');
currentButton.addEventListener('click', showWeather);
