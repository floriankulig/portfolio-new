import React, { useState } from "react";
import styled from "styled-components";
import { ProjectsCategoryChip } from "./ProjectsCategoryChip";
import { PROJECT_CATEGORIES } from "ts/content";

const StyledProjectsHeader = styled.header`
  padding: max(14vh, 100px) ${({ theme }) => theme.mainColPadding} 40px;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: clamp(2.5rem, 10dvw, 6rem);
    font-weight: 600;
    letter-spacing: -5%;
    line-height: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 0.2em;
    span {
      color: var(--text3);
    }
  }
`;

const StyledProjectsCategoryList = styled.ul`
  display: flex;
  gap: 0px;
  margin-top: 40px;
`;
const PROJECT_CATEGORY_IDS = PROJECT_CATEGORIES.map((c) => c.id);
interface ProjectsHeaderProps {
  selectedChips: string[];
  setSelectedChips: React.Dispatch<React.SetStateAction<string[]>>;
}
export const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({
  selectedChips,
  setSelectedChips,
}) => {
  const toggleSelection = (chipID: string) => {
    if (selectedChips.includes(chipID)) {
      setSelectedChips(selectedChips.filter((id) => id !== chipID));
    } else {
      const newChips = [...selectedChips, chipID];
      if (PROJECT_CATEGORY_IDS.every((id) => newChips.includes(id))) {
        setSelectedChips([]);
      } else {
        setSelectedChips([...selectedChips, chipID]);
      }
    }
  };

  return (
    <StyledProjectsHeader>
      <h1>
        👨🏽‍💻 Projects. <span>All of them. </span>
        {/* 👨🏽‍💻 Projects. <span>See my work. </span> */}
      </h1>
      <StyledProjectsCategoryList>
        <ProjectsCategoryChip
          selected={selectedChips.length === 0}
          toggleSelected={() => setSelectedChips([])}
        >
          All
        </ProjectsCategoryChip>
        {PROJECT_CATEGORIES.map((category) => (
          <ProjectsCategoryChip
            key={category.id}
            selected={selectedChips.includes(category.id)}
            toggleSelected={() => toggleSelection(category.id)}
            color={category.color}
          >
            {category.title}
          </ProjectsCategoryChip>
        ))}
      </StyledProjectsCategoryList>
    </StyledProjectsHeader>
  );
};
