import { MotionValue, motion, useTransform } from "framer-motion";
import { useViewport } from "hooks";
import { rgba } from "polished";
import { memo, useMemo } from "react";
import styled from "styled-components";
import { FeaturedProject } from "ts/content";

const StyledSlidingProject = styled(motion.div)`
  position: relative;
  width: 90dvw;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
`;

const StyledBG = styled(motion.img)<{ $imageOverflow: number }>`
  min-width: calc(100% + ${(p) => p.$imageOverflow}px);
  height: 100%;
  object-fit: cover;
  object-fit: cover;
  will-change: transform;
  backface-visibility: hidden;
  transform-style: preserve-3d;
`;

const BGOverlay = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  padding: 90px 64px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(
    180deg,
    rgba(24, 24, 24, 0.35) 0%,
    rgba(24, 24, 24, 0.6) 100%
  );

  h2 {
    font-size: 4rem;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: -3%;
    color: var(--bg2);
    margin-bottom: 1rem;
    text-shadow: 0 0 124px ${rgba("#000", 0.5)};
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-left: 4px;
    gap: 1rem;

    .description {
      font-family: var(--jakarta);
      font-size: 1.5rem;
      font-weight: 400;
      line-height: 1.3;
      max-width: 40ch;
      white-space: pre-line;
      color: var(--bg1);
      text-shadow: 0 0 124px ${rgba("#000", 0.5)};
    }

    .chips {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: flex-end;
      align-items: flex-end;

      span {
        padding: 12px 32px;
        line-height: 1.5;
        border-radius: 99px;
        font-size: 1rem;
        font-weight: 500;
        color: white;
        border: 1px solid ${rgba("#fff", 0.05)};
        background: ${({ theme }) => rgba("#5c5a5a", 0.2)};
        backdrop-filter: blur(20px);
      }
    }
  }
`;

interface SlidingProjectProps {
  project: FeaturedProject;
  index: number;
  images: number;
  scrollProgress: MotionValue<number>;
  introAnimationRange: number[];
  endRange: number[];
}

const PROJECT_IMAGE_OVERFLOW = 200;
const PROJECT_IMAGE_OVERLAP = 0.25;
const PROJECT_INTRO_DISTANCE = 150;
const MemoSlidingProject: React.FC<SlidingProjectProps> = ({
  project,
  index,
  images,
  scrollProgress,
  introAnimationRange,
  endRange,
}) => {
  const { viewport: windowDimensions } = useViewport();
  const { id, title, image, description, technologies, technologiesFeatured } =
    project;
  const { slideRangeStart, imageSlideRange } = useMemo(() => {
    // Slide animation start after the intro animation
    const slideRangeStart = introAnimationRange[1];
    const slideRangePerWindow = (1 - slideRangeStart) / images;
    return {
      slideRangeStart,
      imageSlideRange: [
        Math.max(index * slideRangePerWindow - PROJECT_IMAGE_OVERLAP, 0) +
          (index === 0 ? 0 : slideRangeStart),
        Math.min((index + 1) * slideRangePerWindow + PROJECT_IMAGE_OVERLAP, 1) +
          slideRangeStart,
      ],
    };
  }, [introAnimationRange, images, index]);
  const imageX = useTransform(scrollProgress, imageSlideRange, [
    -PROJECT_IMAGE_OVERFLOW,
    0,
  ]);
  const projectIntroXInitial = (windowDimensions.viewPortWidth * (1 - 0.9)) / 2; // Project takes 90vw
  const projectIntroX = useTransform(scrollProgress, introAnimationRange, [
    projectIntroXInitial,
    0,
  ]);
  const projectOthersX = useTransform(scrollProgress, introAnimationRange, [
    PROJECT_INTRO_DISTANCE,
    0,
  ]);
  const projectX = index === 0 ? projectIntroX : projectOthersX;
  const projectIntroY = useTransform(
    scrollProgress,
    [0, slideRangeStart - 0.1],
    [-PROJECT_INTRO_DISTANCE, 0]
  );
  const projectY = index === 0 ? projectIntroY : 0;
  const projectIntroScale = useTransform(
    scrollProgress,
    introAnimationRange,
    [0.85, 1]
  );
  const projectScale = index <= 1 ? projectIntroScale : 1;
  const slideBR = useTransform(scrollProgress, introAnimationRange, [56, 0]);

  // Counter scale down at the end of the scroll
  const imageScale = useTransform(scrollProgress, endRange, [1, 1.15]);

  return (
    <StyledSlidingProject
      style={{
        x: projectX,
        y: projectY,
        scale: projectScale,
        borderRadius: slideBR,
      }}
    >
      <StyledBG
        src={image}
        style={{ x: imageX, scale: imageScale }}
        $imageOverflow={PROJECT_IMAGE_OVERFLOW}
        alt="test"
      />
      <BGOverlay>
        <h2>{title}</h2>
        <div className="row">
          <p className="description">{description}</p>
          <LocalTechList
            technologies={technologies}
            technologiesFeatured={technologiesFeatured}
          />
        </div>
      </BGOverlay>
    </StyledSlidingProject>
  );
};

interface LocalTechListProps {
  technologies: string[];
  technologiesFeatured: number;
}

const LocalTechList: React.FC<LocalTechListProps> = memo(
  ({ technologies, technologiesFeatured }) => {
    const visibleTechnologies = useMemo(
      () => technologies.slice(0, technologiesFeatured),
      [technologies, technologiesFeatured]
    );

    return (
      <div className="chips">
        {visibleTechnologies.map((tech, i) => (
          <span key={`${tech}-${i}`}>{tech}</span>
        ))}
      </div>
    );
  }
);
LocalTechList.displayName = "LocalTechList";
export const SlidingProject = memo(MemoSlidingProject);
