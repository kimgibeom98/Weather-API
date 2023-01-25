import "./App.css";
import styled, {css} from "styled-components";
import { useState } from "react";

import Weather from "./page/Weather";


function App() {
  const [cold, setCold] = useState();
  console.log(cold)
  return (
    <ContentSection className="App" cold={cold}>
      <Weather setCold={setCold} />
    </ContentSection>
  );
}
export default App;
const ContentSection = styled.section`
  width: 600px;
  height: 710px;
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