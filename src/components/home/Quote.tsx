import { QuotationMark } from "components/shared";
import { motion, useScroll, useTransform } from "framer-motion";
import { rgba } from "polished";
import { useRef } from "react";
import styled from "styled-components";

const StyledQuoteSection = styled.section`
  background: var(--light);
  width: 100%;
  display: grid;
  place-items: center;
  padding: 100px 0 300px;
`;

const StyledQuote = styled(motion.div)`
  position: relative;
  display: flex;
  margin: 0 5vh 0;
  padding-top: clamp(0rem, 5vw, 3rem);
  flex-direction: column;
  color: var(--dark);
  text-align: center;

  h4 {
    font-weight: 400;
    font-size: 130%;
    max-width: 30ch;
    line-height: 1.5;
    position: relative;
    z-index: 1;
    & > div {
      position: absolute;
      top: -2.7rem;
      left: -10px;
      z-index: -1;
      svg {
        height: 4rem;
        width: auto;
      }
    }
  }

  p {
    font-style: italic;
    margin-top: 1.2rem;
    z-index: 1;
  }
`;

const Background = styled(motion.div)`
  position: absolute;
  width: 100%;
  top: -50%;
  z-index: 0;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  overflow: visible;
  div {
    aspect-ratio: 1;
    border-radius: 50%;
    border: 1px solid var(--grey);
    padding: clamp(30px, 5vw, 50px);
  }
  & > div {
    border-color: ${({ theme }) => rgba(theme.grey, 0.2)};
    & > div {
      border-color: ${({ theme }) => rgba(theme.grey, 0.4)};
      & > div {
        border-color: ${({ theme }) => rgba(theme.grey, 0.6)};
        & > div {
          border-color: ${({ theme }) => rgba(theme.grey, 0.8)};
          width: clamp(100px, 20vw, 160px);
        }
      }
    }
  }
`;

const animationStates = [0.2, 0.45, 0.85, 1];

export const Quote: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end center"],
  });

  const opacity = useTransform(scrollYProgress, animationStates, [0, 1, 1, 0]);
  const textY = useTransform(
    scrollYProgress,
    animationStates,
    [50, 0, 0, -100]
  );
  const parallaxAuthor = useTransform(
    scrollYProgress,
    animationStates,
    [10, 0, 0, 20]
  );
  const parallaxShape = useTransform(
    scrollYProgress,
    animationStates,
    [-30, 0, 0, 50]
  );

  const scaleBackground = useTransform(
    scrollYProgress,
    animationStates,
    [1, 1.5, 1.5, 1]
  );

  return (
    <StyledQuoteSection ref={sectionRef}>
      <StyledQuote style={{ opacity }}>
        <motion.div style={{ y: textY }}>
          <h4>
            The secret of change is to focus all of your energy not on fighting
            the old, but on building the new.
            <motion.div style={{ y: parallaxShape }}>
              <QuotationMark />
            </motion.div>
          </h4>
          <motion.p style={{ y: parallaxAuthor }}>~ Socrates</motion.p>
        </motion.div>
        <Background style={{ scale: scaleBackground }}>
          <div>
            <div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </Background>
      </StyledQuote>
    </StyledQuoteSection>
  );
};
