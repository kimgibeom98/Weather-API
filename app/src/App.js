import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { css } from "styled-components";

import "./App.css";
import ErrorPage from "./component/ErrorPage";
import Weather from "./page/Weather";

export const WeatherStateContext = React.createContext();

function App() {
  const [cold, setCold] = useState('');
  const [value, setValue] = useState([]);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .all([axios.get(`${process.env.REACT_APP_HOST_URL}/weatherinfo`), axios.get(`${process.env.REACT_APP_HOST_URL}/weatherlist`)])
      .then(
        axios.spread((res1, res2) => {
          if (res1.data.length >= 1 && res2.data.length >= 1) {
            setCold(res1.data[0].main === 'Clear');
            setWeather({
              idnum: res1.data[0].idnum,
              temperature: res1.data[0].temperature,
              main: res1.data[0].main,
              icon: res1.data[0].icon,
              speed: res1.data[0].speed,
              humidity: res1.data[0].humidity,
              currenttime: res1.data[0].currenttime
            });
            setValue(res2.data);
          }
        })
      )
      .catch((err) => console.log(err))
  }, [])

  return (
    <WeatherStateContext.Provider value={[weather, value]}>
      <ContentSection cold={cold}>
        {cold !== "" && Object.keys(weather && value).length !== 0 ? <Weather /> : <ErrorPage />}
      </ContentSection>
    </WeatherStateContext.Provider>
  );
}
export default App;
const ContentSection = styled.section`
  width: 600px;
  align-items: center;
  justify-content: center;
  background-color: #325281;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing : border-box;
  ${(props) =>
    props.cold &&
    css`
    background: linear-gradient(#577eaf, #1555ad);
    `}
`;