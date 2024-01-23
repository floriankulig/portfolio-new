import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const StyledScrollIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
const StyledScrollIndicatorLabel = styled.span`
  font-weight: 500;
  color: var(--text2);
  line-height: 1.5;
  cursor: default;
  user-select: none;
`;

const StyledScrollIndicatorMouse = styled.div`
  width: 32px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 6px;
  box-sizing: border-box;
  border: 2px solid var(--text2);

  div {
    background-color: var(--text2);
    aspect-ratio: 1;
    border-radius: 50%;
    width: 100%;
  }
`;

interface ScrollIndicatorProps {
  label?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  label = "learn more",
}) => {
  return (
    <StyledScrollIndicator>
      <StyledScrollIndicatorMouse>
        <motion.div></motion.div>
      </StyledScrollIndicatorMouse>
      <StyledScrollIndicatorLabel>{label}</StyledScrollIndicatorLabel>
    </StyledScrollIndicator>
  );
};
