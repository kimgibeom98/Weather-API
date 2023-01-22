import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaWind, FaThermometerFull } from 'react-icons/fa';
import WeatherIntrv from "../component/WeatherIntrv";



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
  const city = "Seoul"
  const url = "http://localhost:4001/realtime";

  const [weather, setWeather] = useState([]);
  const requestData = async () => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      setWeather({
        temperature: data[0].temperature,
        main: data[0].main,
        icon: data[0].icon,
        speed: data[0].speed,
        humidity: data[0].humidity
      });
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    requestData()
  }, [weather.temperature, weather.speed, weather.humidity, url])

  const iconUlr = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
  return (
    <>
      <article style={{ display: '11' }}>
        <DateDiv>{realtimeDate()}</DateDiv>
        <LocationDiv>{city}</LocationDiv>
        <WeatherDiv>{weather.main}</WeatherDiv>
      </article>
      <ContentArticle>
        <img src={iconUlr} alt="날씨 아이콘" />
        <TemperatureDiv>{(weather.temperature - 273.15).toFixed()}℃</TemperatureDiv>
        <RightBox>
          <RightInfo style={{marginBottom : "5px"}}>
            <FaThermometerFull size="18" />
            <InfoChild>Humidity : {weather.humidity}%</InfoChild>
          </RightInfo>
          <RightInfo>
            <FaWind size="18" />
            <InfoChild>Speed : {weather.speed}km/h</InfoChild>
          </RightInfo>
        </RightBox>
      </ContentArticle>
      <WeatherIntrv />
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
    margin-bottom : 50px;
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