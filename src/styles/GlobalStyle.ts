import { createGlobalStyle } from "styled-components";
import theme from "./theme";
import { rgba } from "polished";

const GlobalStyle = createGlobalStyle`
  :root{
    --dark: ${theme.dark};
    --light: ${theme.light};
    --grey: ${theme.grey};
    --easing: ${theme.easing};
    font-size: 18px;
  }
  html {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    scroll-behavior: smooth;
    overflow-y: overlay;
    scrollbar-width: thin;
    scrollbar-color: var(--dark) transparent;
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
    font-family: var(--poppins), var(--inter), sans-serif;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
    font-size: 18px;
    line-height: 180%;
    max-width: 40ch;
  }
`;

export default GlobalStyle;
