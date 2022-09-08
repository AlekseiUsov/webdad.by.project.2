const weatherInput = document.querySelector('.weather__input');
const weatherButton = document.querySelector('.weather__button');
const myApiKey = 'http://api.weatherstack.com/current?access_key=6472d5f8eee9652e214cbb90b6688789';
let location;


const requestApiByCity = async (city) => {
  const request = await fetch(`${myApiKey}&query=${city}`);
  const data = request.json();
  console.log(data)
}



const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(function(location) {
    data.push(location.coords.latitude);
    data.push(location.coords.longitude);
  });
  return data;
}

const requestApiByLocation = async () => {
  const [lat, long] = getCurrentLocation();
  const api = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude={part}&appid={33e752ab8ec9366342da3e11c1b7625c}`;
  console.log(api)
}


const showWeather = (e) => {
  if (e.key === 'Enter' && weatherInput.value !== '') {
    requestApiByCity(weatherInput.value)
  }
}

weatherButton.addEventListener("click", requestApiByLocation)
weatherInput.addEventListener("keyup", showWeather)