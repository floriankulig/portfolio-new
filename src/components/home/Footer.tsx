import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  width: 100%;
  text-align: center;
  padding: 1.5rem;
  background: var(--dark);
  color: white;
`;

export const Footer: React.FC = () => {
  return (
    <StyledFooter>Built and designed with ❤ by Florian Kulig</StyledFooter>
  );
};
