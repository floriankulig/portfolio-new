import { ArrowButton, TransitionLink } from "components/shared";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useTime,
  useTransform,
  Variants,
} from "framer-motion";
import { useViewport } from "hooks";
import { lighten, rgba } from "polished";
import { useState } from "react";
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
    letter-spacing: -5.5%;
    line-height: 1.05;
    width: 100%;
    white-space: pre-line;
    max-width: 15ch;
    position: relative;
    padding-block: 0 0.1em;

    background: var(--text1);
    background-image: radial-gradient(
      circle at 57.5% 10%,
      ${({ theme }) => rgba(theme.text3, 0.45)},
      transparent 40%
    );
    background-clip: text;
    color: transparent;

    @media (max-width: 420px) {
      letter-spacing: -4.5%;
      font-size: 15vw;
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
    <StyledHeroSection className="main-col">
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
