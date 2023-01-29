import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import WeatherContent from "./WeatherContent"

const WeatherInfos = ({health}) => {
  const [value, setValue] = useState([]);
 
  const requestData =  async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_HOST_URL}/timeinterval`);
      setValue(data)
    } catch (err) {
      alert('날씨 데이터를 불러오는데 실패하였습니다.')
    }
  }
  
  useEffect(() => {
    if(health === true) requestData();
  }, [health])

  return (
    <article>
      <Titlefivedays>
        5 Day / 3 Hour Forecast
        <ChangeView>change</ChangeView>
        </Titlefivedays>
        <WeatherContainer>
          {value.map((items) => (
            <ContainerList key={items.id} style={{marginBottom: 20, width: "33.33%"}} >
              <WeatherContent items={items}/>
            </ContainerList>
          ))}
        </WeatherContainer>
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

const WeatherContainer = styled.ul`
  display : flex;
  flex-wrap : wrap;
  padding: 0;
  justify-content : space-between;
  overflow-y : scroll;
  height : 340px;
`
const ContainerList = styled.li` > div {
  color : white;
  text-align : center;
  font-size : 15px;
}
`

const ChangeView = styled.button`
  border : 1px solid white;
  background : white;
  color : black;
  cursor : pointer;
  height : 25px;
  font-weight : 700;
  font-family: 'Roboto';
`
