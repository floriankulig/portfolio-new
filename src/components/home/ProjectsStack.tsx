import {
  easeOut,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import styled from "styled-components";
import { FEATURED_PROJECTS } from "ts/content";
import { SlidingProject } from "./SlidingProject";
import { useOverlayContext } from "context/overlay-context";
import { ProjectsCTA } from "./ProjectsCTA";

const StickyProjectsSlideContainer = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg2);
`;

const StickyProjectsSlide = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: var(--text1);
`;

const START_SCROLL_RANGE = [0, 0.2];
const SCROLL_END_RANGE = [0.775, 0.925];
export const ProjectsStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 55%", "end end"],
  });
  const { setBlockHeader } = useOverlayContext();
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (0.15 < latest && latest < 0.925) {
      setBlockHeader(true);
    } else {
      setBlockHeader(false);
    }
  });
  const overflow = useTransform(scrollYProgress, (latestScrollY) =>
    latestScrollY < 0.5 ? "visible" : "hidden"
  );
  const scaleDownEnd = 0.925;
  const slideScale = useTransform(
    scrollYProgress,
    SCROLL_END_RANGE,
    [1, scaleDownEnd],
    { ease: easeOut }
  );
  const slideBR = useTransform(scrollYProgress, [0.775, 0.875], [0, 48]);

  return (
    <StickyProjectsSlideContainer ref={sectionRef}>
      <StickyProjectsSlide
        style={{
          scale: slideScale,
          borderRadius: slideBR,
          overflow: overflow,
        }}
      >
        {FEATURED_PROJECTS.map((project, i) => (
          <SlidingProject
            key={project.id}
            index={i}
            images={FEATURED_PROJECTS.length}
            introAnimationRange={START_SCROLL_RANGE}
            scrollProgress={scrollYProgress}
            project={project}
            endRange={SCROLL_END_RANGE}
            inStack
          />
        ))}
      </StickyProjectsSlide>
      <ProjectsCTA
        scrollYProgress={scrollYProgress}
        range={[0.875, 0.975]}
        inStack
      ></ProjectsCTA>
    </StickyProjectsSlideContainer>
  );
};
