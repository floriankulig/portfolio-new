import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { rgba } from "polished";
import { useRef } from "react";
import styled from "styled-components";
import { FEATURED_PROJECTS, FeaturedProject } from "ts/content";

const StickyProjectsSlideContainer = styled.div`
  position: relative;
  display: flex;
  height: 300vh;
  background-color: var(--bg2);
`;

const StickyProjectsSlide = styled(motion.div)`
  position: sticky;
  top: 0;
  left: 0;
  background: ${rgba("#000", 0.5)};
  display: flex;
  gap: 1rem;
  height: 100vh;
  justify-content: flex-start;
`;

export const ProjectsSlide = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const dampedScrollY = useSpring(scrollYProgress);

  //TODO: Rechnen SlideShow Width + 360px Teaser/CTA
  const slideX = useTransform(dampedScrollY, [0.05, 1], ["0%", "-240vw"]);

  return (
    <StickyProjectsSlideContainer ref={sectionRef}>
      <StickyProjectsSlide style={{ x: slideX }}>
        {FEATURED_PROJECTS.map((project) => (
          <SlidingProject key={project.id} project={project} />
        ))}
      </StickyProjectsSlide>
      <ProjectsCTA></ProjectsCTA>
    </StickyProjectsSlideContainer>
  );
};

const StyledSlidingProject = styled.div`
  width: 90dvw;
  height: 100%;
  background: ${rgba("#f00", 0.1)};
`;

interface SlidingProjectProps {
  project: FeaturedProject;
}

const SlidingProject: React.FC<SlidingProjectProps> = ({ project }) => {
  const { id, title, description, technologies, technologiesFeatured } =
    project;
  return <StyledSlidingProject>{title}</StyledSlidingProject>;
};

const StyledProjectsCTA = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ProjectsCTA = () => {
  return <StyledProjectsCTA>CTA</StyledProjectsCTA>;
};
