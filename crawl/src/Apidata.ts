import * as dotenv from 'dotenv';
import moment from 'moment';
import axios from "axios"
// import schedule from 'node-schedule'

dotenv.config();

const city = 'Seoul';
const url = {
  realtime: `${process.env.BASE_URL}weather?q=${city}&appid=${process.env.API_KEY}`,
  timeinterval: `${process.env.BASE_URL}forecast?q=${city}&appid=${process.env.API_KEY}`
}

interface apiData {
  weather: {
    main: string;
    id: number;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: { speed: number; };
}

interface dataList {
  weather: {
    main: string;
    id: number;
    icon: string;
  }[];
  dt_txt: string;
  main: {
    temp: number;
  }
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

const putData = async (data: apiData) => {
  try {
    const realtimeData = {
      idnum: data.weather[0].id,
      temperature: data.main.temp,
      main: data.weather[0].main,
      icon: data.weather[0].icon,
      speed: data.wind.speed,
      humidity: data.main.humidity,
      currenttime: moment().format('MM/DD hh:mm')
    }
    await axios.put(`${process.env.HOST_KEY}/weatherinfo/1`, realtimeData);

  } catch (err) {
    console.log(err)
  }
}



const puthourlyWeather = async (data: { list: dataList[]; }) => {
  const timeintervalData = data.list.map((item) => ({
    idnum: item.weather[0].id,
    dt: item.dt_txt,
    temperature: item.main.temp,
    main: item.weather[0].main,
    icon: item.weather[0].icon
  }));
  try {
    Promise.all(timeintervalData.map(async (items, index) => {
      await axios.put(`${process.env.HOST_KEY}/weatherlist/${index + 1}`, items);
    }))
  } catch (err) {
    console.log(err)
  }
}


// schedule.scheduleJob('0 0 * * * *', function () {
timeintervalGetdata();
realtimeGetdata();
// });
