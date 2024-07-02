import { motion } from "framer-motion";
import { rgba } from "polished";
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

const StyledBG = styled(motion.img)`
  width: calc(100% + 32px);
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
        /* background: linear-gradient(
          175deg,
          rgba(24, 24, 24, 0.1) 0%,
          rgba(240, 240, 240, 0.2) 100%
        ); */
        backdrop-filter: blur(20px);
      }
    }
  }
`;

interface SlidingProjectProps {
  project: FeaturedProject;
}

export const SlidingProject: React.FC<SlidingProjectProps> = ({ project }) => {
  const { id, title, image, description, technologies, technologiesFeatured } =
    project;
  return (
    <StyledSlidingProject>
      <StyledBG src={image} alt="test" />
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
