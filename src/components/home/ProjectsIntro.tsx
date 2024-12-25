import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { rgba } from "polished";
import React, { useRef } from "react";
import styled from "styled-components";
import { theme } from "styles";
import { SCROLL_SPRING } from "ts";

const StyledProjectsIntroContainer = styled(motion.div)`
  position: relative;
  /* height: 150dvh; */
  background: var(--bg2);
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
    background: ${({ theme }) =>
      `linear-gradient(177deg, ${rgba(theme.bg2, 0.7)}, ${rgba(
        theme.bg2,
        0.2
      )}),
      linear-gradient(to right, ${rgba(theme.bg2, 0.1)} 0%, ${rgba(
        theme.bg2,
        0.85
      )} 30%, ${rgba(theme.bg2, 0.6)} 45%,  ${rgba(theme.bg2, 0.1)} 100%)
      `};
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
    offset: ["start 60%", "end start"],
  });
  const dampedScrollY = useSpring(scrollYProgress, SCROLL_SPRING);
  const backgroundColor1 = useTransform(
    scrollYProgress,
    [0, 0],
    [theme.bg2, theme.text1]
  );
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  const currentYear = new Date().getFullYear().toString().slice(2);
  return (
    <StyledProjectsIntroContainer
      ref={sectionRef}
      style={{ backgroundColor: backgroundColor1 }}
    >
      <StyledProjectsIntro>
        <StyledIntroHeader>
          <h2>MY PROJECTS</h2>
          <span>©2019-{currentYear}</span>
        </StyledIntroHeader>
      </StyledProjectsIntro>
    </StyledProjectsIntroContainer>
  );
};
