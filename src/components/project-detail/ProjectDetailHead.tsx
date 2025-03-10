import {
  easeIn,
  easeOut,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import styled from "styled-components";
import { Project } from "ts/types";
import { ProjectStats } from "./ProjectStats";

const StyledProjectDetailHeadSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const StyledHeroSection = styled.div`
  min-height: 80vh;
  padding-top: max(64px, 25vh);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  h1 {
    font-size: clamp(2.5rem, 10dvw, 6rem);
    font-weight: 500;
    letter-spacing: -0.05em;
    line-height: 1;
  }
  p {
    font-size: clamp(1rem, 3vw, 1.25rem);
    color: var(--text2);
    opacity: 0.9;
    padding-block: 2.5em;
    width: 100%;
    max-width: 55ch;
  }
`;

interface ProjectDetailHeadProps {
  project: Project;
}

export const ProjectDetailHead: React.FC<ProjectDetailHeadProps> = ({
  project,
}) => {
  return (
    <StyledProjectDetailHeadSection>
      <StyledHeroSection className="main-col">
        <h1>{project.title}</h1>
        <p className="balanced">{project.featureDescription}</p>
        <ProjectStats project={project} />
      </StyledHeroSection>
      <FeatureImageSection
        image={project.featureImage}
        projectTitle={project.title}
      />
    </StyledProjectDetailHeadSection>
  );
};

const StyledFeatureImageSection = styled.div`
  --padding: max(1rem, 5vh);
  width: 100%;
  display: grid;
  place-items: center;
  padding-block: var(--padding) 0;
`;

const StyledFeatureImageContainer = styled.div`
  --size: 100vw;
  border-radius: 0px;
  @media (${({ theme }) => theme.bp.small}) {
    --size: 95vw;
    border-radius: 4px;
  }
  width: var(--size);
  height: min(110vh, calc(var(--size) / 1.618));
  display: grid;
  place-items: center;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const AnimatedOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: black;
`;

const StyledFeatureImage = styled(motion.div)<{ $overlap: number }>`
  width: 100%;
  height: ${(p) => 100 + 2 * p.$overlap}%;
  position: relative;
`;

interface FeatureImageSectionProps {
  image: string;
  projectTitle: string;
}
const IMAGE_OVERLAP = 12.5;
const FeatureImageSection: React.FC<FeatureImageSectionProps> = ({
  image,
  projectTitle,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 10%"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.05, 1], {
    ease: [easeOut],
  });
  const imageYPercent = useTransform(
    scrollYProgress,
    [0, 1],
    [-IMAGE_OVERLAP, IMAGE_OVERLAP]
  );
  const imageY = useMotionTemplate`${imageYPercent}%`;
  const overlayOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 0.5], {
    ease: [easeIn],
  });
  return (
    <StyledFeatureImageSection ref={sectionRef}>
      <StyledFeatureImageContainer>
        <StyledFeatureImage
          $overlap={IMAGE_OVERLAP}
          style={{ y: imageY, scale: imageScale }}
        >
          <Image
            src={"/" + image}
            style={{ objectFit: "cover" }}
            alt={`Feature image for project ${projectTitle}`}
            fill
            sizes="(max-width: 720px) 100vw, 95vw"
            priority
          />
        </StyledFeatureImage>
        <AnimatedOverlay style={{ opacity: overlayOpacity }} />
      </StyledFeatureImageContainer>
    </StyledFeatureImageSection>
  );
};
