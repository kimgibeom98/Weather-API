import { createGlobalStyle } from 'styled-components';
import RobotoFontTTFRegular from '../font/Roboto-Regular.woff';
import RobotoFontTTFMedium from '../font/Roboto-Medium.woff';
import RobotoFontTTFBold from '../font/Roboto-Bold.woff';


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