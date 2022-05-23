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

let celsiusTemperature = null;

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', search);

function convertToFarengheit(event) {
  event.preventDefault();
  let mainTemp = document.querySelector('#main-degrees');
  mainTemp.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function convertToCelsus(event) {
  event.preventDefault();
  let mainTemp = document.querySelector('#main-degrees');
  mainTemp.innerHTML = celsiusTemperature;
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
