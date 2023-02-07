import { createGlobalStyle } from 'styled-components';
import RobotoFontTTFRegular from '../font/Roboto-Regular.ttf';
import RobotoFontTTFMedium from '../font/Roboto-Medium.ttf';
import RobotoFontTTFBold from '../font/Roboto-Bold.ttf';


export const GlobalFont = createGlobalStyle`
@font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url('${RobotoFontTTFRegular}')
}

@font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url('${RobotoFontTTFMedium}')

}

@font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    src: url('${RobotoFontTTFBold}')

}
`;