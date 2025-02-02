import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { rgba } from "polished";
import React, { useRef } from "react";
import styled from "styled-components";
import { theme } from "styles";
import { PROJECT_INTRO_DISTANCE } from "./SlidingProject";

const StyledProjectsIntroContainer = styled(motion.div)`
  position: relative;
  background: var(--text1);
`;
const StyledProjectsIntro = styled(motion.div)`
  position: sticky;
  top: 0;
  font-size: clamp(2.5rem, 9dvw, 6rem);
  padding-block: 1em calc(0.75em + (${PROJECT_INTRO_DISTANCE}px * 0.85));
`;

const StyledIntroHeader = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: baseline;

  h2 {
    font-size: inherit;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: -5%;
    line-height: 1.1;
    -webkit-text-stroke: 1px ${({ theme }) => rgba(theme.bg1, 0.2)};
    background: ${({ theme }) =>
      `linear-gradient(177deg, ${rgba(theme.bg2, 0.7)}, ${rgba(
        theme.bg2,
        0.2
      )})`};
    background-clip: text;
    color: transparent;
  }

  span {
    font-size: clamp(0.875rem, 3vw, 1.5rem);
    letter-spacing: -0.5px;
    font-family: var(--jakarta);
    font-weight: 800;
    font-style: italic;
    line-height: 1.5;
    color: var(--text3);
  }
`;

interface ProjectsIntroProps {}

export const ProjectsIntro: React.FC<ProjectsIntroProps> = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 50%"],
  });

  const gradientX = useTransform(scrollYProgress, [0, 0.9], [10, 85]);
  const gradientY = useTransform(scrollYProgress, [0, 0.9], [0, 20]);
  const gradientOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [0.4, 1, 0.3]
  );
  const backgroundImage = useMotionTemplate`linear-gradient(177deg, ${rgba(
    theme.bg2,
    0.7
  )}, ${rgba(
    theme.bg2,
    0.2
  )}), radial-gradient(circle at ${gradientX}% ${gradientY}%, ${rgba(
    theme.bg1,
    gradientOpacity.get()
  )}, transparent 35%)`;

  const currentYear = new Date().getFullYear().toString().slice(2);
  return (
    <StyledProjectsIntroContainer ref={sectionRef}>
      <StyledProjectsIntro className="main-col">
        <StyledIntroHeader>
          <motion.h2 style={{ backgroundImage }}>MY PROJECTS</motion.h2>
          <span>©2020-{currentYear}</span>
        </StyledIntroHeader>
      </StyledProjectsIntro>
    </StyledProjectsIntroContainer>
  );
};
