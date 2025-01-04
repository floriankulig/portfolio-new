import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { rgba } from "polished";
import React, { useRef } from "react";
import styled from "styled-components";
import { theme } from "styles";
import { SCROLL_SPRING } from "ts";

const StyledProjectsIntroContainer = styled(motion.div)`
  position: relative;
  background: var(--text1);
  padding-bottom: 3rem;
`;
const StyledProjectsIntro = styled(motion.div)`
  position: sticky;
  top: 0;
  height: 400px;
  padding: 4rem 6rem;
`;

const StyledIntroHeader = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  h2 {
    font-size: 6rem;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: -5px;
    line-height: 1.5;
    -webkit-text-stroke: 1px ${({ theme }) => rgba(theme.bg1, 0.25)};
    background: ${({ theme }) =>
      `linear-gradient(177deg, ${rgba(theme.bg2, 0.7)}, ${rgba(
        theme.bg2,
        0.2
      )})`};
    background-clip: text;
    color: transparent;
  }

  span {
    font-size: 1.5rem;
    letter-spacing: -0.5px;
    font-family: var(--jakarta);
    font-weight: 800;
    font-style: italic;
    line-height: 1.5;
    color: var(--bg1);
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
      <StyledProjectsIntro>
        <StyledIntroHeader>
          <motion.h2 style={{ backgroundImage }}>MY PROJECTS</motion.h2>
          <span>©2019-{currentYear}</span>
        </StyledIntroHeader>
      </StyledProjectsIntro>
    </StyledProjectsIntroContainer>
  );
};
