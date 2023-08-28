import { Easing } from "framer-motion";
import { css } from "styled-components";

//ALL STYLES INHERIT FROM THIS FILE
const theme = {
  dark: `#181818`,
  light: `#f9f9f9`,
  grey: `#e4e4e4`,
  easing: [0.6, 0.01, -0.05, 0.95],
  grid: css`
    display: grid;
    grid-template-columns: 5% repeat(5, 1fr) 5%;
    @media (${({ theme }) => theme.bp.small}) {
      grid-template-columns: repeat(7, 1fr);
    }
    gap: 10px;
    justify-items: center;
  `,
  gridElement: {
    fullWidth: css`
      width: 100%;
      grid-column: 2 / -2;
      max-width: 1100px;
    `,
    left: css`
      width: 100%;
      grid-column: 2 / 4;
      max-width: 1100px;
    `,
    right: css`
      width: 100%;
      grid-column: -4 / -2;
      max-width: 1100px;
    `,
  },
  bp: {
    small: `min-width: 721px`,
    medium: `min-width: 1081px`,
    big: `min-width: 1201px`,
  },
};

export default theme;
