import React, { useMemo } from "react";
import styled from "styled-components";
import { ProjectsCategoryChip } from "./ProjectsCategoryChip";
import { PROJECT_CATEGORIES } from "ts/content";
import { motion } from "framer-motion";
import { WordExchange } from "components/shared";

const StyledProjectsHeader = styled.header`
  padding-block: min(max(12vw, 48px), 100px) 40px;
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
    margin-bottom: 0.3em;
    & > span {
      color: var(--text3);
      filter: blur(0px);
    }
  }
`;

const StyledProjectsCategoryList = styled(motion.ul)`
  display: flex;
  gap: 0px;
  flex-wrap: wrap;
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

  const selectedCategories = PROJECT_CATEGORIES.filter((c) =>
    selectedChips.includes(c.id)
  );

  const secondaryText = useMemo(() => {
    if (selectedCategories.length === 0) {
      return "All of them.";
    }
    if (selectedCategories.length === 1) {
      return selectedCategories[0]?.legerTitle;
    }
    return `Some of them.`;
  }, [selectedCategories]);

  return (
    <StyledProjectsHeader className="main-col">
      <h1>
        👨🏽‍💻 Projects. <WordExchange>{secondaryText}</WordExchange>
      </h1>
      <StyledProjectsCategoryList layout>
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
