import { motion, Variants } from "framer-motion";
import { rgba } from "polished";
import React from "react";
import styled from "styled-components";
import { theme } from "styles";

const StyledSnackbarWrapper = styled(motion.div)`
  position: fixed;
  display: flex;
  z-index: 9;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  bottom: 2rem;
`;

const StyledSnackbar = styled(motion.div)<{ $isDark?: boolean }>`
  max-width: 90dvw;
  margin: 0 auto;
  background: ${({ $isDark: isDark }) =>
    isDark ? rgba("black", 0.45) : rgba("white", 0.75)};
  border-radius: 8px;
  padding: 1rem;
  pointer-events: all;
  color: ${({ $isDark: isDark }) => (isDark ? "var(--bg2)" : "var(--text1)")};
  box-shadow: 0 8px 32px 0 rgba(25, 26, 42, 0.15),
    inset -1px -1px 6px rgba(0, 0, 0, 0.05),
    inset -1px -1px 4px rgba(0, 0, 0, 0.1),
    inset 1px 1px 3px rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px) saturate(120%);
  border: 1px solid rgba("white", 0.18);
`;

const snackbarVariants: Variants = {
  snackbarInitial: {
    y: "150%",
    opacity: 0,
  },
  snackbarAnimate: { y: 0, opacity: 1 },
  snackbarExit: {
    y: "150%",
    opacity: 0,
  },
};

interface SnackbarProps {
  color?: "light" | "dark";
  children: React.ReactNode;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  color = "light",
  children,
}) => {
  return (
    <StyledSnackbarWrapper
      initial="snackbarInitial"
      animate="snackbarAnimate"
      exit="snackbarExit"
      variants={snackbarVariants}
    >
      <StyledSnackbar $isDark={color === "dark"}>{children}</StyledSnackbar>
    </StyledSnackbarWrapper>
  );
};
