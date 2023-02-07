import styled from "styled-components";

const ErrorPage = ({ getData }) => {
  return (
    <ErrorContent>
      <img style={{ marginBottom: 30, paddingTop: 50 }} src={`${process.env.PUBLIC_URL}/image/error_img.png`} alt="ERROR 이미지" />
      <ErrorPhrases>{getData ? "죄송합니다 데이터가 존재하지 않습니다." : "죄송합니다 통신이원활하지 않습니다."}</ErrorPhrases>
    </ErrorContent>
  )
};
export default ErrorPage;

const ErrorContent = styled.article`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;
const ErrorPhrases = styled.p`
    color : white;
    font-weight : 700;
    font-size : 25px;
`;