import {
  AnimatePresence,
  easeIn,
  LayoutGroup,
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { rgba } from "polished";
import React, { memo, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "styles";

// for paddings on top and bottom
const StyledThinkDifferentSection = styled(motion.section)`
  display: flex;
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
    offset: ["start 25%", "end 20%"],
  });
  const partOneSection = [0, 0.25];
  const partOneProgress = useTransform(scrollYProgress, partOneSection, [0, 1]);
  const partTwoSection = [0.25, 0.95];
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

const StyledPartTwoAnimation = styled.div`
  font-size: clamp(24px, 7vw, 96px);
  letter-spacing: -0.06em;
  font-weight: 500;

  & > span {
    display: inline-flex;
    gap: 0.2em;
  }
`;

const PartTwo: React.FC<AnimationPartProps> = ({ scrollProgress }) => {
  return (
    <StyledPartTwoAnimation>
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
  const introAnimationEnd = 0.35;
  // intro
  const xProgress = useTransform(
    scrollProgress,
    [introAnimationEnd / numberOfWords, introAnimationEnd].concat([0.55, 0.85]), // start after the first word
    [50, 3].concat([-3, -50])
  );
  // subtract half of the last word width to center the last word
  const xWordWidth = useTransform(scrollProgress, [0.55, 0.85], [0, 0.5]);
  const x = useMotionTemplate`calc(${xProgress}% + ${xWordWidth}em)`;
  const y = useTransform(scrollProgress, [0.85, 1], ["0vh", "10vh"]);

  return (
    <motion.span style={{ x, y }}>
      {words.map((word, index) => (
        <WordFadeUp
          key={index}
          index={index}
          scrollProgress={scrollProgress}
          introAnimationEnd={introAnimationEnd}
          numberOfWords={numberOfWords}
        >
          {word}
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
  introAnimationEnd: number;
  scrollProgress: MotionValue<number>;
}
const WordFadeUp: React.FC<WordFadeUpProps> = ({
  children,
  index,
  numberOfWords,
  introAnimationEnd,
  scrollProgress,
}) => {
  const wordOutRange = [0.5, 0.75];

  const { wordFadeInRange, animationTriggerThreshold } = useMemo(() => {
    const slideRangePerWindow = introAnimationEnd / numberOfWords;
    const wordOverlap = index >= 2 ? slideRangePerWindow / 7 : 0;
    const animationTriggerThreshold = 0.65;
    return {
      slideRangePerWindow,
      animationTriggerThreshold,
      wordFadeInRange: [
        Math.max(index * slideRangePerWindow - wordOverlap, 0),
        Math.min(
          (index + 1) * slideRangePerWindow + wordOverlap,
          introAnimationEnd - wordOverlap
        ),
      ],
    };
  }, [numberOfWords, index, introAnimationEnd]);

  const isLastWord = index === numberOfWords - 1;

  const [lastWordAnimationVisible, setLastWordAnimationVisible] =
    useState(false);

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    setLastWordAnimationVisible(
      parseFloat(latest.toFixed(2)) > animationTriggerThreshold && isLastWord
    );
  });
  const y = useTransform(scrollProgress, wordFadeInRange, [100, 0]);
  const opacity = useTransform(scrollProgress, wordFadeInRange, [0, 1]);
  // Fade out animations
  const x = useTransform(scrollProgress, wordOutRange, [
    0,
    -(numberOfWords - index) * 40 + 50,
  ]);
  const scale = useTransform(scrollProgress, wordOutRange, ["100%", "140%"], {
    ease: easeIn,
  });

  return (
    <LayoutGroup>
      <StyledSingleWord
        style={{ y, opacity, x, scale: isLastWord ? scale : 1 }}
      >
        {isLastWord ? (
          <>
            {children}
            <AnimatePresence>
              {lastWordAnimationVisible && (
                <LastWordAnimation key={String(children)} />
              )}
            </AnimatePresence>
          </>
        ) : (
          <WordFadeOut scrollProgress={scrollProgress} range={wordOutRange}>
            {children}
          </WordFadeOut>
        )}
      </StyledSingleWord>
    </LayoutGroup>
  );
};

const StyledLastWordAnimation = styled(motion.div)`
  border: 0.035em solid var(--text1);
  transform-origin: 0 50%;
  backdrop-filter: blur(3px);
  position: absolute;
  border-radius: 0.075em;

  & + .light-bulb {
    position: absolute;
    top: calc(-50% - 0.375em);
    right: -20%;
    font-size: 0.5em; // half of defined font size in WordAnimation
  }
`;

const lastWordAnimationVariants = {
  hidden: {
    height: "70%",
    width: "4%",
    left: "5%",
    background: theme.text1,
  },
  visible: {
    height: "120%",
    width: "130%",
    left: "-8%",
    background: "transparent",
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
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};
const lightBulbAnimationVariants = {
  hidden: {
    scale: 0.9,
    y: ".375em",
    opacity: 0,
  },
  visible: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.7,
      ease: "easeOut",
      opacity: {
        ease: "linear",
        delay: 0.7,
        duration: 0.25,
      },
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    y: -10,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

const LastWordAnimation: React.FC = memo(() => {
  return (
    <>
      <StyledLastWordAnimation
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={lastWordAnimationVariants}
      ></StyledLastWordAnimation>
      <motion.span
        className="light-bulb"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={lightBulbAnimationVariants}
      >
        💡
      </motion.span>
    </>
  );
});

LastWordAnimation.displayName = "LastWordAnimation";

interface WordAnimateOutProps {
  children: React.ReactNode;
  scrollProgress: MotionValue<number>;
  range: number[];
}
const WordFadeOut: React.FC<WordAnimateOutProps> = ({
  children,
  scrollProgress,
  range,
}) => {
  const scale = useTransform(scrollProgress, range, [1, 0.85]);
  const opacity = useTransform(scrollProgress, range, [1, 0]);
  return <motion.span style={{ scale, opacity }}>{children}</motion.span>;
};
