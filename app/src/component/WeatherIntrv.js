import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const WeatherIntrv = () => {
  const url = "http://localhost:4000/timeinterval";
  const [data, setData] = useState('');
  
    const requestData = async () => {
      try {
        const response = await axios.get(url);
        const data = await response.data;
        setData(data[0])
      } catch (err) {
        console.log(err)
      }
    }
  useEffect(() => {
    requestData();
  },[])
  console.log(data)
  return (
    <article>
      <Titlefivedays>5 Day / 3 Hour Forecast</Titlefivedays>
      <ListUl>
        {data.map((items) => (
          <ListLi>
            <div>{items.dt}</div>
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
  flex-wrap : wrap
`
const ListLi = styled.li`
 > div
  color : white;
`

