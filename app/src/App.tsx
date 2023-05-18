import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import ErrorPage from "./component/ErrorPage";
import Weather from "./page/Weather";
import { WeatherProps } from "./models/weather"
import data from "./models/mock"

export const WeatherStateContext = React.createContext<Array<object> | null>(null);

function App() {
  const [cold, setCold] = useState<boolean>(false);
  const [values, setValues] = useState([]);
  const [weather, setWeather] = useState<Array<WeatherProps>>([]);

  const [health, setHealth] = useState(false);
  const [getData, setGetData] = useState(false);

  useEffect(() => {
    setHealth(true);
    setCold(data.weatherinfo[0].main === 'Clear');
    setWeather([{
      idnum: data.weatherinfo[0].idnum,
      temperature: data.weatherinfo[0].temperature,
      main: data.weatherinfo[0].main,
      icon: data.weatherinfo[0].icon,
      speed: data.weatherinfo[0].speed,
      humidity: data.weatherinfo[0].humidity,
      currenttime: data.weatherinfo[0].currenttime,
      kordate: data.weatherinfo[0].kordate,
      engdate: data.weatherinfo[0].engdate
    }]);
    console.log(data.weatherlist)
    setValues(data.weatherlist);
    setGetData(true);
  }, []);
  return (
    <WeatherStateContext.Provider value={[weather, values]}>
      <ContentSection cold={cold}>
        {getData && health ? <Weather /> : <ErrorPage getData={getData} />}
      </ContentSection>
    </WeatherStateContext.Provider>
  );

};

export default App;
const ContentSection = styled.section<{ cold: boolean }>`
  font-family: 'Roboto';
  width: 450px;
  align-items: center;
  justify-content: center;
  background-color: #325281;
  margin: 0 auto;
  padding: 0 15px;
  box-sizing : border-box;
  ${(props) =>
    props.cold &&
    css`
    background: linear-gradient(#769fd3, #1555ad);
    `}
`;