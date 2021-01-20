import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, textarea {
    font-family: -apple-system,BlinkMacSystemFont,Apple SD Gothic Neo,Inter,Spoqa Han Sans,Segoe UI,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    font-size: 14px;
    color: #2c3848;
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    color: #2c3848;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
