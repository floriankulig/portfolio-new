import { Easing } from "framer-motion";
import { css } from "styled-components";

//ALL STYLES INHERIT FROM THIS FILE
const theme = {
  dark: `#181818`,
  light: `#f9f9f9`,
  grey: `#e4e4e4`,
  easing: [0.6, 0.01, -0.05, 0.95],
  bp: {
    small: `min-width: 721px`,
    medium: `min-width: 1081px`,
    big: `min-width: 1201px`,
  },
};

export default theme;
