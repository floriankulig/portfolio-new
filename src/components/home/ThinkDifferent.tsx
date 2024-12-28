import {
  AnimatePresence,
  delay,
  LayoutGroup,
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useViewport } from "hooks";
import { borderRadius, borderWidth, opacify, rgba } from "polished";
import { exit } from "process";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "styles";
import { SCROLL_SPRING } from "ts";
import { transform } from "typescript";

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

  & > span {
    display: inline-flex;
  }
`;

const PartTwo: React.FC<AnimationPartProps> = ({ scrollProgress }) => {
  const y = useTransform(scrollProgress, [0, 0.35, 0.85, 1], [75, 10, 0, -25]);
  const opacity = useTransform(scrollProgress, [0, 0.2], [0, 1]);
  return (
    <StyledPartTwoAnimation style={{ opacity }}>
      <WordAnimation scrollProgress={scrollProgress}>
        let&apos;s think outside the box
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
    [animationEnd / numberOfWords, animationEnd], // start after the first word
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
          numberOfWords={numberOfWords}
        >
          {word}&nbsp;
        </WordFadeUp>
      ))}
    </motion.span>
  );
};

const StyledSingleWord = styled(motion.span)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  line-height: 1;
`;

interface WordFadeUpProps {
  children: React.ReactNode;
  index: number;
  numberOfWords: number;
  animationEnd: number;
  scrollProgress: MotionValue<number>;
}
const WordFadeUp: React.FC<WordFadeUpProps> = ({
  children,
  index,
  numberOfWords,
  animationEnd,
  scrollProgress,
}) => {
  const { imageSlideRange, animationTriggerThreshold } = useMemo(() => {
    const slideRangePerWindow = animationEnd / numberOfWords;
    const wordOverlap = index >= 2 ? slideRangePerWindow / 7 : 0;
    const animationTriggerThreshold = animationEnd + 0.075;
    return {
      slideRangePerWindow,
      animationTriggerThreshold,
      imageSlideRange: [
        Math.max(index * slideRangePerWindow - wordOverlap, 0),
        Math.min(
          (index + 1) * slideRangePerWindow + wordOverlap,
          animationEnd - wordOverlap
        ),
      ],
    };
  }, [numberOfWords, index, animationEnd]);

  const [lastWordAnimationVisible, setLastWordAnimationVisible] =
    useState(false);

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    setLastWordAnimationVisible(
      parseFloat(latest.toFixed(2)) > animationTriggerThreshold &&
        index === numberOfWords - 1
    );
  });
  const y = useTransform(scrollProgress, imageSlideRange, [100, 0]);
  const opacity = useTransform(scrollProgress, imageSlideRange, [0, 1]);

  const x = useMotionValue(0);
  const sx = useSpring(x);

  useEffect(() => {
    x.set(lastWordAnimationVisible ? 15 : 0);
  }, [lastWordAnimationVisible, x]);

  return (
    <LayoutGroup>
      <StyledSingleWord style={{ x: sx, y, opacity }}>
        {children}
        <AnimatePresence>
          {lastWordAnimationVisible && (
            <LastWordAnimation key={String(children)} />
          )}
        </AnimatePresence>
      </StyledSingleWord>
    </LayoutGroup>
  );
};

const StyledLastWordAnimation = styled(motion.div)`
  border: clamp(2px, 0.5vw, 3px) solid var(--text1);
  transform-origin: 0 50%;
  backdrop-filter: blur(3px);
`;

const lastWordAnimationVariants = {
  hidden: {
    height: "70%",
    width: "4%",
    left: "5%",
    background: theme.text1,
    borderRadius: 0,
  },
  visible: (isMobile: any) => ({
    height: "120%",
    width: "120%",
    left: "-8%",
    background: "transparent",
    borderRadius: isMobile ? 6 : 8,
    transition: {
      width: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.5,
      },
      height: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.25,
      },
      background: { duration: 0.25, delay: 0.5 },
      borderRadius: { delay: 0.3 },
      left: { duration: 0.4 },
      duration: 0.5,
      ease: "easeOut",
    },
  }),
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

const LastWordAnimation: React.FC = memo(() => {
  const { isMobile } = useViewport(480);
  return (
    <StyledLastWordAnimation
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={isMobile}
      variants={lastWordAnimationVariants}
      style={{ position: "absolute" }}
    ></StyledLastWordAnimation>
  );
});

LastWordAnimation.displayName = "LastWordAnimation";
