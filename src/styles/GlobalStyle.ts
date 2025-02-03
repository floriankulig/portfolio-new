import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
  :root{
    --text1: ${theme.text1};
    --text2: ${theme.text2};
    --text3: ${theme.text3};
    --bg1: ${theme.bg1};
    --bg2: ${theme.bg2};
    --bg3: ${theme.bg3};
    --easing: ${theme.easing};
  }
  html {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: var(--dark) transparent;
    -webkit-font-smoothing: antialiased; 
    -moz-osx-font-smoothing: grayscale; 
    font-smooth: always;
    text-rendering: optimizeLegibility;
    -webkit-tap-highlight-color: transparent;
  }
  *,
  *:before,
  *:after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
  *:focus{
    outline: none;
  }
  body {
    margin: 0;
    padding: 0;
    line-height: 1;
    background-color: var(--bg1);
    color: var(--text1);
    font-size: 16px;
    font-family: var(--poppins), var(--jakarta), sans-serif;
    overflow-x: hidden;
    min-height: 100dvh;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    width: min-content;
    color: currentColor
  }
  p {
    font-family: var(--inter);
    line-height: 150%;
  }
  .balanced {
    text-wrap: balance;
  }

  .main-col {
    padding-inline: 5vw;
    @media (${theme.bp.small}){
      padding-inline: ${theme.mainColPadding};
    }
  }
`;

export default GlobalStyle;
