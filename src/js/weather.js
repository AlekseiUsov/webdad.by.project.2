const weatherInput = document.querySelector('.weather__input');
const locationButton = document.querySelector('.weather__button');
const arrow = document.querySelector('.weather__arrow');

const weatherText = document.querySelector('.weather__text');
const weatherIcon = document.querySelector('.weather__image');

const firstBlock = document.querySelector('.weather__inner-first');
const secondBlock = document.querySelector('.weather__inner-second');

const myApiKey = '33e752ab8ec9366342da3e11c1b7625c';
let api;


function toggleBlocks() {
  firstBlock.classList.remove('hidden');
  secondBlock.classList.add('hidden');
}

const weatherDetails = (data) => {
  if (data.cod === "404") {
    weatherText.classList.remove('hidden');
    weatherText.innerHTML = `${weatherInput.value} isn't valid name`;
  } else {
    firstBlock.classList.toggle('hidden');
    secondBlock.classList.toggle('hidden');
    const loc = data.name;
    const { description, id } = data.weather[0];
    const temp = data.main.temp;

    document.querySelector('.weather__city').textContent = loc;
    document.querySelector('.weather__num').textContent = Math.floor(temp);
    document.querySelector('.weather__descripton').textContent = description;

    if (id == 800) {
      weatherIcon.src = 'https://cdn-icons-png.flaticon.com/512/1163/1163713.png';
    } else if (id >= 200 && id <= 232) {
      weatherIcon.src = 'https://cdn-icons-png.flaticon.com/512/1163/1163683.png';
    } else if (id >= 300 && id <= 321 || id >= 500 && id <= 531) {
      weatherIcon.src = 'https://cdn-icons-png.flaticon.com/512/1163/1163677.png';
    } else if (id >= 600 && id <= 622) {
      weatherIcon.src = 'https://cdn-icons-png.flaticon.com/512/1163/1163705.png';
    } else if (id >= 801 && id <= 804) {
      weatherIcon.src = 'https://cdn-icons-png.flaticon.com/512/1163/1163685.png';
    } else if (id >= 701 && id <= 781) {
      weatherIcon.src = 'https://cdn-icons-png.flaticon.com/512/1163/1163724.png';
    }
  }
}

const requestApi = (city) => {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${myApiKey}&lang={ru}`;
  fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

const showWeather = (e) => {
  if (e.key === 'Enter' && weatherInput.value !== '') {
    requestApi(weatherInput.value)
  }
}

const success = (position) => {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${myApiKey}&lang={ru}`;
  fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

const error = (error) => {
  console.log('error')
}

locationButton.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log('Your brouser not support geolacation');
  }
});

arrow.addEventListener('click', toggleBlocks);
weatherInput.addEventListener("keyup", showWeather);