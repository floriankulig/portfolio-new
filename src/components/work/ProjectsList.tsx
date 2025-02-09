import React from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Project } from "ts/types";
import { Project as ProjectComponent } from "./Project";

const StyledProjectsListSection = styled(motion.section)`
  padding-block: 56px;
  background-color: var(--bg3);
  min-height: 100vh;
`;

const StyledProjectsList = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
  gap: 48px 32px;
`;

interface ProjectsListProps {
  filteredProjects: Project[];
}

export const ProjectsList: React.FC<ProjectsListProps> = ({
  filteredProjects,
}) => {
  return (
    <StyledProjectsListSection layout>
      <StyledProjectsList className="main-col">
        <AnimatePresence initial={false}>
          {filteredProjects.map((project) => (
            <ProjectComponent key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </StyledProjectsList>
    </StyledProjectsListSection>
  );
};
