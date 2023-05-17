# :sunny: react-weather-app

![Animation](https://github.com/kimgibeom98/react-weather-app/assets/77928818/a29ee023-d60a-49c7-802c-7d6e04b64ca1)

 OpenWeatherMap 과 React를 이용해서 만든 날씨 정보 앱입니다. json-server를 이용하여 REST API를 구축하였고 폴더구조를 CRAWL(날씨 데이터 수집), API(날씨 데이터 정보), APP(화면 렌더링)으로 나눠서 관리하였습니다.

## 기술 사항
* 정각마다 날씨 정보 업데이트
* 날씨 정보 상세
* 5일 / 3시간 예보
* 마지막 동기화 날짜 표출
* 버튼 클릭 시 5일 / 3시간 예보 화면 변환
* 한글, 영어 언어 선택
* 날씨에 따른 style 변환

### 1. 정각마다 날씨 정보 업데이트
CRAWL 폴더에서 npm start시 정각마다 실행되는 스케줄러가 작동되어 axios.get으로 날씨 정보를 요청받은 후 axios.put으로 해당 데이터를 API 폴더에 있는 db.json으로 전달해줍니다.

### 2. 날씨 정보 상세, 5일 / 3시간 예보
1번 동작으로 인해 API 폴더에 수집된 데이터를 APP 폴더에서 axios.get으로 요청받은 후 해당 정보를 렌더링해 줍니다.

### 3. 마지막 동기화 날짜 표출
1번 동작에서 데이터수집 시 moment.js를 이용해 수집된 시간을 전달 후 전달된 날짜를 렌더링해 줍니다.

### 4. 버튼 클릭 시 5일 / 3시간 예보 화면 변환
현재 화면이 yview인지 xview인지를 state에 저장 후 버튼 클릭 시 옵셔널체이닝을 이용해서 yview일 때는 세로형으로 xview일 때는 가로형으로 렌더링해 줍니다.

### 5. 한글, 영어 언어 선택
select 박스 onChange 시 setLanguage(e.target.value)를 이용해 state를 변경합니다. 변경 후 state로 옵셔널체이닝을 이용해서 한글로 보여줄지 영어로 보여줄지 판별 후 렌더링해 줍니다.

### 6. 날씨에 따른 style 변환
2번 동작에서 axios.get으로 요청받은 후 현재 날씨가 Clear일 때와 그렇지 않을 때를 state에 저장 후 styled-components를 이용해 Props를 통한 조건부 스타일링을 해줍니다.

