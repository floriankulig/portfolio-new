import styled from "styled-components";
import { motion } from "framer-motion";

interface ExternalButtonProps {
  $light?: boolean;
}

export const ExternalButton = styled(motion.button)<ExternalButtonProps>`
  font-family: var(--poppins);
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 6px;
  line-height: 1;
  padding: 1rem 2rem;
  cursor: pointer;
  box-shadow: inset -1px -1px 4px
      rgba(0, 0, 0, ${({ $light: light }) => (!light ? 0.5 : 0.075)}),
    inset 0px 0px 6px rgba(0, 0, 0, 0.04),
    inset 1px 1px 6px
      rgba(255, 255, 255, ${({ $light: light }) => (!light ? 0.25 : 0.5)});
  background: ${({ $light: isLight, theme }) =>
    isLight ? theme.bg2 : theme.text2};

  color: ${({ $light: isLight, theme }) => (isLight ? theme.text2 : theme.bg1)};
`;
