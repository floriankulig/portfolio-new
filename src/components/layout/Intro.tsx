import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { rgba } from "polished";
import { theme } from "styles";

const StyledIntro = styled.div`
  background: white;
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Name = styled(motion.h1)`
  font-size: 1.3rem;
  line-height: 1.5;
  font-weight: 400;
  color: var(--dark);
  text-align: center;
  padding-right: 0.2rem;
  overflow: hidden;
  span {
    display: inline-block;
  }
`;

const letterVariants: Variants = {
  initial: {
    opacity: 0.5,
    y: "100%",
  },
  animate: (distanceFromMiddle) => ({
    opacity: 1,
    y: 0,
    transition: {
      y: {
        duration: 0.5,
        easings: theme.easing,
        delay: distanceFromMiddle * 0.03 + 0.75,
      },
      opacity: {
        duration: 0.4,
        delay: distanceFromMiddle * 0.03 + 0.75,
      },
    },
  }),
};

const ViewHint = styled(motion.p)`
  font-weight: 300;
  font-style: italic;
  position: absolute;
  color: ${({ theme }) => rgba(theme.dark, 0.2)};
  bottom: 2rem;
  width: 100%;
  text-align: center;
`;

interface IntroProps {
  setHasFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Intro: React.FC<IntroProps> = ({ setHasFinished }) => {
  const [animationStep, setAnimationStep] = useState<number>(0);
  const [showText, setShowText] = useState<boolean>(true);
  const nameArray = Array.from("Florian Kulig");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(false);
    }, 6000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledIntro>
      {animationStep === 0 && (
        <>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              animate: {
                transition: {
                  delayChildren: 0.5,
                },
              },
            }}
          >
            <Name animate={{ opacity: showText ? 1 : 0 }}>
              {nameArray.map((letter, i) => {
                const distanceFromMiddle = Math.abs(i - nameArray.length / 2);
                return (
                  <motion.span
                    key={i + "-" + { letter }}
                    variants={letterVariants}
                    custom={distanceFromMiddle}
                  >
                    {letter === " " ? <b>&nbsp;</b> : letter}
                  </motion.span>
                );
              })}
            </Name>
            <Loader onFinish={() => setAnimationStep((step) => step + 1)} />
          </motion.div>
          <AnimatePresence>
            {showText && (
              <ViewHint
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 1, delay: 1.3 },
                }}
                exit={{ opacity: 0 }}
              >
                This experience is best on desktop.
              </ViewHint>
            )}
          </AnimatePresence>
        </>
      )}
      {animationStep === 1 && (
        <WindowFrame
          onAnimationComplete={() => setHasFinished(true)}
          initial={{
            height: "0px",
            y: 22,
            scaleX: 1 / 1.618,
            scaleY: (1 / 1.618) * (1 - 1 / 6),
            borderRadius: 25,
          }}
          animate={{
            height: "100%",
            y: 0,
            scaleX: 1 / 1.618,
            scaleY: 1 / 1.618,
            borderRadius: 25,
          }}
          transition={{
            duration: 0.8,
            ease: theme.easing,
          }}
        ></WindowFrame>
      )}
    </StyledIntro>
  );
};

const WindowFrame = styled(motion.div)`
  background: var(--light);
  height: 100vh;
  width: 100vw;
  transform: scale(1/1.618);
  box-shadow: 0px 0px 0px 6px ${({ theme }) => rgba(theme.dark, 1)};
`;

const StyledLoader = styled(motion.div)`
  height: 6px;
  width: clamp(1px, 70vw, 290px);
  margin-top: 10px;
  border-radius: 3px;
  overflow: hidden;
  background: var(--grey);

  div {
    background: var(--dark);
    height: 100%;
    width: 100%;
    border-radius: 3px;
  }
`;

interface LoaderProps {
  onFinish: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onFinish }) => {
  return (
    <StyledLoader
      variants={{
        initial: {
          scaleX: 0,
        },
        animate: {
          scaleX: 1,
          width: "calc(100vw/1.618)",
          transition: {
            delayChildren: 1.5,
            scaleX: {
              duration: 1,
              ease: theme.easing,
            },
            width: {
              when: "afterChildren",
              duration: 0.8,
              delay: 6,
              ease: theme.easing,
            },
          },
        },
      }}
      onAnimationComplete={onFinish}
    >
      <motion.div
        layoutId="loader-window"
        variants={{
          initial: { scaleX: 0 },
          animate: {
            scaleX: [0, 0.2, 0.7, 1],
            originX: "left",
            transition: {
              duration: 3,
              easings: theme.easing,
            },
          },
        }}
      ></motion.div>
    </StyledLoader>
  );
};
