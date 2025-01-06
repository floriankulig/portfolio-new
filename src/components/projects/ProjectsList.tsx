import { MainColumn } from "components/shared";
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const StyledProjectsList = styled(motion.section)`
  padding-block: 100px;
  background-color: var(--bg3);
  min-height: 100vh;
`;

export const ProjectsList = () => {
  return (
    <StyledProjectsList layout>
      <MainColumn></MainColumn>
    </StyledProjectsList>
  );
};
