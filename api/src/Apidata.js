import * as dotenv from 'dotenv';
dotenv.config();

import axios from "axios"


const city = 'Seoul';

const url = {
  realtime : `${process.env.BASE_URL}weather?q=${city}&appid=${process.env.API_KEY}`,
  timeinterval : `${process.env.BASE_URL}forecast?q=${city}&appid=${process.env.API_KEY}`
}

const serverUrl = {
  serverRealtime : 'http://localhost:4000/realtime',
  serverTimeinterval : 'http://localhost:4000/realtime'
}


const getData = async (apiUrl) => {
  try {
    const response = await axios.get(apiUrl);
    const data = await response.data;
    return data

  } catch (err) {
    console.log(err)
  }
}

const seoulWeatherInfo = await getData(url.realtime);
const hourlyWeather = await getData(url.timeinterval);

const delData = async () => {
  try{
    const response = await axios.delete('http://localhost:4000/timeinterval',);
    return response.data;
  }catch (err) {
    console.log(err)
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
    delData();
    const response = await axios.post(serverUrl.serverTimeinterval, data);
    return response;

  } catch (err) {
    console.log(err)
  }
}

const posthourlyWeather =  async () => {
  try {
    let countId = 0;
    const data = [];
    for(let i = 6; i < hourlyWeather.list.length; i++){
      data.push({
        id : countId,
        dt : hourlyWeather.list[i].dt_txt,
        temperature : hourlyWeather.list[i].main.temp,
        main : hourlyWeather.list[i].weather[0].main,
        icon : hourlyWeather.list[i].weather[0].icon
      })
      ++countId;
    }
    const response = await axios.post('http://localhost:4000/timeinterval', data);
    return response;

  } catch (err) {
    console.log(err)
  }
}

// delData();
// 
postData();
posthourlyWeather() ;