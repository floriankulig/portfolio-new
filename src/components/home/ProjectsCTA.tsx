import { ArrowButton, TransitionLink } from "components/shared";
import { motion, MotionValue, useTransform } from "framer-motion";
import styled from "styled-components";

const StyledProjectsCTA = styled.div<{ $inStack?: boolean }>`
  position: ${({ $inStack }) => ($inStack ? "relative" : "sticky")};
  top: 0;
  right: 0;
  width: 100vw;
  height: ${({ $inStack }) => ($inStack ? 70 : 100)}vh;
  flex-shrink: 0;
  max-width: 400px;
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
  letter-spacing: -0.03em;
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
  range?: number[];
  inStack?: boolean;
}
export const ProjectsCTA: React.FC<ProjectsCTAProps> = ({
  scrollYProgress,
  range = [1, 1],
  inStack = false,
}) => {
  const opacity = useTransform(scrollYProgress, range, [0, 1]);
  const y = useTransform(scrollYProgress, range, [20, 0]);

  return (
    <StyledProjectsCTA $inStack={inStack}>
      <StyledProjectsCTAContent style={{ y, opacity }}>
        <h3>Want more?</h3>
        <p>that&lsquo;s not everything...</p>
        <TransitionLink href="/work">
          <ArrowButton>View Project Showcase</ArrowButton>
        </TransitionLink>
      </StyledProjectsCTAContent>
    </StyledProjectsCTA>
  );
};
