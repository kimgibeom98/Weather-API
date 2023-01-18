import axios from "axios"

// nodejs vs 브라우저 런타임 차이 
// 자바스크립트 모듈

// weatherapi-react/api -> express json-server fs
// weatherapi-react/app -> (html css js) 브라우저 html css js
// api app
// 스케줄러 vs setInterval
// HMR Hot replace moudle 
// nodejs env 

let data = [];
function Apidata() {
  const getData = async () => {
    const city = "Seoul";
    const url = `${process.env.REACT_APP_BASE_URL}weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`;

    const response = await axios.get(url);
    data = response.data;
    return data
  }
  // console.log(123)
  // 1 2 3 4 5 6
  // node-schuldule
  // 
  const postData = async () => {
    axios.post("http://localhost:3000/weather", {
      temperature: data.main.temp,
      main: data.weather[0].main,
      icon: data.weather[0].icon,
      speed: data.wind.speed,
      humidity: data.main.humidity
    })
  }
  postData();

}

// getLastUpdateDate  -> (1시간넘었다,)   -> getData -> PostData

Apidata();

// export default Apidata;