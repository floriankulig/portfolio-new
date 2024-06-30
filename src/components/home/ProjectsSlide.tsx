import { ArrowButton } from "components/shared";
import {
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useViewport } from "hooks";
import { rgba } from "polished";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FEATURED_PROJECTS, FeaturedProject } from "ts/content";
import { SlidingProject } from "./SlidingProject";

const StickyProjectsSlideContainer = styled.div`
  position: relative;
  display: flex;
  height: 350vh;
  background-color: var(--bg2);
`;

const StickyProjectsSlide = styled(motion.div)`
  position: sticky;
  top: 0;
  z-index: 9;
  left: 0;
  background: ${rgba("#000", 0.5)};
  display: flex;
  overflow: hidden;
  /* gap: 1rem; */
  height: 100vh;
  min-width: fit-content;
  justify-content: flex-start;
`;
const SCROLL_END_RANGE = [0.95, 1];
export const ProjectsSlide = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const dampedScrollY = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    mass: 1.1,
    restDelta: 0.0001,
  });
  const slideContent = useRef<HTMLDivElement>(null);
  const [slideContentWidth, setSlideContentWidth] = useState(0);
  const { viewport: windowDimensions } = useViewport();

  useEffect(() => {
    const handleResize = () => {
      if (slideContent.current && window) {
        setSlideContentWidth(slideContent.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call the function initially to set the initial width

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Erklärung: Rechnen SlideShow Width + 400px Teaser/CTA
  const slideX = useTransform(
    dampedScrollY,
    [0, 1],
    [0, (slideContentWidth - windowDimensions.viewPortWidth + 400) * -1]
  );
  const slideHeightOffset = useTransform(
    dampedScrollY,
    SCROLL_END_RANGE,
    [0, 100]
  );
  const slideHeight = useTransform(
    dampedScrollY,
    () => windowDimensions.viewPortHeight - slideHeightOffset.get()
  );
  const slideY = useTransform(dampedScrollY, () => slideHeightOffset.get() / 2);
  const slideBR = useTransform(dampedScrollY, [0.93, 0.97], [0, 48]);

  return (
    <StickyProjectsSlideContainer ref={sectionRef}>
      <StickyProjectsSlide
        ref={slideContent}
        style={{
          x: slideX,
          y: slideY,
          height: slideHeight,
          borderRadius: slideBR,
        }}
      >
        {FEATURED_PROJECTS.map((project) => (
          <SlidingProject key={project.id} project={project} />
        ))}
      </StickyProjectsSlide>
      <ProjectsCTA scrollYProgress={dampedScrollY}></ProjectsCTA>
    </StickyProjectsSlideContainer>
  );
};

const StyledProjectsCTA = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  flex-shrink: 0;
  max-width: 100vw;
  pointer-events: none;
  display: grid;
  place-items: center;
`;

const StyledProjectsCTAContent = styled(motion.div)`
  padding-bottom: 50px;
  pointer-events: all;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  line-height: 1.5;
  letter-spacing: -3%;
  font-weight: 500;

  h3 {
    font-weight: inherit;
    color: var(--text1);
    font-size: 2rem;
  }
  p {
    font-family: var(--jakarta);
    color: var(--text3);
    margin-bottom: 40px;
  }
`;

interface ProjectsCTAProps {
  scrollYProgress: MotionValue<number>;
}
const ProjectsCTA: React.FC<ProjectsCTAProps> = ({ scrollYProgress }) => {
  const opacity = useTransform(scrollYProgress, [0.985, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0.985, 1], [20, 0]);
  return (
    <StyledProjectsCTA>
      <StyledProjectsCTAContent style={{ y, opacity }}>
        <h3>Want more?</h3>
        <p>that&lsquo;s not everything...</p>
        <ArrowButton>View Project Showcase</ArrowButton>
      </StyledProjectsCTAContent>
    </StyledProjectsCTA>
  );
};
