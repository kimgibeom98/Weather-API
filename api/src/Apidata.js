import axios from "axios"

const getData = async (apiUrl) => {
  try {
    const response = await axios.get(apiUrl);
    const data = await response.data;
    return data

  } catch (err) {
    console.log(err)
  }
}
const seoulWeatherInfo = await getData(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=40f1249c461da5a83fd2efe34754bdba`);
const hourlyWeather = await getData(`https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=40f1249c461da5a83fd2efe34754bdba`);

const postData = async () => {
  try {
    const data = {
      id : seoulWeatherInfo.weather[0].id,
      temperature: seoulWeatherInfo.main.temp,
      main: seoulWeatherInfo.weather[0].main,
      icon: seoulWeatherInfo.weather[0].icon,
      speed: seoulWeatherInfo.wind.speed,
      humidity: seoulWeatherInfo.main.humidity
    }
    const response = await axios.post('http://localhost:4000/realtime', data);
    return response;

  } catch (err) {
    console.log(err)
  }
}

const posthourlyWeather =  async () => {
  try {
    const data = [];
    for(let i = 6; i < hourlyWeather.list.length; i++){
      data.push({
        dt : hourlyWeather.list[i].dt_txt,
        temperature : hourlyWeather.list[i].main.temp,
        main : hourlyWeather.list[i].weather[0].main,
        icon : hourlyWeather.list[i].weather[0].icon
      })
    }
    const response = await axios.post('http://localhost:4000/timeinterval', data);
    return response;

  } catch (err) {
    console.log(err)
  }
}


postData();
posthourlyWeather();