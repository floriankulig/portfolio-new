import { TransitionLink } from "components/shared";
import {
  MotionValue,
  backIn,
  easeInOut,
  easeOut,
  motion,
  useTransform,
} from "framer-motion";
import { useViewport } from "hooks";
import Image from "next/image";
import { rgba } from "polished";
import { memo, useMemo } from "react";
import styled from "styled-components";
import { FeaturedProject } from "ts/types";

const StyledSlidingProject = styled(motion.div)<{ $vertical?: boolean }>`
  position: relative;
  width: ${({ $vertical }) => ($vertical ? 100 : 90)}dvw;
  height: ${({ $vertical }) => ($vertical ? "105vh" : "100%")};
  overflow: hidden;
`;

interface StyledBGProps {
  $imageOverflowX: number;
  $imageOverflowY: number;
}
const StyledBG = styled(motion.div)<StyledBGProps>`
  position: relative;
  min-width: calc(100% + ${(p) => p.$imageOverflowX}px);
  height: calc(100% + ${(p) => p.$imageOverflowY}px);
  will-change: transform;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  img {
    object-fit: cover;
  }
`;

const BGOverlay = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  padding-block: min(90px, 10vh);
  padding-inline: 4vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(
    180deg,
    rgba(24, 24, 24, 0.15) 0%,
    rgba(24, 24, 24, 0.6) 100%
  );
  @media (${({ theme }) => theme.bp.small}) {
    padding-inline: 5vw;
  }

  h2 {
    font-size: clamp(2.75rem, 10vw, 4rem);
    font-weight: 500;
    line-height: 1;
    padding-bottom: 0.2em;
    letter-spacing: -0.03em;
    color: var(--bg2);
    margin-bottom: clamp(0px, 1vw, 1rem);
    text-shadow: 0 0 2em ${rgba("#000", 0.5)};
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: end;
    flex-wrap: wrap-reverse;
    padding-left: 4px;
    gap: 1rem;

    .description {
      font-family: var(--jakarta);
      font-size: clamp(1.15rem, 4vw, 1.5rem);
      font-weight: 400;
      line-height: 1.3;
      max-width: 38ch;
      white-space: pre-line;
      color: var(--bg1);
      text-shadow: 0 0 2em ${rgba("#000", 0.8)};
    }

    .chips {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      flex-shrink: 0;
      justify-content: flex-end;
      align-items: flex-end;

      span {
        font-size: clamp(0.875rem, 3vw, 1rem);
        padding: 0.75em 2em;
        line-height: 1.5;
        border-radius: 99px;
        font-weight: 500;
        color: white;
        box-sizing: content-box;
        background: ${rgba("#5c5a5a", 0.25)};
        backdrop-filter: blur(20px) saturate(140%);
        box-shadow: 0 0 32px ${rgba("#000", 0.15)},
          inset 0px 0px 8px ${rgba("#fff", 0.05)},
          inset 1px 2px 3px ${rgba("#fff", 0.1)},
          inset -1px -1px 4px ${rgba("#000", 0.125)},
          inset 0px 0px 1px ${rgba("#fff", 0.1)};
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
  inStack?: boolean;
}

const PROJECT_IMAGE_OVERFLOW_X = 200;
const PROJECT_IMAGE_OVERFLOW_Y = 150;
const PROJECT_IMAGE_OVERLAP = 0.25;
export const PROJECT_INTRO_DISTANCE = 200;
const MemoSlidingProject: React.FC<SlidingProjectProps> = ({
  project,
  index,
  images,
  scrollProgress,
  introAnimationRange,
  endRange,
  inStack = false,
}) => {
  const { viewport: windowDimensions } = useViewport();
  const {
    title,
    featureImage: image,
    featureDescription: description,
    keywords,
  } = project;
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
  const imageParallax = useTransform(scrollProgress, imageSlideRange, [
    -1 * (inStack ? PROJECT_IMAGE_OVERFLOW_Y : PROJECT_IMAGE_OVERFLOW_X),
    0,
  ]);
  const projectIntroXInitial = inStack
    ? 0
    : (windowDimensions.viewPortWidth * (1 - 0.9)) / 2; // Project takes 90vw
  const projectIntroX = useTransform(
    scrollProgress,
    introAnimationRange,
    [projectIntroXInitial, 0],
    { ease: backIn }
  );
  const projectOthersX = useTransform(
    scrollProgress,
    introAnimationRange,
    [PROJECT_INTRO_DISTANCE, 0],
    { ease: easeOut }
  );
  const projectX = index === 0 ? projectIntroX : inStack ? 0 : projectOthersX;
  const projectIntroY = useTransform(
    scrollProgress,
    [0, slideRangeStart - 0.075],
    [-PROJECT_INTRO_DISTANCE, 0],
    { ease: inStack ? easeInOut : easeInOut }
  );
  const projectY = index === 0 ? projectIntroY : 0;
  const projectIntroScale = useTransform(
    scrollProgress,
    introAnimationRange,
    [0.85, 1]
  );
  const projectScale = index <= 1 ? projectIntroScale : 1;
  const slideBR = useTransform(scrollProgress, introAnimationRange, [32, 0], {
    ease: easeInOut,
  });

  // Counter scale down at the end of the scroll
  const imageScale = useTransform(
    scrollProgress,
    [0, slideRangeStart + 0.025, ...endRange],
    [1.1, 1, 1, 1.15]
  );

  return (
    <TransitionLink href={`/project/${project.id}`}>
      <StyledSlidingProject
        style={{
          x: !inStack ? projectX : 0,
          y: projectY,
          scale: projectScale,
          borderRadius: slideBR,
        }}
        $vertical={inStack}
      >
        <StyledBG
          style={{
            x: inStack ? 0 : imageParallax,
            y: inStack ? imageParallax : 0,
            scale: imageScale,
          }}
          $imageOverflowX={inStack ? 0 : PROJECT_IMAGE_OVERFLOW_X}
          $imageOverflowY={inStack ? PROJECT_IMAGE_OVERFLOW_Y : 0}
        >
          <Image
            src={"/" + image}
            alt={`Image showing a software preview of the project "${title}"`}
            fill
            sizes="100vw"
            priority={index === 0}
          />
        </StyledBG>
        <BGOverlay>
          <h2>{title}</h2>
          <div className="row">
            <p className="description balanced">{description}</p>
            <LocalTechList keywords={keywords} />
          </div>
        </BGOverlay>
      </StyledSlidingProject>
    </TransitionLink>
  );
};

interface LocalTechListProps {
  keywords: string[];
}

const LocalTechList: React.FC<LocalTechListProps> = memo(({ keywords }) => {
  return (
    <div className="chips">
      {keywords.map((tech, i) => {
        return <span key={`${tech}-${i}`}>{tech}</span>;
      })}
    </div>
  );
});
LocalTechList.displayName = "LocalTechList";
export const SlidingProject = memo(MemoSlidingProject);
