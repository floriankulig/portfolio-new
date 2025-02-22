import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useViewport } from "hooks";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { SCROLL_SPRING } from "ts";
import { FEATURED_PROJECTS } from "ts/content";
import { SlidingProject } from "./SlidingProject";
import { useOverlayContext } from "context/overlay-context";
import { ProjectsCTA } from "./ProjectsCTA";

const StickyProjectsSlideContainer = styled(motion.div)`
  position: relative;
  display: flex;
  height: 450vh;
  background-color: var(--bg2);
`;

const StickyProjectsSlide = styled(motion.div)`
  position: sticky;
  top: 0;
  z-index: 9;
  left: 0;
  display: flex;
  justify-content: flex-start;
  background-color: var(--text1);
  height: 100vh;
  min-width: fit-content;
  will-change: transform;
  backface-visibility: hidden;
`;
const START_SCROLL_RANGE = [0, 0.2];
const MAIN_SCROLL_RANGE = [0.2, 1];
const SCROLL_END_RANGE = [0.925, 1];
export const ProjectsSlide = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 50%", "end end"],
  });
  const { setBlockHeader } = useOverlayContext();
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (0.1 < latest && latest < 0.975) {
      setBlockHeader(true);
    } else {
      setBlockHeader(false);
    }
  });
  const dampedScrollY = useSpring(scrollYProgress, SCROLL_SPRING);
  const slideContent = useRef<HTMLDivElement>(null);
  const slideContentWidth = useMotionValue(0);
  const { viewport: windowDimensions } = useViewport();

  useEffect(() => {
    const handleResize = () => {
      if (slideContent.current && window) {
        slideContentWidth.set(slideContent.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call the function initially to set the initial width

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [slideContentWidth]);
  const overflow = useTransform(scrollYProgress, (latestScrollY) =>
    latestScrollY < 0.5 ? "visible" : "hidden"
  );
  //Erklärung: Rechnen SlideShow Width + 400px Teaser/CTA
  const slideXMain = useTransform(dampedScrollY, MAIN_SCROLL_RANGE, [
    0,
    (slideContentWidth.get() - windowDimensions.viewPortWidth + 400) * -1,
  ]);
  const scaleDownEnd = 0.925;
  const slideScale = useTransform(dampedScrollY, SCROLL_END_RANGE, [
    1,
    scaleDownEnd,
  ]);
  const slideXEnd = useTransform(
    dampedScrollY,
    () =>
      ((slideContentWidth.get() - slideContentWidth.get() / slideScale.get()) *
        -1) /
      2
  );
  const slideX = useTransform(
    dampedScrollY,
    () => slideXMain.get() + slideXEnd.get()
  );
  const slideBR = useTransform(dampedScrollY, [0.9, 0.95], [0, 56]);

  return (
    <StickyProjectsSlideContainer ref={sectionRef}>
      <StickyProjectsSlide
        ref={slideContent}
        style={{
          x: slideX,
          scale: slideScale,
          borderRadius: slideBR,
          overflow,
        }}
      >
        {FEATURED_PROJECTS.map((project, i) => (
          <SlidingProject
            key={project.id}
            index={i}
            images={FEATURED_PROJECTS.length}
            introAnimationRange={START_SCROLL_RANGE}
            scrollProgress={dampedScrollY}
            project={project}
            endRange={SCROLL_END_RANGE}
          />
        ))}
      </StickyProjectsSlide>
      <ProjectsCTA
        scrollYProgress={dampedScrollY}
        range={[0.935, 1]}
      ></ProjectsCTA>
    </StickyProjectsSlideContainer>
  );
};
