import { SectionHeading } from "components/layout";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Example4 } from "./MotionExamples";

const StyledApproachSection = styled(motion.section)`
  ${({ theme }) => theme.grid}
`;

const Content = styled.div`
  display: grid;
  ${({ theme }) => theme.gridElement.fullWidth}
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  align-items: center;
`;

const Text = styled.div`
  grid-column: 1 / -1;
  width: 100%;
  margin-top: 3rem;
  @media (${({ theme }) => theme.bp.medium}) {
    grid-column: 3 / -1;
    margin-top: 0;
    margin-left: auto;
    width: min-content;
  }
  color: var(--dark);
  h2 {
    line-height: 1.5;
    font-size: clamp(2rem, 7vw, 2.65rem);
    &:last-of-type {
      margin-bottom: 1.2rem;
    }
  }
  p {
    margin-bottom: 1.5rem;
    max-width: 100%;
  }
`;
const Examples = styled(motion.div)`
  grid-column: 1 / -1;
  @media (${({ theme }) => theme.bp.medium}) {
    grid-column: 1 / 3;
  }
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const ExampleRow = styled.div`
  width: calc(50% - 5px);
`;

const Example = styled(motion.div)<{ $portrait?: boolean }>`
  background: var(--grey);
  border-radius: 5px;
  width: 100%;
  margin: 10px 0;
  aspect-ratio: ${(p) => (p.$portrait ? "1 / 1.618" : "1.618 / 1")};
  display: grid;
  place-items: center;
`;

const exampleVariants: Variants = {
  ripple: (delay) => ({
    scale: [1, 1.02, 1],
    transition: { delay, duration: 0.5 },
  }),
  noripple: { scale: 1 },
};

export const Approach = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 0.6], [-150, -300]);

  const [examplesOn, setExamplesOn] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const rotate1 = useTransform(scrollYProgress, [0, 0.35, 1], [5, 0, -2]);
  const rotate2 = useTransform(scrollYProgress, [0, 0.35, 1], [-2, 0, 1]);
  const rotate3 = useTransform(scrollYProgress, [0, 0.35, 1], [4, 0, -1.5]);

  useEffect(() => {
    if (!shouldAnimate) return;
    const timeout = setTimeout(() => {
      setExamplesOn(!examplesOn);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [examplesOn, shouldAnimate]);

  return (
    <StyledApproachSection
      ref={sectionRef}
      style={{ opacity, y, scale, transformOrigin: "top center" }}
      onViewportEnter={() => setShouldAnimate(true)}
      onViewportLeave={() => setShouldAnimate(false)}
    >
      <Content>
        <Examples
          onTap={() => setExamplesOn(!examplesOn)}
          animate="noripple"
          whileHover="ripple"
        >
          <ExampleRow>
            <Example
              variants={exampleVariants}
              style={{ rotate: rotate1 }}
            ></Example>
            <Example
              variants={exampleVariants}
              custom={0.1}
              style={{ rotate: rotate3 }}
              $portrait
            ></Example>
          </ExampleRow>
          <ExampleRow>
            <Example
              variants={exampleVariants}
              custom={0.2}
              style={{ rotate: rotate2 }}
              $portrait
            ></Example>
            <Example
              variants={exampleVariants}
              custom={0.3}
              style={{ rotate: rotate1 }}
              transition={{ ripple: { delay: 0.3 } }}
            >
              <Example4 on={examplesOn} />
            </Example>
          </ExampleRow>
        </Examples>
        <Text>
          <div className="headings">
            <SectionHeading>MOTION AND </SectionHeading>
            <SectionHeading>MICROINTERACTION</SectionHeading>
          </div>
          <p>
            Motion and animation play a crucial role in modern UI design. It is
            the best way to keep your users on the website for a long time and
            entertain them.
          </p>
          <p>
            Once incorporated into projects for aesthetic reasons only, motion
            design is now an important feature that gives users a better, more
            streamlined experience. Motion is about telling a story - every
            button click and every screen transition has a story to tell.
          </p>
        </Text>
      </Content>
    </StyledApproachSection>
  );
};
