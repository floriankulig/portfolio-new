import React from "react";
import styled from "styled-components";

const StyledBlurAroundLayer = styled.div<{ size: number }>`
  position: absolute;
  inset: ${({ size }) => -2 * size}% 0 0 -${({ size }) => 2 * size}%;
  width: ${({ size }) => 100 + 2 * 2 * size}%;
  height: ${({ size }) => 100 + 2 * 2 * size}%;
  background: transparent;
  border-radius: inherit;
  backdrop-filter: blur(1px);
  &:nth-child(1) {
    backdrop-filter: blur(0.5px);
  }
  &:nth-child(2) {
    backdrop-filter: blur(0.5px);
  }
  &:nth-child(3) {
    backdrop-filter: blur(0.5px);
  }
  z-index: 0;
`;

const StyledBlurAround = styled.div`
  position: relative;
  & > *:not(${StyledBlurAroundLayer}) {
    position: relative;
    z-index: 1;
  }
`;

interface BlurAroundProps {
  size?: number;
  blur?: boolean;
  children: React.ReactNode;
}

export const BlurAround: React.FC<BlurAroundProps> = ({
  size = 8,
  blur = true,
  children,
}) => {
  return (
    <StyledBlurAround>
      {blur &&
        Array.from({ length: size }, (_, i) => (
          <StyledBlurAroundLayer key={i} size={size - i} />
        ))}
      {children}
    </StyledBlurAround>
  );
};
