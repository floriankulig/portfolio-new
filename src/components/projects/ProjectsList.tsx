import { MainColumn } from "components/shared";
import React from "react";
import styled from "styled-components";

const StyledProjectsList = styled.section`
  padding-block: 100px;
  background-color: var(--bg3);
  min-height: 100vh;
`;

export const ProjectsList = () => {
  return (
    <StyledProjectsList>
      <MainColumn></MainColumn>
    </StyledProjectsList>
  );
};
