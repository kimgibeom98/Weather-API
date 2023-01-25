import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const WeatherIntrv = () => {
  const url = "http://localhost:4001/timeinterval";
  const [value, setValue] = useState([]);
 
  const requestData =  async () => {
    try {
      const {data} = await axios.get(url);
      setValue(data)
    } catch (err) {
      alert('날씨 데이터를 불러오는데 실패하였습니다.')
    }
  }
  
  useEffect(() => {
    requestData();
  }, [])

  return (
    <article>
      <Titlefivedays>5 Day / 3 Hour Forecast</Titlefivedays>
        <ListUl>
          {value.map((items) => (
            <ListLi key={items.id} style={{marginBottom: 20, width: "33.33%"}} >
              <div>{items.dt.substr(0,16)}</div>
              <div><img src={`http://openweathermap.org/img/wn/${items.icon}@2x.png`} alt="날씨 아이콘" /></div>
              <div>{items.main}</div>
              <div>{(items.temperature - 273.15).toFixed()}℃</div>
            </ListLi>
          ))}
        </ListUl>
    </article>
  )
}

export default WeatherIntrv;

const Titlefivedays = styled.div`
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding : 10px 5px;
  color : white;
  box-sizing : border-box;
  font-weight : 700;
`

const ListUl = styled.ul`
  display : flex;
  flex-wrap : wrap;
  padding: 0;
  justify-content : space-between;
  overflow-y : scroll;
  height : 360px;
`
const ListLi = styled.li` > div {
  color : white;
  text-align : center;
  font-size : 15px;
}
`
