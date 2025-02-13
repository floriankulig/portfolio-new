import React from "react";
import styled from "styled-components";

const StyledProjectDescriptionSection = styled.section`
  min-height: 85vh;
  display: grid;
  place-items: center;
  padding-block: 25vh;
`;

const StyledProjectDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 60ch;
  width: 100%;

  span {
    font-weight: 600;
    letter-spacing: -0.04em;
    text-transform: uppercase;
    color: var(--text3);
    text-indent: clamp(2rem, 10vw, 5rem);
  }
  p {
    color: var(--text2);
    font-size: 1.125rem;
    text-indent: clamp(2rem, 10vw, 5rem);
    line-height: 1.5;

    b {
      color: var(--text1);
      font-weight: 700;
      font-family: var(--jakarta);
    }
  }
`;

interface ProjectDescriptionSectionProps {
  description: string;
  label: string;
}

export const Description: React.FC<ProjectDescriptionSectionProps> = ({
  description,
  label,
}) => {
  return (
    <StyledProjectDescriptionSection className="main-col">
      <StyledProjectDescription>
        <span>{label}</span>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </StyledProjectDescription>
    </StyledProjectDescriptionSection>
  );
};
