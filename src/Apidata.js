import axios from "axios";

const api = {
  API_KEY: "4ce2d69a9a47b36734f7d73ad75c6785",
  BASE_URL: "https://api.openweathermap.org/data/2.5/",
};

let data = [];

function Apidata() {

    const city = "Seoul";
    const url = `${api.BASE_URL}weather?q=${city}&appid=${api.API_KEY}`;

    axios.get(url)
    .then((response)=>{
      data = response.data;
    })

    axios.post("http://localhost:3000/weather" ,{
        temperature: data.main.temp,
        main: data.weather[0].main,
        icon: data.weather[0].icon,
        speed: data.wind.speed,
        humidity: data.main.humidity
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })

}

export default Apidata;