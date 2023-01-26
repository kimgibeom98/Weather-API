import * as dotenv from 'dotenv';
import axios from "axios"
import schedule from 'node-schedule'

dotenv.config();

const city = 'Seoul';
const host = "http://localhost:4001";

const getCurrentTime = () => {
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const date = String(new Date().getDate()).padStart(2, "0");
  const Hours = String(new Date().getHours()).padStart(2, "0");
  const Minutes = String(new Date().getMinutes()).padStart(2, "0");
  return `${month}월 ${date}일 ${Hours}:${Minutes}`
}

const url = {
  realtime: `${process.env.BASE_URL}weather?q=${city}&appid=${process.env.API_KEY}`,
  timeinterval: `${process.env.BASE_URL}forecast?q=${city}&appid=${process.env.API_KEY}`
}

const realtimeGetdata = async () => {
  try {
    const response = await axios.get(url.realtime);
    const data = await response.data;
    putData(data)
  } catch (err) {
    console.log(err)
  }
} 

const timeintervalGetdata = async () => {
  try {
    const response = await axios.get(url.timeinterval);
    const data = await response.data;
    puthourlyWeather(data)
  } catch (err) {
    console.log(err)
  }
} 


const putData = async (data) => {
  try {
    const realtimeData = {
      temperature: data.main.temp,
      main: data.weather[0].main,
      icon: data.weather[0].icon,
      speed: data.wind.speed,
      humidity: data.main.humidity,
      currenttime : getCurrentTime()
    }
    await axios.put(`${host}/realtime/1`, realtimeData);

  } catch (err) {
    console.log(err)
  }
}

const puthourlyWeather = async (data) => {
  const timeintervalData = data.list.map((item) => ({
    dt: item.dt_txt,
    temperature: item.main.temp,
    main: item.weather[0].main,
    icon: item.weather[0].icon
  }));
  try {
    Promise.all(timeintervalData.map(async (items, index) => {
      await axios.put(`${host}/timeinterval/${index + 1}`, items);
    }))
  } catch (err) {
    console.log(err)
  }
}


// schedule.scheduleJob('0 30 * * * *', function () {
  timeintervalGetdata();
  realtimeGetdata();
// });
