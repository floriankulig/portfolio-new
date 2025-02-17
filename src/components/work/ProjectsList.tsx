import React from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Project } from "ts/types";
import { Project as ProjectComponent } from "./Project";

const StyledProjectsListSection = styled(motion.section)`
  padding-bottom: 120px;
  padding-inline: 2.5vw;
`;

const StyledProjectsList = styled(motion.ul)`
  display: grid;
  grid-template-columns: 1fr;
  @media (${({ theme }) => theme.bp.medium}) {
    grid-template-columns: 1fr 1fr;
  }
  gap: 56px 24px;
`;

interface ProjectsListProps {
  filteredProjects: Project[];
}

export const ProjectsList: React.FC<ProjectsListProps> = ({
  filteredProjects,
}) => {
  return (
    <StyledProjectsListSection layout>
      <StyledProjectsList>
        <AnimatePresence initial={false}>
          {filteredProjects.map((project) => (
            <ProjectComponent key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </StyledProjectsList>
    </StyledProjectsListSection>
  );
};
