import {
  motion,
  MotionValue,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { rgba } from "polished";
import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "styles";
import { SCROLL_SPRING } from "ts";

// for paddings on top and bottom
const StyledThinkDifferentSection = styled(motion.section)`
  display: flex;
  padding-block: 25vh;
  align-items: center;
`;
const StyledThinkDifferentAnimation = styled.div`
  height: 500vh;
  position: relative;
  width: 100%;
`;
const StyledThinkDifferentAnimationContent = styled.div`
  height: 100dvh;
  width: 100%;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    position: absolute;
    font-size: clamp(32px, 10vw, 128px);
    font-family: var(--poppins);
    letter-spacing: -0.04em;
    font-weight: 900;

    &.part1 {
      background: var(--text1);
      background-clip: text;
      color: transparent;
    }
  }
`;

export const ThinkDifferent: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const dampedScrollY = useSpring(scrollYProgress, SCROLL_SPRING);
  const partOneSection = [0, 0.3];
  const partOneProgress = useTransform(scrollYProgress, partOneSection, [0, 1]);
  const partTwoSection = [0.3, 0.75];
  const partTwoProgress = useTransform(scrollYProgress, partTwoSection, [0, 1]);

  const sectionBackground = useTransform(
    scrollYProgress,
    [0, 1],
    [theme.bg2, theme.bg1]
  );

  return (
    <StyledThinkDifferentSection
      ref={sectionRef}
      style={{ backgroundColor: sectionBackground }}
    >
      <StyledThinkDifferentAnimation>
        <StyledThinkDifferentAnimationContent>
          <PartOne scrollProgress={partOneProgress}></PartOne>
          <PartTwo scrollProgress={partTwoProgress}></PartTwo>
        </StyledThinkDifferentAnimationContent>
      </StyledThinkDifferentAnimation>
    </StyledThinkDifferentSection>
  );
};
interface AnimationPartProps {
  scrollProgress: MotionValue<number>;
}

const PartOne: React.FC<AnimationPartProps> = ({ scrollProgress }) => {
  const [visible, setVisible] = useState(false);
  const y = useTransform(scrollProgress, [0, 0.35, 0.85, 1], [75, 10, 0, -25]);
  const opacity = useTransform(
    scrollProgress,
    [0, 0.2, 0.875, 1],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollProgress,
    [0, 0.35, 0.85, 1],
    [0.95, 1, 1, 1.025]
  );
  const gradientX = useTransform(scrollProgress, [0.25, 0.9], [10, 80]);
  const gradientY = useTransform(scrollProgress, [0.25, 0.9], [0, 15]);
  const gradientOpacity = useTransform(
    scrollProgress,
    [0.25, 0.6, 0.9],
    [0.3, 0.55, 0.3]
  );
  const backgroundImage = useMotionTemplate`radial-gradient(circle at ${gradientX}% ${gradientY}%, ${rgba(
    theme.bg2,
    gradientOpacity.get()
  )}, transparent 35%)`;
  return (
    <motion.div
      className="part1"
      style={{ y, opacity, scale, backgroundImage }}
    >
      The Motto:
    </motion.div>
  );
};

const StyledPartTwoAnimation = styled(motion.div)`
  font-size: clamp(24px, 7vw, 96px);
  letter-spacing: -0.06em;
  font-weight: 500;

  span {
    display: inline-block;
  }
`;

const PartTwo: React.FC<AnimationPartProps> = ({ scrollProgress }) => {
  const y = useTransform(scrollProgress, [0, 0.35, 0.85, 1], [75, 10, 0, -25]);
  const opacity = useTransform(scrollProgress, [0, 0.2], [0, 1]);
  return (
    <StyledPartTwoAnimation style={{ opacity }}>
      <WordAnimation scrollProgress={scrollProgress}>
        let's think outside the box
      </WordAnimation>
    </StyledPartTwoAnimation>
  );
};

interface WordAnimationProps {
  children: string;
  scrollProgress: MotionValue<number>;
}
const WordAnimation: React.FC<WordAnimationProps> = ({
  children,
  scrollProgress,
}) => {
  const words = children.split(" ");
  const numberOfWords = words.length;
  const animationEnd = 0.5;
  const xProgress = useTransform(
    scrollProgress,
    [animationEnd / numberOfWords, animationEnd],
    [50, 0]
  );
  const x = useMotionTemplate`${xProgress}%`;

  return (
    <motion.span style={{ x }}>
      {words.map((word, index) => (
        <WordFadeUp
          key={index}
          index={index}
          scrollProgress={scrollProgress}
          animationEnd={animationEnd}
          introAnimationRange={[0, 0.6]}
          numberOfWords={numberOfWords}
        >
          {word}&nbsp;
        </WordFadeUp>
      ))}
    </motion.span>
  );
};
interface WordFadeUpProps {
  children: React.ReactNode;
  introAnimationRange: [number, number];
  index: number;
  numberOfWords: number;
  animationEnd: number;
  scrollProgress: MotionValue<number>;
}
const WordFadeUp: React.FC<WordFadeUpProps> = ({
  children,
  introAnimationRange,
  index,
  numberOfWords,
  animationEnd,
  scrollProgress,
}) => {
  const { imageSlideRange } = useMemo(() => {
    const slideRangePerWindow = animationEnd / numberOfWords;
    const wordOverlap = index >= 2 ? slideRangePerWindow / 7 : 0;
    return {
      slideRangePerWindow,
      imageSlideRange: [
        Math.max(index * slideRangePerWindow - wordOverlap, 0),
        Math.min((index + 1) * slideRangePerWindow + wordOverlap, 1),
      ],
    };
  }, [introAnimationRange, numberOfWords, index]);

  const y = useTransform(scrollProgress, imageSlideRange, [100, 0]);
  const opacity = useTransform(scrollProgress, imageSlideRange, [0, 1]);

  return <motion.span style={{ y, opacity }}>{children}</motion.span>;
};
