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
const resultData = await getData(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=40f1249c461da5a83fd2efe34754bdba`);
const intervalData = await getData(`https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=40f1249c461da5a83fd2efe34754bdba`);

const postData = async () => {
  try {
    const data = {
      id : resultData.weather[0].id,
      temperature: resultData.main.temp,
      main: resultData.weather[0].main,
      icon: resultData.weather[0].icon,
      speed: resultData.wind.speed,
      humidity: resultData.main.humidity
    }
    const response = await axios.post('http://localhost:4000/realtime', data);
    return response;

  } catch (err) {
    console.log(err)
  }
}

const postIntervalData =  async () => {
  try {
    const data = [];
    for(let i = 6; i < intervalData.list.length; i++){
      data.push({
        dt : intervalData.list[i].dt_txt,
        temperature : intervalData.list[i].main.temp,
        main : intervalData.list[i].weather[0].main,
        icon : intervalData.list[i].weather[0].icon
      })
    }
    const response = await axios.post('http://localhost:4000/timeinterval', data);
    return response;

  } catch (err) {
    console.log(err)
  }
}


postData();
postIntervalData();