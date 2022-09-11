const weatherInput = document.querySelector('.weather__input');
const weatherButton = document.querySelector('.weather__button');

const weatherBlock = document.querySelector('.weather__block');
const weatherInner = document.querySelector('.weather__inner');

const weatherCity = document.querySelector('.weather__city');
const weatherTemp = document.querySelector('.weather__num');

const weatherText = document.querySelector('.weather__text');
const myApiKey = 'http://api.weatherstack.com/current?access_key=6472d5f8eee9652e214cbb90b6688789';
let location;

const requestApiByCity = (city) => {
  try {
    fetch (`${myApiKey}&query=${city}`)
    .then((response) => response.json())
    .then((data) => {
      weatherBlock.classList.toggle('hidden');
      weatherCity.textContent = data.location.name;
      weatherTemp.textContent = data.current.temperature;
      weatherInner.classList.toggle('hidden');
    })
  }
  catch(e) {
    weatherText.classList.add(weather__text-invalid);
  }
}

const requestApiByLocation = () => {
  let lat;
  let long;

  navigator.geolocation.getCurrentPosition(function(location) {
    lat = location.coords.latitude;
    long = location.coords.longitude;
    console.log(location.coords.latitude);
    console.log(location.coords.longitude);
  });

  const api = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=33e752ab8ec9366342da3e11c1b7625c`;
  try {
    fetch (api)
    .then((response) => response.json())
    .then((data) => {console.log(data)})
  }
  catch(e) {
    console.log(e)
  }
}


const showWeather = (e) => {
  if (e.key === 'Enter' && weatherInput.value !== '') {
    requestApiByCity(weatherInput.value)
  }
}

weatherButton.addEventListener("click", requestApiByLocation)
weatherInput.addEventListener("keyup", showWeather)