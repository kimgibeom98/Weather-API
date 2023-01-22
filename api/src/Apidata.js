import * as dotenv from 'dotenv';
dotenv.config();
import axios from "axios"

const city = 'Seoul';

const url = {
  realtime: `${process.env.BASE_URL}weather?q=${city}&appid=${process.env.API_KEY}`,
  timeinterval: `${process.env.BASE_URL}forecast?q=${city}&appid=${process.env.API_KEY}`
}

const serverUrl = {
  serverRealtime: 'http://localhost:4000/realtime',
  serverTimeinterval: 'http://localhost:4000/timeinterval'
}


const getData = async (apiUrl) => {
  try {
    const response = await axios.get(apiUrl);
    const data = await response.data;
    return data

  } catch (err) {
  }
}

const seoulWeatherInfo = await getData(url.realtime);
const hourlyWeather = await getData(url.timeinterval);

const delData = async () => {
  try {
    await axios.delete('http://localhost:4000/timeinterval',);
  } catch (err) {
  }
}

const postData = async () => {
  try {
    const data = {
      temperature: seoulWeatherInfo.main.temp,
      main: seoulWeatherInfo.weather[0].main,
      icon: seoulWeatherInfo.weather[0].icon,
      speed: seoulWeatherInfo.wind.speed,
      humidity: seoulWeatherInfo.main.humidity
    }
    await axios.post(serverUrl.serverRealtime, data);

  } catch (err) {
  }
}

const posthourlyWeather = async () => {
  const data = [];
  for (let i = 6; i < hourlyWeather.list.length; i++) {
    data.push({
      dt: hourlyWeather.list[i].dt_txt,
      temperature: hourlyWeather.list[i].main.temp,
      main: hourlyWeather.list[i].weather[0].main,
      icon: hourlyWeather.list[i].weather[0].icon
    })
  }
  try {
    data.map(async (items) => {
       await axios.post(serverUrl.serverTimeinterval,items);
    })
  } catch (err) {
  }
}
// delData();
// 
postData();
posthourlyWeather();