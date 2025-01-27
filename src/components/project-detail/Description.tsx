import React from "react";
import styled from "styled-components";

const StyledProjectDescriptionSection = styled.section`
  min-height: 75vh;
  display: grid;
  place-items: center;
`;

const StyledProjectDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 60ch;
  width: 100%;

  span {
    font-weight: 600;
    letter-spacing: -4%;
    text-transform: uppercase;
    color: var(--text3);
    text-indent: clamp(2rem, 10vw, 5rem);
  }
  p {
    color: var(--text2);
    font-size: 1.125rem;
    text-indent: clamp(2rem, 10vw, 5rem);
    line-height: 1.5;
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
        <p>{description}</p>
      </StyledProjectDescription>
    </StyledProjectDescriptionSection>
  );
};
