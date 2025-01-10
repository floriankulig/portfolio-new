import { MainColumn } from "components/shared";
import React from "react";
import styled from "styled-components";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Project } from "ts/content";
import { Project as ProjectComponent } from "./Project";

const StyledProjectsListSection = styled(motion.section)`
  padding-block: 56px;
  background-color: var(--bg3);
  min-height: 100vh;
`;

const StyledProjectsList = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 48px 32px;
`;

interface ProjectsListProps {
  selectedProjects: Project[];
}

export const ProjectsList: React.FC<ProjectsListProps> = ({
  selectedProjects,
}) => {
  return (
    <StyledProjectsListSection layout>
      <MainColumn>
        {/* <LayoutGroup> */}
        <StyledProjectsList>
          <AnimatePresence initial={false}>
            {selectedProjects.map((project) => (
              <ProjectComponent key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </StyledProjectsList>
        {/* </LayoutGroup> */}
      </MainColumn>
    </StyledProjectsListSection>
  );
};
