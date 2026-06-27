import { rgba } from "polished";
import React from "react";
import styled from "styled-components";

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding-block: 2.5rem 0;
  border-top: 1px solid ${({ theme }) => rgba(theme.text3, 0.3)};

  @media (${({ theme }) => theme.bp.small}) {
    grid-template-columns: 180px 1fr;
    gap: 3rem;
  }

  .label {
    text-transform: uppercase;
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--text3);
    padding-top: 0.35em;
  }
`;

interface AboutSectionProps {
  label: string;
  children: React.ReactNode;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  label,
  children,
}) => (
  <StyledSection>
    <span className="label">{label}</span>
    <div>{children}</div>
  </StyledSection>
);
