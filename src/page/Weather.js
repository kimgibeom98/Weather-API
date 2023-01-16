import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";
import { FaWind, FaThermometerFull } from 'react-icons/fa';

const api = {
  API_KEY: "40f1249c461da5a83fd2efe34754bdba",
  BASE_URL: "https://api.openweathermap.org/data/2.5/",
};

function Weather() {

  const realtimeDate = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];
    const days = ["Sun", "Mon", "Tue", "Wed", "Tur", "Fri", "Sat"];
    const day = days[new Date().getDay()];
    const month = months[new Date().getMonth()];
    const year = new Date().getFullYear();
    const date = new Date().getDate();

    return `${day} ${date} ${month} ${year}`;
  };

  const city = "Seoul";
  const url = `${api.BASE_URL}weather?q=${city}&appid=${api.API_KEY}`;
  const [weather, setWeather] = useState("");
  // const [wthrIntrv, setwthrIntrv] = useState("");

  axios.get(url).then((response) => {
    const data = response.data;
    console.log(data)
    setWeather({
      temperature: data.main.temp,
      main: data.weather[0].main,
      icon: data.weather[0].icon,
      speed: data.wind.speed,
      humidity: data.main.humidity
    });
  });

  const iconUlr = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
  return (
    <>
      <article>
        <DateDiv>{realtimeDate()}</DateDiv>
        <LocationDiv>{city}</LocationDiv>
        <WeatherDiv>{weather.main}</WeatherDiv>
      </article>
      <ContentArticle>
        <img src={iconUlr} alt="날씨 아이콘" />
        <TemperatureDiv>{(weather.temperature - 273.15).toFixed()}℃</TemperatureDiv>
        <RightBox>
          <RightInfo>
            <FaThermometerFull size="18" />
            <InfoChild>Humidity : {weather.humidity}%</InfoChild>
            </RightInfo>
          <RightInfo>
            <FaWind size="18" />
            <InfoChild>Speed : {weather.speed}km/h</InfoChild>
          </RightInfo>
        </RightBox>
      </ContentArticle>

    </>
  );
}
export default Weather;

const LocationDiv = styled.div`
  color: white;
  padding: 10px 0;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
`;
const ContentArticle = styled.article`
    text-align : center;
    display : flex;
    justify-content : space-between;
    align-items : center;
`
const RightInfo = styled.div`
display : flex;
text-align : right;
color : white;
align-items : center;
`
const RightBox = styled.div`
  font-size: 20px;
`
const DateDiv = styled.div`
  text-align : center;
  color: white;
  font-size: 15px;
  padding-top : 20px;
`;

const TemperatureDiv = styled.div`
  color: white;
  font-size: 50px;
`;

const WeatherDiv = styled.div`
  color: white;
  font-size: 20px;
  text-align : center;
`;

const InfoChild = styled.div`
font-size: 15px;
margin-left : 5px;
`

