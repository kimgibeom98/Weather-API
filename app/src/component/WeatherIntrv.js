import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const arr = [];
const WeatherIntrv = ({ city, api }) => {
  const url = `${api.BASE_URL}forecast?q=${city}&appid=${api.API_KEY}`;
  useEffect(() => {
    const reqApi = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data.list
        console.log(data)
      } catch {

      }
    }
    // axios.get(url)
    // .then((response) => {
    //   const data = response.data.list;
    //   for (let i = 6; i < data.length; i++) {
    //     arr.push(data[i])
    //   }
    // });
  })
  // console.log(arr)
  return (

    <article>
      <Titlefivedays>5 Day / 3 Hour Forecast</Titlefivedays>
      <ListUl>
        {arr.map((items) => (
          <li>
            <div>{items.dt_txt}</div>
            <div><img src={`http://openweathermap.org/img/wn/${items.weather.icon}@2x.png`} alt="날씨 아이콘"/></div>
            <div>{(items.main.temp - 273.15).toFixed()}℃</div>
          </li>
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

