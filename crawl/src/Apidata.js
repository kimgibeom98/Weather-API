import * as dotenv from 'dotenv';
dotenv.config();
import axios from "axios"

const city = 'Seoul';
const host = "http://localhost:4001";
// let seoulWeatherInfo;
// let hourlyWeather ;

const url = {
  realtime: `${process.env.BASE_URL}weather?q=${city}&appid=${process.env.API_KEY}`,
  timeinterval: `${process.env.BASE_URL}forecast?q=${city}&appid=${process.env.API_KEY}`
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
// const intiatlize = async() => {
//   seoulWeatherInfo = await getData(url.realtime);
//   hourlyWeather = await getData(url.timeinterval);
// }

const putData = async () => {
  try {
    const RealtimeData = {
      temperature: seoulWeatherInfo.main.temp,
      main: seoulWeatherInfo.weather[0].main,
      icon: seoulWeatherInfo.weather[0].icon,
      speed: seoulWeatherInfo.wind.speed,
      humidity: seoulWeatherInfo.main.humidity
    }
    await axios.put(`${host}/realtime/1`, RealtimeData);

  } catch (err) {
  }
}

const puthourlyWeather = async () => {
  const TimeintervalData = hourlyWeather.list.map((items, index) => ({
    dt: hourlyWeather.list[index].dt_txt,
    temperature: hourlyWeather.list[index].main.temp,
    main: hourlyWeather.list[index].weather[0].main,
    icon: hourlyWeather.list[index].weather[0].icon
  }));
  try {
    Promise.all(TimeintervalData.map(async (items,index) => {
      await axios.put(`${host}/timeinterval/${index + 1}`, items);
    }))
  } catch (err) {

  }
}


putData();
puthourlyWeather();