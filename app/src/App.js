import { useState, useEffect } from "react";
import axios from "axios";
import styled, { css } from "styled-components";

import "./App.css";
import Weather from "./page/Weather";
import ErrorPage from "./component/ErrorPage";


function App() {
  const [cold, setCold] = useState('');
  const [health, setHealth] = useState(false);

  useEffect(() => {
    axios
      .all([axios.get(`${process.env.REACT_APP_HOST_URL}/realtime`), axios.get(`${process.env.REACT_APP_HOST_URL}/timeinterval`)])
      .then(
        axios.spread((res1, res2) => {
          console.log(res1.data, res2.data)
          res1.data.length >= 1 && res2.data.length >= 1 ? setHealth(true) : setHealth(false)
        })
      )
      .catch((err) => console.log(err))
  }, [])

  return (
      <ContentSection className="App" cold={cold}>
        {health ? <Weather setCold={setCold} health={health} /> : <ErrorPage />}
      </ContentSection>
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