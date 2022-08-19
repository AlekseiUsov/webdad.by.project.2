const weatherInput = document.querySelector('.weather__input');
const weatherButton = document.querySelector('.weather__button');
const myApiKey = 'http://api.weatherstack.com/current?access_key=6472d5f8eee9652e214cbb90b6688789';
let location;

const getCurrentLocation = () => {

  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    location = {
      latitude,
      longitude 
    };
  })
  return location;
}

const requestApiByCity = async (city) => {
  const request = await fetch(`${myApiKey}&query=${city}`);
  const data = request.json();
}

const requestApiByLocation = async (city) => {
  console.log(getCurrentLocation())

  //const request = await fetch(`${myApiKey}&query=${lat}&${long}`);
  //const data = request.json();
}


const showWeather = (e) => {
  if (e.key === 'Enter' && weatherInput.value !== '') {
    requestApiByCity(weatherInput.value)
  }
}

weatherButton.addEventListener("click", requestApiByLocation)
weatherInput.addEventListener("keyup", showWeather);