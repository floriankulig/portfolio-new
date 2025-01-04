import {
  AnimatePresence,
  delay,
  easeInOut,
  LayoutGroup,
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { measureDistance } from "helpers";
import { useMeasure, useViewport } from "hooks";
import { opacify, rgba } from "polished";
import React, {
  memo,
  useDebugValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { theme } from "styles";
import { SCROLL_SPRING } from "ts";

// for paddings on top and bottom
const StyledThinkDifferentSection = styled(motion.section)`
  display: flex;
  align-items: center;
`;
const StyledThinkDifferentAnimation = styled.div`
  height: 600vh;
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
  const xProgress = useTransform(
    scrollProgress,
    [introAnimationEnd / numberOfWords, introAnimationEnd], // start after the first word
    [50, 0]
  );
  const x = useMotionTemplate`${xProgress}%`;

  const [thinkWordGeometry, thinkWordRef] = useMeasure();
  const [lastWordGeometry, lastWordRef] = useMeasure();

  const animateOutMoveGeometry: AnimationGeometry = useMemo(() => {
    const { height, width } = lastWordGeometry;
    const { distanceX, distanceY } = measureDistance(
      thinkWordGeometry,
      lastWordGeometry
    );
    const deltaX = distanceX - width * 0.05;
    const deltaY = distanceY + -1 * (height / 2 + height * 0.5);

    return {
      distanceX: deltaX,
      distanceY: deltaY,
    };
  }, [thinkWordGeometry, lastWordGeometry]);

  return (
    <motion.span style={{ x }}>
      {words.map((word, index) => (
        <WordFadeUp
          key={index}
          index={index}
          scrollProgress={scrollProgress}
          introAnimationEnd={introAnimationEnd}
          numberOfWords={numberOfWords}
          wordRef={
            index === numberOfWords - 1
              ? lastWordRef
              : index === 1
              ? thinkWordRef
              : undefined
          }
          animationOutGeometry={
            index === 1 ? animateOutMoveGeometry : undefined
          }
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

interface AnimationGeometry {
  distanceX: number;
  distanceY: number;
}

interface WordFadeUpProps {
  children: React.ReactNode;
  index: number;
  numberOfWords: number;
  introAnimationEnd: number;
  scrollProgress: MotionValue<number>;
  wordRef?: React.RefObject<HTMLElement>;
  animationOutGeometry?: AnimationGeometry;
}
const WordFadeUp: React.FC<WordFadeUpProps> = ({
  children,
  index,
  numberOfWords,
  introAnimationEnd,
  scrollProgress,
  wordRef,
  animationOutGeometry,
}) => {
  const [wordOutRange, wordMoveRange] = useMemo(() => {
    const wordOutRange = [0.5, 0.75];
    const wordMoveRange = [0.7, 1];
    return [wordOutRange, wordMoveRange];
  }, []);

  const { imageSlideRange, animationTriggerThreshold } = useMemo(() => {
    const slideRangePerWindow = introAnimationEnd / numberOfWords;
    const wordOverlap = index >= 2 ? slideRangePerWindow / 7 : 0;
    const animationTriggerThreshold =
      wordMoveRange[0] + (wordMoveRange[1] - wordMoveRange[0]) / 3;
    // const animationTriggerThreshold =
    //   introAnimationEnd + 0.075;
    return {
      slideRangePerWindow,
      animationTriggerThreshold,
      imageSlideRange: [
        Math.max(index * slideRangePerWindow - wordOverlap, 0),
        Math.min(
          (index + 1) * slideRangePerWindow + wordOverlap,
          introAnimationEnd - wordOverlap
        ),
      ],
    };
  }, [numberOfWords, index, introAnimationEnd, wordMoveRange]);

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

  const x = useSpring(0);

  useEffect(() => {
    x.set(lastWordAnimationVisible ? 15 : 0);
  }, [lastWordAnimationVisible, x]);

  return (
    <LayoutGroup>
      <StyledSingleWord style={{ y, opacity }} ref={wordRef}>
        {animationOutGeometry ? (
          <WordMoveOver
            scrollProgress={scrollProgress}
            range={wordMoveRange}
            animationGeometry={animationOutGeometry}
          >
            {children}
          </WordMoveOver>
        ) : index === numberOfWords - 1 ? (
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
  border: clamp(2px, 0.5vw, 3px) solid var(--text1);
  transform-origin: 0 50%;
  backdrop-filter: blur(3px);
  position: absolute;
  border-radius: clamp(4px, 1vw, 8px);

  & + .light-bulb {
    position: absolute;
    top: calc(-50% - 8px);
    right: -20%;
    font-size: clamp(
      12px,
      3vw,
      48px
    ); // half of defined font size in WordAnimation
  }
`;

const lastWordAnimationVariants = {
  hidden: {
    height: "70%",
    width: "4%",
    left: "5%",
    background: theme.text1,
  },
  visible: (isMobile: any) => ({
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
  }),
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};
const lightBulbAnimationVariants = {
  hidden: {
    scale: 0.9,
    y: 20,
    opacity: 0,
  },
  visible: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.5,
      ease: "easeOut",
      y: {
        ease: "easeOut",
      },
      opacity: {
        ease: "linear",
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
  const { isMobile } = useViewport(480);
  return (
    <>
      <StyledLastWordAnimation
        initial="hidden"
        animate="visible"
        exit="exit"
        custom={isMobile}
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
  const scale = useTransform(scrollProgress, range, [1, 0.5]);
  const opacity = useTransform(scrollProgress, range, [1, 0]);
  return <motion.span style={{ scale, opacity }}>{children}</motion.span>;
};

interface WordMoveOverProps extends WordAnimateOutProps {
  animationGeometry: AnimationGeometry;
}
const WordMoveOver: React.FC<WordMoveOverProps> = ({
  children,
  scrollProgress,
  range,
  animationGeometry,
}) => {
  const letters = String(children).split("");
  return (
    <motion.span style={{ width: "200px" }}>
      {letters.map((letter, index) => (
        <WordMoveOverLetter
          key={index}
          scrollProgress={scrollProgress}
          range={range}
          index={index}
          animationGeometry={animationGeometry}
        >
          {letter}
        </WordMoveOverLetter>
      ))}
    </motion.span>
  );
};

interface WordMoveOverLetterProps extends WordMoveOverProps {
  index: number;
}
const WordMoveOverLetter: React.FC<WordMoveOverLetterProps> = ({
  children,
  scrollProgress,
  range,
  index,
  animationGeometry,
}) => {
  const staggerOffset = index * 0.02;
  const rangeWithStagger = range.map((r) => r - staggerOffset);
  const rangeProgress = useTransform(scrollProgress, rangeWithStagger, [0, 1]);

  const fontSize = useTransform(rangeProgress, [0.1, 0.9], ["100%", "50%"], {
    ease: [easeInOut],
  });
  const rotateY = useTransform(rangeProgress, [0.1, 0.5, 0.9], [0, 45, 0], {
    ease: easeInOut,
  });
  const x = useTransform(
    rangeProgress,
    [0, 1],
    [0, animationGeometry.distanceX],
    { ease: [easeInOut] }
  );
  const y = useTransform(
    rangeProgress,
    [0.25, 0.75],
    [0, animationGeometry.distanceY],
    { ease: [easeInOut] }
  );
  const rotateZ = useTransform(rangeProgress, [0.2, 0.5, 0.8], [0, -13, 0], {
    ease: easeInOut,
  });

  return (
    <motion.span
      style={{
        x,
        y,
        rotateZ,
        rotateY,
        fontSize,
        display: "inline-block",
        perspective: 1000,
      }}
    >
      {children}
    </motion.span>
  );
};
