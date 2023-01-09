import { SectionHeading } from "components/layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { useViewport } from "hooks";
import { rgba } from "polished";
import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { theme } from "styles";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";

const StyledMotivationSection = styled.section`
  background: var(--light);
`;

const Animation = styled(motion.div)`
  background: var(--dark);
  color: white;
  position: sticky;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
`;

const AnimationHeader = styled(motion.div)`
  width: 100%;
  text-align: center;
  padding-top: 2rem;
`;

const AnimatedTextWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
`;

const AnimatedText = styled(motion.h3)`
  font-size: 30rem;
  line-height: 1;
  width: max-content;
  text-transform: uppercase;
`;

const Letter = styled(motion.div)`
  position: relative;
  display: grid;
  place-items: center;
`;
const LetterNoAnimation = styled(motion.div)<{ $left?: boolean }>`
  position: absolute;
  white-space: nowrap;
  top: 0;
  right: 0;
  translate: 100%;
  ${(p) =>
    p.$left &&
    css`
      right: initial;
      left: 0;
      translate: -100%;
    `}
`;
const LetterBackground = styled(motion.div)`
  background: white;
  position: absolute;
`;

export const Motivation: React.FC = () => {
  const { isMobile, viewport } = useViewport();

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"],
  });

  const [sectionOffsetTop, setSectionOffsetTop] = useState(0);
  const inputRange = [sectionOffsetTop - 200, sectionOffsetTop - 40];
  const animationScaleX = useTransform(scrollY, inputRange, [
    isMobile ? "75%" : "80%",
    "100%",
  ]);
  const animationY = useTransform(scrollY, inputRange, [100, 0]);

  useEffect(() => {
    if (sectionRef.current) setSectionOffsetTop(sectionRef.current?.offsetTop);
  }, [sectionRef]);

  const animationRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: animationRef,
  });

  const headerInputRange = [
    sectionOffsetTop - 300,
    sectionOffsetTop - 100,
    sectionOffsetTop + 200,
    sectionOffsetTop + 400,
  ];
  const headerOpacity = useTransform(scrollY, headerInputRange, [0, 1, 1, 1]);
  const headerY = useTransform(scrollY, headerInputRange, [
    "45vh",
    "40vh",
    "35vh",
    "0vh",
  ]);

  const textOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.3], [100, 0]);
  const textX = useTransform(
    scrollYProgress,
    [0.35, 0.8],
    [isMobile ? 3000 : 2550, 0]
  );

  const textNoAnimationOpacity = useTransform(
    scrollYProgress,
    [0.8, 0.9],
    [1, 0]
  );
  const textNoAnimationScale = useTransform(
    scrollYProgress,
    [0.8, 0.9],
    [1, 0.9]
  );
  const textNoAnimationLeftX = useTransform(
    scrollYProgress,
    [0.8, 0.9],
    ["0vw", "-20vw"]
  );
  const textNoAnimationRightX = useTransform(
    scrollYProgress,
    [0.8, 0.9],
    ["0vw", "20vw"]
  );
  const backgroundScaleAxis = useTransform(
    scrollYProgress,
    [0.81, 0.87],
    [0.225, 1]
  );
  const backgroundWidth = useTransform(
    scrollYProgress,
    [0.9, 1],
    [isMobile ? 325 : 150, viewport.viewPortWidth]
  );
  const backgroundHeight = useTransform(
    scrollYProgress,
    [0.91, 0.98, 1],
    [379, viewport.viewPortHeight, viewport.viewPortHeight * 2]
  );
  const backgroundBorderRadius = useTransform(
    scrollYProgress,
    [0.91, 0.95],
    [120, 0]
  );

  const backgroundTop = useTransform(
    scrollYProgress,
    [0.91, 1],
    [80, -(viewport.viewPortHeight * 0.2)]
  );
  const opacityHeaderOut = useTransform(scrollYProgress, [0.9, 0.98], [1, 0]);
  const scaleHeaderOut = useTransform(scrollYProgress, [0.9, 0.98], [1, 0.8]);
  const yHeaderOut = useTransform(scrollYProgress, [0.9, 0.98], [0, -30]);

  return (
    <StyledMotivationSection ref={sectionRef}>
      <div ref={animationRef} style={{ height: "600vh" }}>
        <Animation
          layout
          initial={{ scaleX: 0.1, opacity: 0 }}
          whileInView={{
            scaleX: 1,
            opacity: 1,
          }}
          transition={{
            scaleX: {
              duration: 1,
              ease: theme.easing,
            },
            opacity: {
              duration: 0.2,
            },
          }}
          viewport={{ once: true, amount: 0.15 }}
          style={{ y: animationY, width: animationScaleX }}
        >
          <motion.div
            style={{
              opacity: opacityHeaderOut,
              y: yHeaderOut,
              scale: scaleHeaderOut,
            }}
          >
            <AnimationHeader style={{ y: headerY, opacity: headerOpacity }}>
              <SectionHeading light>my motto</SectionHeading>
            </AnimationHeader>
          </motion.div>
          <AnimatedTextWrapper>
            <AnimatedText style={{ x: textX, y: textY, opacity: textOpacity }}>
              {!isMobile ? (
                <Letter>
                  <LetterNoAnimation
                    $left
                    style={{
                      opacity: textNoAnimationOpacity,
                      scale: textNoAnimationScale,
                      x: textNoAnimationLeftX,
                    }}
                  >
                    MAKE IT F
                  </LetterNoAnimation>
                  U
                  <LetterBackground
                    ref={backgroundRef}
                    style={{
                      scaleY: backgroundScaleAxis,
                      width: backgroundWidth,
                      height: backgroundHeight,
                      originY: "bottom",
                      top: backgroundTop,
                      borderBottomLeftRadius: backgroundBorderRadius,
                      borderBottomRightRadius: backgroundBorderRadius,
                    }}
                  />
                  <LetterNoAnimation
                    style={{
                      opacity: textNoAnimationOpacity,
                      scale: textNoAnimationScale,
                      x: textNoAnimationRightX,
                    }}
                  >
                    N
                  </LetterNoAnimation>
                </Letter>
              ) : (
                <Letter>
                  <LetterNoAnimation
                    $left
                    style={{
                      opacity: textNoAnimationOpacity,
                      scale: textNoAnimationScale,
                      x: textNoAnimationLeftX,
                    }}
                  >
                    MAKE IT FU
                  </LetterNoAnimation>
                  N
                  <LetterBackground
                    ref={backgroundRef}
                    style={{
                      scaleX: backgroundScaleAxis,
                      width: backgroundWidth,
                      height: backgroundHeight,
                      originX: "left",
                      top: backgroundTop,
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  />
                </Letter>
              )}
            </AnimatedText>
          </AnimatedTextWrapper>
        </Animation>
      </div>
    </StyledMotivationSection>
  );
};
