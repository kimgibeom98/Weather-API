const WeatherContent = ({items}) => {
  return (
    <>
      <div>{items.dt.substr(0, 16)}</div>
      <div><img src={`http://openweathermap.org/img/wn/${items.icon}@2x.png`} alt="날씨 아이콘" /></div>
      <div>{items.main}</div>
      <div>{(items.temperature - 273.15).toFixed()}℃</div>
    </>
  )
}

export default WeatherContent;