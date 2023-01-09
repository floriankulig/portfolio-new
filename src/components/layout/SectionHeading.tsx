import { MotionProps, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const StyledSectionHeading = styled(motion.h2)<{ $isLight?: boolean }>`
  color: ${(p) => (p.$isLight ? "var(--light)" : "var(--dark)")};
  text-transform: uppercase;
  word-break: keep-all;
  font-weight: 500;
  font-size: 2.65rem;
`;

interface SectionHeadingProps extends MotionProps {
  children: React.ReactNode;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  light,
  ...restProps
}) => {
  return (
    <StyledSectionHeading $isLight={light} {...restProps}>
      {children}
    </StyledSectionHeading>
  );
};
