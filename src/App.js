import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import Weather from "./page/Weather";


function App() {
  const [cold, setCold] = useState();

  return (
    <ContentSection className="App" cold={cold}>
      <Weather setCold={setCold} />
    </ContentSection>
  );
}
export default App;
const ContentSection = styled.section`
  width: 600px;
  height: 600px;
  align-items: center;
  justify-content: center;
  background-color: #106096;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing : border-box;
`;