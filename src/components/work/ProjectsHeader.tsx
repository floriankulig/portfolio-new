import React, { useMemo } from "react";
import styled from "styled-components";
import { ProjectsCategoryChip } from "./ProjectsCategoryChip";
import { PROJECT_CATEGORIES } from "ts/content";
import { motion } from "framer-motion";
import { WordExchange } from "components/shared";

const StyledProjectsHeader = styled.header`
  padding-block: min(max(12vw, 100px), 140px) 40px;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: clamp(2.5rem, 12.5dvw, 5.5rem);
    font-weight: 600;
    letter-spacing: -0.055em;
    line-height: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.2em;
    margin-bottom: 0.3em;
    & > img {
      height: 1em;
      /* aspect-ratio: 1; */
    }

    & > span {
      display: flex;
      gap: 0.2em;
      color: var(--text3);
    }
  }
`;

const StyledProjectsCategoryList = styled(motion.ul)`
  display: flex;
  gap: 0px;
  flex-wrap: wrap;

  @media (max-width: 420px) {
    margin-inline: -0.5rem;
  }
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
    setSelectedChips((prev) => {
      if (prev.includes(chipID)) {
        return [];
      } else {
        return [chipID];
      }
    });
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
        <img src="working_mac.png" alt="Emoji working on mac." />
        Projects.{" "}
        <span>
          <WordExchange withAnimatePresence>{secondaryText}</WordExchange>
        </span>
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
