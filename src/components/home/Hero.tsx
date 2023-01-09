import { SectionHeading } from "components/layout";
import {
  AnimatedLetters,
  AnimatedWords,
  Button,
  HeroX,
  HideOverflow,
} from "components/shared";
import {
  motion,
  Transition,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import { useViewport } from "hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "styles";
import { EASING } from "ts";

const StyledHeroSection = styled(motion.section)`
  background: var(--light);
  width: 100vw;
  position: relative;
  ${({ theme }) => theme.grid}
  & > div.content {
    ${({ theme }) => theme.gridElement.fullWidth}
    box-sizing: content-box;
    z-index: 1;
  }
`;
const StyledHeroBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  & > div {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

const StyledShape = styled(motion.div)`
  width: 100%;
  grid-column: -3/-1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    max-width: 80%;
    margin: 0 auto;
  }
`;

const SVGBackground = styled(motion.div)`
  width: 100%;
  position: absolute;
  background: white;
  aspect-ratio: 1;
  border-radius: 50%;
`;

const StyledHeroStickyContainer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  max-height: 1000px;
  width: 100%;
  ${({ theme }) => theme.grid}
  & > div {
    ${({ theme }) => theme.gridElement.fullWidth}
    width: 100%;
    padding: 150px 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    justify-items: center;
    //If background is detached
    & > ${SVGBackground} {
      width: min(80vw, 80vh);
      @media (${({ theme }) => theme.bp.medium}) {
        width: min(calc(100vw / 1.618), calc(100vh / 1.618));
      }
      grid-column: 1/-1;
    }
  }
`;

const HeroText = styled(motion.div)`
  height: 100vh;
  max-height: 1000px;
  color: var(--dark);
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    width: 100%;
    padding: 150px 0;
    display: flex;
    flex-direction: column;
  }
`;

const Heading = styled(motion.h1)`
  font-size: clamp(1.6rem, 8vw, 2.65rem);
  line-height: 1.55;
  margin-top: 150px span {
    display: inline-block;
  }
`;
const Intro = styled(motion.div)`
  margin-top: 0.65rem;
  margin-bottom: 2.65rem;

  p {
    font-size: clamp(0.8rem, 5vw, 1rem);
    line-height: 1.9;
    max-width: 50ch;
    overflow: hidden;
  }
  span {
    display: block;
  }
`;

const StyledHeroAbout = styled(motion.div)`
  margin: 300px 0 350px;
  display: flex;
  flex-direction: column;
  h2 {
    margin-bottom: 2rem;
  }
  .text {
    & > p {
      max-width: 47ch;
      @media (${({ theme }) => theme.bp.medium}) {
        max-width: min(47ch, 55%);
      }
    }
    overflow: hidden;
    margin-bottom: 1rem;
    &:nth-last-of-type(2) {
      margin-bottom: 2.3rem;
    }
  }
`;

const revealTransition: Transition = {
  type: "tween",
  easings: EASING,
  duration: 0.8,
};

const reveal: Variants = {
  pageEntry: {
    y: "100%",
  },
  pageLoad: {
    y: 0,
    transition: revealTransition,
  },
};

const viewReveal: Variants = {
  inView: {
    y: 0,
    scale: 1,
    originX: "left",
    transition: { ease: theme.easing, duration: 0.5 },
  },
  initial: {
    scale: 0.95,
    y: "100%",
  },
};

const svgBackgroundVariants: Variants = {
  pageEntry: {
    opacity: 0,
  },
  pageLoad: {
    opacity: 0.7,
  },
};

export const Hero = () => {
  const [backgroundAttached, setBackgroundAttached] = useState<boolean>(false);
  const [hasBeenScrolled, setHasBeenScrolled] = useState<boolean>(false);
  const { isMobile } = useViewport();
  const isDesktop = !isMobile;
  const router = useRouter();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const dampedScrollProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 15,
    restDelta: 0.001,
  });
  const shapeScale = useTransform(dampedScrollProgress, [0, 0.75], [1, 0.75]);
  const shapeBackgroundScale = useTransform(
    dampedScrollProgress,
    [0.1, 0.8],
    [1.4, 1]
  );
  const shapeDetachedBackgroundOffset = useTransform(
    dampedScrollProgress,
    isDesktop ? [0, 0.1] : [0, 0.25, 0.5, 0.75],
    isDesktop ? [0, 100] : [0, -10, -3, 5]
  );
  const shapeOffset = useTransform(
    dampedScrollProgress,
    [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.85],
    [0, 15, 35, 55, 60, 55, 30, 10, 0]
  );

  useEffect(() => {
    const unsub = scrollYProgress.on("change", () => {
      setBackgroundAttached(scrollYProgress.get() > 0.05);

      if (
        !hasBeenScrolled &&
        scrollYProgress.get() <= 0.05 &&
        scrollYProgress.getPrevious() > 0.05
      ) {
        setHasBeenScrolled(true);
      }
    });

    return () => unsub();
  }, [scrollYProgress, hasBeenScrolled]);

  return (
    <StyledHeroSection ref={sectionRef}>
      <div className="content">
        <HeroText
          variants={{
            pageLoad: {
              transition: {
                staggerChildren: 0.4,
              },
            },
          }}
          layout
        >
          <div>
            <Heading
              variants={{
                pageLoad: {
                  transition: {
                    staggerChildren: 0.03,
                  },
                },
              }}
            >
              <AnimatedLetters variants={reveal}>
                creative designer
              </AnimatedLetters>
              <AnimatedLetters variants={reveal}>& developer</AnimatedLetters>
            </Heading>
            <Intro
              variants={{
                pageLoad: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              <p>
                <motion.span variants={reveal}>
                  Hi, I’m Florian Kulig. An 18-year-old developer with a passion
                  for
                </motion.span>
              </p>
              <p>
                <motion.span variants={reveal}>
                  UX-/ UI-Design based in the south of Germany.
                </motion.span>
              </p>
            </Intro>
            <div style={{ overflow: "hidden" }}>
              <motion.div variants={reveal}>
                <Link href="/work">
                  <Button>VIEW MY WORK</Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </HeroText>
        <StyledHeroAbout
          initial="initial"
          whileInView="inView"
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            staggerChildren: 0.1,
          }}
        >
          <SectionHeading
            variants={{
              inView: {
                transition: { staggerChildren: 0.05 },
              },
            }}
          >
            <AnimatedWords variants={viewReveal}>about me</AnimatedWords>
          </SectionHeading>
          <div className="text">
            <motion.p variants={viewReveal}>
              Hi, I’m Flo. I study computer science in Stuttgart, Germany and do
              some web development projects on the side.
            </motion.p>
          </div>
          <div className="text">
            <motion.p variants={viewReveal}>
              As you might have noticed, I have a big passion for good and clean
              design. I strongly believe that the modern web cannot live without
              an engaging user experience.
            </motion.p>
          </div>
          <HideOverflow>
            <motion.div variants={viewReveal}>
              <Button onTap={() => router.push("/about")}>learn more</Button>
            </motion.div>
          </HideOverflow>
        </StyledHeroAbout>
      </div>
      <StyledHeroBackground>
        <div>
          <StyledHeroStickyContainer>
            <div>
              {((!backgroundAttached && isDesktop) || !isDesktop) && (
                <SVGBackground
                  layoutId="home-hero-svg-background"
                  style={{ x: shapeDetachedBackgroundOffset }}
                  variants={
                    !hasBeenScrolled ? svgBackgroundVariants : undefined
                  }
                  transition={{
                    layout: {
                      duration: 1.2,
                      ease: "backOut",
                    },
                    opacity: {
                      duration: 2,
                      delay: 2.5,
                    },
                  }}
                />
              )}
              {isDesktop && (
                <StyledShape style={{ x: shapeOffset }}>
                  {backgroundAttached && (
                    <>
                      <SVGBackground
                        layoutId="home-hero-svg-background"
                        style={{
                          scale: shapeBackgroundScale,
                        }}
                        transition={{
                          layout: {
                            duration: 0.8,
                            ease: "backOut",
                          },
                          opacity: {
                            duration: 2,
                            delay: 3,
                          },
                        }}
                      />
                    </>
                  )}
                  <HeroX style={{ scale: shapeScale }} />
                </StyledShape>
              )}
            </div>
          </StyledHeroStickyContainer>
        </div>
      </StyledHeroBackground>
    </StyledHeroSection>
  );
};
