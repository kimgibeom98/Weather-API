import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaWind, FaThermometerFull } from 'react-icons/fa';
import WeatherIntrv from "../component/WeatherIntrv";



function Weather({setCold}) {

  const realtimeDate = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];
    const days = ["Sun", "Mon", "Tue", "Wed", "Tur", "Fri", "Sat"];
    const day = days[new Date().getDay()];
    const month = months[new Date().getMonth()];
    const year = new Date().getFullYear();
    const date = new Date().getDate();

    return `${day} ${date} ${month} ${year}`;
  };
  const [weather, setWeather] = useState([]);

  const city = "Seoul"
  const url = "http://localhost:4001/realtime";
  const iconUlr = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`

  const requestData = async () => {
    try {
      const {data} = await axios.get(url);
      setWeather({
        temperature: data[0].temperature,
        main: data[0].main,
        icon: data[0].icon,
        speed: data[0].speed,
        humidity: data[0].humidity
      });
    } catch (err) {
      alert('날씨 데이터를 불러오는데 실패하였습니다.')
    }
  }

  useEffect(() => {
    requestData()
    setCold(weather.main === 'Clear');
  }, [weather.temperature, weather.speed, weather.humidity, url, setCold, weather.main])
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
          <RightInfo style={{marginBottom : 5}}>
            <FaThermometerFull size={18} />
            <InfoChild>Humidity : {weather.humidity}%</InfoChild>
          </RightInfo>
          <RightInfo>
            <FaWind size={18} />
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
  font-weight : 700;
`;

const InfoChild = styled.div`
font-size: 15px;
margin-left : 5px;
font-weight : 500;
`