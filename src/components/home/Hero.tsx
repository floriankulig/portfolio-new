import { ArrowButton, TransitionLink } from "components/shared";
import {
  AnimatePresence,
  motion,
  Transition,
  useMotionValueEvent,
  useScroll,
  useTime,
  useTransform,
  Variants,
} from "framer-motion";
import { useViewport } from "hooks";
import { lighten, rgba } from "polished";
import { useRef, useState } from "react";
import { ArrowDown } from "react-feather";
import styled from "styled-components";
import { theme } from "styles";
import { EMAIL, YEARS_OF_EXPERIENCE } from "ts/content";

const StyledHeroSection = styled.section`
  --alignment: left;
  --textColor: ${({ theme }) => lighten(0.3, theme.text2)};
  @media (min-width: 420px) {
    --alignment: center;
  }
  min-height: 100lvh;
  position: relative;
  padding-block: max(20vh, 100px);
  display: flex;
  flex-direction: column;
  align-items: var(--alignment);
  justify-content: center;
  gap: 16px;

  & > * {
    text-align: var(--alignment);
  }

  h1 {
    font-size: clamp(2.875rem, 10.25vw, 5.5rem);
    font-weight: 500;
    letter-spacing: -0.055em;
    line-height: 1.05;
    width: 100%;
    white-space: pre-line;
    max-width: 15ch;
    position: relative;
    padding-block: 0 0.1em;

    background: var(--text1);
    --circleX: 57.5%;
    background-image: radial-gradient(
      circle at var(--circleX) 10%,
      ${({ theme }) => rgba(theme.text3, 0.45)},
      transparent 40%
    );
    background-clip: text;
    color: transparent;

    @media (max-width: 420px) {
      --circleX: 45%;
      letter-spacing: -0.045em;
      font-size: 15vw;
    }
  }

  p {
    width: 100%;
    max-width: 55ch;
    letter-spacing: 0.005em;
    font-family: var(--jakarta);
    color: var(--textColor);
    max-width: 53ch;
    @media (max-width: 720px) {
      max-width: 45ch;
    }
    padding-block: 0.25em 1em;
    word-break: keep-all;
    b {
      font-weight: 600;
      color: var(--text2);
    }
  }
`;

const StyledButtons = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: clamp(1rem, 5vw, 2rem);

  a {
    text-decoration: underline;
    font-weight: 500;
    padding: 0.5em 1em;
    font-family: var(--jakarta);
    white-space: nowrap;
    flex-shrink: 0;
    flex-grow: 0;
  }
`;

export const Hero = () => {
  const { isMobile } = useViewport(720);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrolled(latest > 0.025);
  });
  const mobileDescription = (
    <p>
      I&apos;m a Software Engineer with{" "}
      <b>{YEARS_OF_EXPERIENCE} years of experience.</b> While crafting intuitive
      user interfaces is my forte, my driving force is{" "}
      <b>creating solutions that deliver tangible value. </b>
    </p>
  );
  const description = (
    <p>
      Based in South-Germany, I&apos;m a Software Engineer with{" "}
      <b>{YEARS_OF_EXPERIENCE} years of hands-on development experience.</b>{" "}
      While crafting intuitive user interfaces is my forte, my driving force is{" "}
      <b>creating solutions that deliver tangible value </b>– whether it&apos;s
      streamlining workflows or enhancing user experiences.
    </p>
  );
  return (
    <StyledHeroSection className="main-col" ref={sectionRef}>
      <TextAnimation />
      <h1>
        Creative <br /> Software Engineer
      </h1>
      {isMobile ? mobileDescription : description}
      <StyledButtons>
        <TransitionLink href="/projects">
          <ArrowButton>View Projects</ArrowButton>
        </TransitionLink>
        <a href={`mailto:${EMAIL}?subject=Let's work together!`}>Reach out</a>
      </StyledButtons>
      <AnimatePresence>{!scrolled && <ScrollingIndicator />}</AnimatePresence>
    </StyledHeroSection>
  );
};

const StyledTextAnimation = styled(motion.div)`
  display: flex;
  justify-content: var(--alignment);
  overflow: hidden;
  font-size: 0.875rem;
  color: var(--textColor);
  & > span {
    display: inline-block;
    overflow: hidden;
    line-height: 1.5;
    white-space: nowrap;
  }
`;

const sentenceVariants: Variants = {
  animate: {
    transition: {
      delayChildren: 0.025,
      staggerChildren: 0.0125,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.0125,
    },
  },
};

const letterVariants: Variants = {
  initial: {
    y: "100%",
  },
  animate: {
    y: 0,
    transition: {
      ease: theme.easing,
      duration: 0.6,
    },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: {
      y: {
        ease: theme.easing,
        duration: 0.6,
      },
    },
  },
};

const TextAnimation = () => {
  const sentences = [
    "Driving Experiences.",
    "Pushing Excellence.",
    "Engineering Brilliance.",
  ];
  const changeSeconds = 5;
  const time = useTime();
  const counter = useTransform(time, (latest) =>
    Math.floor(latest / (1000 * changeSeconds))
  );
  useMotionValueEvent(counter, "change", (latest) => {
    setSentence(sentences[latest % sentences.length]);
  });
  const [sentence, setSentence] = useState(sentences[0]);
  const letters = sentence.split("");
  return (
    <StyledTextAnimation>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={sentence}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={sentenceVariants}
        >
          {letters.map((letter, index) => {
            const id = `${sentence}-${index}`;
            return (
              <motion.span
                key={id}
                style={{ display: "inline-block" }}
                variants={letterVariants}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </StyledTextAnimation>
  );
};

const StyledScrollIndicator = styled(motion.div)`
  --padding: min(16px, 5vw);
  --size: clamp(40px, 9vw, 56px);
  position: fixed;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  left: var(--padding);
  top: calc(min(100%, 100dvh) - var(--padding) - var(--size));
  display: grid;
  place-items: center;
  color: var(--text2);
  background-color: ${({ theme }) => rgba(theme.bg3, 0.6)};
  border: 1px solid ${({ theme }) => rgba(theme.bg3, 0.5)};
  backdrop-filter: blur(8px);
  z-index: 10;
  span {
    position: relative;
    display: grid;
    place-items: center;
    span {
      perspective: 100px;
      position: absolute;
      svg {
        --svgSize: calc(var(--size) / 1.618);
        width: var(--svgSize);
        height: var(--svgSize);
      }
    }
  }
`;

const indicatorVariants: Variants = {
  initial: {
    scale: 0,
    originY: "bottom",
  },
  animate: {
    scale: 1,
    originY: "bottom",
    transition: {
      ease: theme.easing,
      duration: 0.45,
      delayChildren: 0.4,
    },
  },
  exit: {
    scale: 0,
    originY: "top",
    transition: {
      delay: 0.15,
      ease: theme.easing,
      duration: 0.35,
    },
  },
};

const arrowTransition: Transition = {
  repeat: Infinity,
  delay: 2,
  repeatDelay: 0.75,
  ease: theme.easing,
  duration: 1.5,
};

const arrowVariants: Variants = {
  initial: (custom) => ({
    y: custom ? -24 : 0,
    rotateX: custom ? -45 : 0,
    scale: custom ? 0.6 : 1,
    opacity: custom ? 0 : 1,
  }),
  animate: (custom) => ({
    y: custom ? 0 : 24,
    rotateX: custom ? 0 : 45,
    scale: custom ? 1 : 0,
    opacity: custom ? 1 : 0,
    transition: {
      y: arrowTransition,
      scale: arrowTransition,
      rotateX: arrowTransition,
      opacity: {
        ...arrowTransition,
        ease: "easeInOut",
        duration: arrowTransition.duration * 0.75,
        repeatDelay:
          arrowTransition.repeatDelay! + arrowTransition.duration * 0.25,
      },
    },
  }),
};

const transitionVariants: Variants = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    transition: {
      type: "spring",
      damping: 13,
      stiffness: 120,
    },
  },
  exit: {
    scale: 0,
  },
};

const ScrollingIndicator: React.FC = () => {
  const Arrow = <ArrowDown size={32} strokeWidth={1.25} strokeLinecap="butt" />;

  return (
    <StyledScrollIndicator
      initial="initial"
      animate="animate"
      exit="exit"
      variants={indicatorVariants}
    >
      <motion.span variants={transitionVariants}>
        <motion.span variants={arrowVariants} custom={true}>
          {Arrow}
        </motion.span>
        <motion.span variants={arrowVariants}>{Arrow}</motion.span>
      </motion.span>
    </StyledScrollIndicator>
  );
};
