# :sunny: react-weather-app

![Animation](https://user-images.githubusercontent.com/77928818/219986076-1d138ca8-d4ff-47d3-b067-8f42ac6a4639.gif)

 OpenWeatherMap과 React를 이용해서 만든 날씨 정보 앱입니다.
 
 API를 조회하는 횟수가 한정되어있어 매 정각 데이터를 수집 후 REST API로 만들어서 제작하였습니다.  

## 기술 사항
* 날씨 정보 상세
  - 동기화 한 시간의 해당하는 실시간 날씨 정보를 보여줍니다.
* 5일 / 3시간 예보
  - 3시간 간격으로 5일간의 날씨 정보를 보여줍니다.
* 정각마다 날씨 정보 업데이트
  - 매 정각 날씨 정보를 업데이트(스케줄러)합니다.
* 마지막 동기화 날짜 표출
  - 마지막으로 동기화한 날짜와 시간을 보여줍니다.
* 버튼 클릭 시 5일 / 3시간 예보 화면 변환
  - 가로 형태 view
  - 세로 형태 view
* 한글, 영어 번역
  - select 박스로 선택한 언어에 따라서 번역합니다.
* 날씨에 따른 background 변환
  - clear(맑음)일 때와 그렇지 않을 때 배경 색상 구분
* 예외 처리
  - 데이터가 존재하지 않거나 통신이 원활하지 않을 때 에러 페이지 표출
