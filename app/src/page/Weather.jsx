import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import styled from "styled-components";
import { FaWind, FaThermometerFull } from 'react-icons/fa';

import { WeatherDescKo } from "../component/WeatherDescKo ";
import WeatherInfos from "../component/WeatherInfos";
import 'moment/locale/ko';




function Weather({ setCold, health }) {
  const [weather, setWeather] = useState({});
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("languageValue");
      if (saved !== null) {
        return JSON.parse(saved);
      } else {
        return "ENG";
      }
    }
  });

  const city = {
    ENG : "Seoul",
    KOR : "서울"
  }
  const iconUlr = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`

  const optionList = [
    { value: 'ENG', name: '영어' },
    { value: 'KOR', name: '한글' }
  ]


  const requestData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_HOST_URL}/weatherinfo`);
      await setWeather({
        idnum: data[0].idnum,
        temperature: data[0].temperature,
        main: data[0].main,
        icon: data[0].icon,
        speed: data[0].speed,
        humidity: data[0].humidity,
        currenttime: data[0].currenttime
      });
    } catch (err) {
      alert('날씨 데이터를 불러오는데 실패하였습니다.')
    }
  }

  const ControlLanguage = ({ value, onChange, optionList }) => {
    return (
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {optionList.map((it, idx) =>
          <option key={idx} value={it.value}>{it.name}</option>)}
      </select>
    );
  };

  useEffect(()=>{
    localStorage.setItem('languageValue', JSON.stringify(language))
  },[language])

  
  useEffect(() => {
    if (health === true) requestData()
    setCold(weather.main === 'Clear');
  }, [weather.temperature, weather.speed, weather.humidity, setCold, weather.main, health])
  language === "ENG" ? moment.locale('en') : moment.locale('ko');


  if(Object.keys(weather).length !== 0){
    return (
      <>
        <article>
          <TitleBox>
            <SynchronizationTime>{language === "ENG" ? "Last sync date :" : "마지막 동기화 날짜 :" } {weather.currenttime}</SynchronizationTime>
            <ControlLanguage value={language} onChange={setLanguage} optionList={optionList} />
          </TitleBox>
          <DateDiv>{moment().format('YYYY-MM-DD dddd')}</DateDiv>
          <LocationDiv>{language === "ENG" ? city.ENG : city.KOR}</LocationDiv>
          <WeatherDiv>{language === "ENG" ? weather.main : Object.values(WeatherDescKo.filter((it) => it[weather.idnum])[0])}</WeatherDiv>
        </article>
        <Content>
          <img src={iconUlr} alt="날씨 아이콘" />
          <TemperatureDiv>{(weather.temperature - 273.15).toFixed()}℃</TemperatureDiv>
          <RightBox>
            <RightInfo style={{ marginBottom: 5 }}>
              <FaThermometerFull size={18} />
              <InfoChild>{language === "ENG" ? "Humidity :" : "습기 :"} {weather.humidity}%</InfoChild>
            </RightInfo>
            <RightInfo>
              <FaWind size={18} />
              <InfoChild>{language === "ENG" ? "Speed :" : "풍속 : "} {weather.speed}km/h</InfoChild>
            </RightInfo>
          </RightBox>
        </Content>
        <WeatherInfos health={health} language={language} />
      </>
    );
  }
}
export default Weather;

const TitleBox = styled.div`
  display : flex;
  justify-content : space-between;
  align-items : center;
`

const SynchronizationTime = styled.div`
  color : yellow;
  padding-top : 20px;
`

const LocationDiv = styled.div`
  color: white;
  padding: 10px 0;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
`;
const Content = styled.article`
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