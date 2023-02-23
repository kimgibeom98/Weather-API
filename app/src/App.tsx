import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { css } from "styled-components";

import ErrorPage from "./component/ErrorPage";
import Weather from "./page/Weather";

interface weatherProps {
  idnum: number;
  temperature: number;
  main: string;
  icon: string;
  speed: number;
  humidity: number;
  currenttime: string;
}

export const WeatherStateContext = React.createContext<Array<object> | null>(null);

function App() {
  const [cold, setCold] = useState<boolean>(false);
  const [values, setValues] = useState([]);
  const [weather, setWeather] = useState<Array<weatherProps>>([]);

  const [health, setHealth] = useState(false);
  const [getData, setGetData] = useState(false);


  useEffect(() => {
    axios
      .all([axios.get(`${process.env.REACT_APP_HOST_URL}/weatherinfo`), axios.get(`${process.env.REACT_APP_HOST_URL}/weatherlist`)])
      .then(
        axios.spread((res1, res2) => {
          if (res1.data.length >= 1 && res2.data.length >= 1) {
            setHealth(true);
            setCold(res1.data[0].main === 'Clear');
            setWeather([{
              idnum: res1.data[0].idnum,
              temperature: res1.data[0].temperature,
              main: res1.data[0].main,
              icon: res1.data[0].icon,
              speed: res1.data[0].speed,
              humidity: res1.data[0].humidity,
              currenttime: res1.data[0].currenttime
            }]);
            setValues(res2.data);
          } else {
            setHealth(false);
          };
          setGetData(true);
        })
      )
      .catch((err) => { setGetData(false); console.log(err) });
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