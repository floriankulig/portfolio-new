import { MotionValue, motion, useTransform } from "framer-motion";
import { rgba } from "polished";
import { memo } from "react";
import styled from "styled-components";
import { FeaturedProject } from "ts/content";

const StyledSlidingProject = styled.div`
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
  endRange: number[];
}

const PROJECT_IMAGE_OVERFLOW = 200;
const PROJECT_IMAGE_OVERLAP = 0.25;
const MemoSlidingProject: React.FC<SlidingProjectProps> = ({
  project,
  index,
  images,
  scrollProgress,
  endRange,
}) => {
  const { id, title, image, description, technologies, technologiesFeatured } =
    project;
  const slideRange = 1 / images;
  const imageX = useTransform(
    scrollProgress,
    [
      Math.max(index * slideRange - PROJECT_IMAGE_OVERLAP, 0),
      Math.min((index + 1) * slideRange + PROJECT_IMAGE_OVERLAP, 1),
    ],
    [-PROJECT_IMAGE_OVERFLOW, 0]
  );
  // Counter scale down at the end of the scroll
  const imageScale = useTransform(scrollProgress, endRange, [1, 1.15]);

  return (
    <StyledSlidingProject>
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
          <div className="chips">
            {technologies.slice(0, technologiesFeatured).map((tech, i) => (
              <span key={`${tech}-${i}`}>{tech}</span>
            ))}
          </div>
        </div>
      </BGOverlay>
    </StyledSlidingProject>
  );
};

export const SlidingProject = memo(MemoSlidingProject);
