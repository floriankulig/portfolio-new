import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import styled from "styled-components";
import { SCROLL_SPRING } from "ts";
import { Project } from "ts/content";

const StyledProjectDetailHeadSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const StyledHeroSection = styled.div`
  height: 85vh;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: end;
  padding-inline: ${({ theme }) => theme.mainColPadding};

  h1 {
    font-size: clamp(2.5rem, 10dvw, 6rem);
    font-weight: 600;
    letter-spacing: -5%;
    line-height: 1.05;
    padding-block: 0.15em;
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
      <StyledHeroSection>
        <div>
          <h1>{project.title}</h1>
          <p>{project.featureDescription}</p>
        </div>
      </StyledHeroSection>
      <FeatureImageSection image={project.image} projectTitle={project.title} />
    </StyledProjectDetailHeadSection>
  );
};

const StyledFeatureImageSection = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  padding-block: 5vh;
  padding-block: max(1rem, 5vh);
`;

const StyledFeatureImageContainer = styled.div`
  width: 95vw;
  height: min(110vh, calc(95vw / 1.618));
  display: grid;
  place-items: center;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
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
const IMAGE_OVERLAP = 5;
const FeatureImageSection: React.FC<FeatureImageSectionProps> = ({
  image,
  projectTitle,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 10%"],
  });
  const scrollY = useSpring(scrollYProgress, SCROLL_SPRING);
  const scrollVelocity = useVelocity(scrollY);
  const scrollVelocityAbs = useTransform(scrollVelocity, Math.abs);
  const imageYPercent = useTransform(
    scrollYProgress,
    [0, 1],
    [-IMAGE_OVERLAP, IMAGE_OVERLAP]
  );
  const imageY = useMotionTemplate`${imageYPercent}%`;
  const imageScale = useTransform(scrollVelocityAbs, [0, 1], [1.001, 1]);
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
            priority
          />
        </StyledFeatureImage>
      </StyledFeatureImageContainer>
    </StyledFeatureImageSection>
  );
};
