import React, { useEffect, useState, useContext } from "react";
import moment from 'moment';
import styled from "styled-components";
import { FaWind, FaThermometerFull } from 'react-icons/fa';
import { WeatherDescKo } from "../component/WeatherDescKo ";
import { WeatherStateContext } from "../App";
import WeatherInfos from "../component/WeatherInfos";
import 'moment/locale/ko';

function Weather() {
  const [weather] = useContext(WeatherStateContext);
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("languageValue");
      if (saved !== null) {
        return JSON.parse(saved);
      } else {
        return "ENG";
      }
    };
  });

  const city = {
    ENG: "Seoul",
    KOR: "서울"
  };

  const iconUlr = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  useEffect(() => {
    localStorage.setItem('languageValue', JSON.stringify(language))
    language === "ENG" ? moment.locale('en') : moment.locale('ko');
  }, [language]);
  console.log(123)
  return (
    <>
      <article>
        <TitleBox>
          <SynchronizationTime>{language === "ENG" ? "Last sync date :" : "마지막 동기화 날짜 :"} {weather.currenttime}</SynchronizationTime>
          <select name="" id="" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="ENG">영어</option>
            <option value="KOR">한글</option>
          </select>
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
      <WeatherInfos language={language} />
    </>
  );
};
export default React.memo(Weather);

const TitleBox = styled.div`
  display : flex;
  justify-content : space-between;
  align-items : center;
`;

const SynchronizationTime = styled.div`
  color : yellow;
  padding-top : 20px;
`;

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
`;
const RightInfo = styled.div`
display : flex;
text-align : right;
color : white;
align-items : center;
`;
const RightBox = styled.div`
  font-size: 20px;
`;
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
`;