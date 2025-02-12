import React from "react";
import styled from "styled-components";

const StyledMoreInfoComingSection = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  h3 {
    font-size: clamp(2rem, 10svw, 3rem);
    font-weight: 600;
    letter-spacing: -0.05em;
    line-height: 1;
    color: var(--text2);
    text-align: center;
  }

  p {
    text-align: center;
    color: var(--text3);
    font-family: var(--jakarta);
  }
`;
interface MoreInfoComingProps {
  stillDeveloping?: boolean;
}
export const MoreInfoComing: React.FC<MoreInfoComingProps> = ({
  stillDeveloping,
}) => {
  return (
    <StyledMoreInfoComingSection>
      <h3>More Information Coming Soon...</h3>
      {stillDeveloping && <p>This project is still being developed.</p>}
    </StyledMoreInfoComingSection>
  );
};
