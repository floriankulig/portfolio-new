import { Easing } from "framer-motion";
import { css } from "styled-components";

//ALL STYLES INHERIT FROM THIS FILE
const theme = {
  text1: `#181818`,
  text2: `#242424`,
  text3: `#a1a4a8`,
  bg1: `#f9f9f9`,
  bg2: `#ffffff`,
  bg3: `#e3e5e8`,
  easing: [0.6, 0.01, -0.05, 0.95],
  bp: {
    small: `min-width: 721px`,
    medium: `min-width: 1081px`,
    big: `min-width: 1201px`,
  },
};

export default theme;
