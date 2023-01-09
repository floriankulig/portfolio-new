import { motion, Variants } from "framer-motion";
import { rgba } from "polished";
import React from "react";
import styled from "styled-components";
import { theme } from "styles";

const StyledSnackbar = styled(motion.div)<{ isDark?: boolean }>`
  position: fixed;
  display: flex;
  z-index: 9;
  align-items: center;
  justify-content: space-between;
  bottom: 2rem;
  max-width: 90%;
  margin: 0 auto;
  background: ${({ isDark }) =>
    isDark ? rgba("black", 0.7) : rgba("white", 0.7)};
  border-radius: 4px;
  padding: 1rem;
  color: ${({ isDark }) => (isDark ? "var(--light)" : "var(--dark)")};
  box-shadow: 0 8px 32px 0 rgba(25, 26, 42, 0.15);
  backdrop-filter: blur(8px);
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
    <StyledSnackbar
      initial="snackbarInitial"
      animate="snackbarAnimate"
      exit="snackbarExit"
      variants={snackbarVariants}
      isDark={color === "dark"}
    >
      {children}
    </StyledSnackbar>
  );
};
