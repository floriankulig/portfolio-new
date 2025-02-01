import { ArrowButton, ExternalButton, TransitionLink } from "components/shared";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useTime,
  useTransform,
  Variants,
} from "framer-motion";
import { useViewport } from "hooks";
import { lighten } from "polished";
import { useState } from "react";
import styled from "styled-components";
import { theme } from "styles";
import { EMAIL } from "ts";

const StyledHeroSection = styled.section`
  --alignment: left;
  --textColor: ${({ theme }) => lighten(0.3, theme.text2)};
  @media (min-width: 420px) {
    --alignment: center;
  }
  min-height: 100lvh;
  padding-block: 25vh;
  display: flex;
  flex-direction: column;
  align-items: var(--alignment);
  justify-content: center;
  gap: 20px;

  & > * {
    text-align: var(--alignment);
  }

  h1 {
    font-size: clamp(2.875rem, 10vw, 5.5rem);
    font-weight: 600;
    letter-spacing: -5.5%;
    line-height: 1.05;
    width: 100%;
    white-space: pre-line;
    max-width: 15ch;
    position: relative;

    span {
      //GRADIENT
      inset: 0;
      position: absolute;
      opacity: 0.15;
      /* z-index: -1; */
      /* background: #396dcf; */
      background: linear-gradient(40deg, #ffb347, #ff6b6b, #4ea8de, #c138ca);
      background-clip: text;
      color: transparent;
      filter: blur(0.5rem);
      user-select: none;
      pointer-events: none;
    }
  }

  p {
    width: 100%;
    max-width: 55ch;
    letter-spacing: 0.5%;
    font-family: var(--jakarta);
    color: var(--textColor);
    max-width: 53ch;
    @media (max-width: 720px) {
      max-width: 45ch;
    }
    padding-block: 0.5em;
    b {
      font-weight: 700;
      color: var(--text2);
      opacity: 1;
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
  const mobileDescription = (
    <p>
      I&apos;m a Software Engineer with <b>5 years of experience.</b> While
      crafting intuitive user interfaces is my forte, my driving force is{" "}
      <b>creating solutions that deliver tangible value. </b>
    </p>
  );
  const description = (
    <p>
      Based in South-Germany, I&apos;m a Software Engineer with{" "}
      <b>5 years of hands-on development experience.</b> While crafting
      intuitive user interfaces is my forte, my driving force is{" "}
      <b>creating solutions that deliver tangible value </b>– whether it&apos;s
      streamlining workflows or enhancing user experiences.
    </p>
  );
  return (
    <StyledHeroSection className="main-col">
      <TextAnimation />
      <h1 className="balanced">
        <span>
          Creative 👨🏽‍💻
          <br /> Software Engineer
        </span>
        Creative 👨🏽‍💻
        <br /> Software Engineer
      </h1>
      {isMobile ? mobileDescription : description}
      <StyledButtons>
        <TransitionLink href="/projects">
          <ArrowButton>View Projects</ArrowButton>
        </TransitionLink>
        <a href={`mailto:${EMAIL}?subject=Let's work together!`}>Reach out</a>
      </StyledButtons>
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
      delayChildren: 0.05,
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

export const TextAnimation = () => {
  const sentences = [
    "Driving Experiences.",
    "Pushing Excellence.",
    "Engineering Brilliance.",
  ];
  const changeSeconds = 6;
  const time = useTime();
  const counter = useTransform(time, (latest) =>
    Math.floor(latest / (1000 * changeSeconds))
  );
  useMotionValueEvent(counter, "change", (latest) => {
    console.log(latest);
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
