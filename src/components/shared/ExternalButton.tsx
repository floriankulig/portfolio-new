import styled from "styled-components";
import { motion } from "framer-motion";

interface ExternalButtonProps {
  light?: boolean;
}

export const ExternalButton = styled(motion.button)<ExternalButtonProps>`
  font-family: var(--poppins);
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 3px;
  line-height: 1;
  padding: 1rem 2rem;
  cursor: pointer;
  background: ${({ light: isLight, theme }) =>
    isLight ? theme.light : theme.dark};
  color: ${({ light: isLight, theme }) => (isLight ? theme.dark : theme.light)};
`;
