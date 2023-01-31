import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import WeatherContent from "./WeatherContent"

const WeatherInfos = ({health, language}) => {
  const [value, setValue] = useState([]);
  const [view, setView] =useState('yview');
 
  const requestData =  async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_HOST_URL}/timeinterval`);
      setValue(data)
    } catch (err) {
      alert('날씨 데이터를 불러오는데 실패하였습니다.')
    }
  }

  const changeListview = () => {
    view === "yview" ? setView("xview") : setView("yview")
  }
  
  useEffect(() => {
    if(health === true) requestData();
  }, [health])

  return (
    <article>
      <Titlefivedays>
        {language === "ENG" ? "5 Day / 3 Hour Forecast" : "5일 / 3시간 예보"}
        <ChangeView onClick={changeListview}>{language === "ENG" ? "change view" : "화면 변환"}</ChangeView>
        </Titlefivedays>
        {view === "yview" ?
          <YweatherContainer>
            {value.map((items) => (
              <ContainerList key={items.id} style={{marginBottom: 20, width: "33.33%"}} >
                <WeatherContent items={items} language={language}/>
              </ContainerList>
            ))}
          </YweatherContainer>
          :
          <XweatherContainer>
            {value.map((items) => (
              <ContainerList key={items.id} style={{marginLeft: 10, marginRight : 10, width: "33.33%"}} >
                <WeatherContent items={items} language={language}/>
              </ContainerList>
            ))}
          </XweatherContainer>
        }
    </article>
  )
}

export default WeatherInfos;

const Titlefivedays = styled.div`
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding : 0 5px;
  color : white;
  box-sizing : border-box;
  font-weight : 700;
  display : flex;
  justify-content : space-between;
  align-items : center;
  height : 40px;
`

const YweatherContainer = styled.ul`
  display : flex;
  flex-wrap : wrap;
  padding: 0;
  justify-content : space-between;
  overflow-y : scroll;
  max-height : 340px;
`

const XweatherContainer = styled.ul`
  display : flex;
  flex-wrap : nowrap;
  overflow-x : auto;
  padding : 0;
`
const ContainerList = styled.li` > div {
  color : white;
  text-align : center;
  font-size : 15px;
}
`

const ChangeView = styled.button`
  border : none;
  height : 40px;
  background : rgba(0,0,0,0.5);
  color : #e5e5e5;
  cursor : pointer;
  max-height : 25px;
  font-family: 'Roboto';
  border-radius : 5px;
`
