import { Curtain, Header, MainColumn } from "components/layout";
import {
  AnimatedLetters,
  ContactCircle,
  CopyToClipboard,
  ExternalButton,
  Snackbar,
  Underline,
} from "components/shared";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { copyToClipboard } from "helpers";
import { useViewport } from "hooks";
import { rgba } from "polished";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { pageContentExit, theme } from "styles";
import { EMAIL } from "ts";

const StyledContactPage = styled(motion.div)`
  width: 100vw;
  min-height: 100vh;
  margin: auto 0;
  background: ${({ theme }) => theme.light};
  color: var(--dark);
  overflow: hidden;
  position: relative;
  z-index: 0;
  display: grid;
  place-items: center;
  .background {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    z-index: 1;
    &-shape {
      width: clamp(1px, min(70vw, 70vh), 520px);
      aspect-ratio: 1;
      background: ${rgba("white", 0.7)};
      border-radius: clamp(1px, 13vw, 90px);
      z-index: 1;
      margin-top: 3rem;
    }
  }
`;

const contentVariants: Variants = {
  pageLoad: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const Content = styled(motion.section)`
  padding-top: 2vh;
  position: relative;
  z-index: 2;
  max-width: 1100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  p {
    margin-bottom: 28px;
  }
  .text {
    flex-grow: 1;
    padding-right: 4rem;
    margin-top: 3rem;
    @media (${({ theme }) => theme.bp.small}) {
      margin: 0;
    }

    & > div {
      overflow-y: hidden;
    }
  }
  .shape {
    margin-top: 3rem;
    margin-right: clamp(0.2rem, 2vw, 1rem);
    width: clamp(100px, 32vw, 366px);
    display: none;
    @media (${({ theme }) => theme.bp.small}) {
      display: block;
    }
  }
`;

const Heading = styled(motion.h1)`
  position: relative;
  font-size: clamp(3rem, 15vw, 4rem);
  font-weight: 800;
  margin-bottom: 3rem;

  span {
    position: relative;
    z-index: 1;
  }

  svg {
    position: absolute;
    bottom: -5px;
    left: -5px;
    z-index: 0;
  }
`;

const button1Variants: Variants = {
  pageEntry: {
    scaleX: 0,
  },
  pageLoad: {
    scaleX: 1,
    originX: "left",
    transition: {
      type: "tween",
      duration: 1,
      ease: theme.easing as any,
      delayChildren: 0.85,
    },
  },
};

const textVariants: Variants = {
  pageEntry: {
    y: "130%",
  },
  pageLoad: {
    y: 0,
    transition: {
      type: "tween",
      duration: 1,
      ease: theme.easing as any,
    },
  },
};

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const Contact = () => {
  const [showEmailCopied, setShowEmailCopied] = useState<boolean>(false);
  const [showEmailSVG, setShowEmailSVG] = useState<boolean>(false);

  /** Wheter the circle is visible below small breakpoint. */
  const { isMobile } = useViewport(720);

  const onCopyToClipboard = () => {
    copyToClipboard(EMAIL);
    setShowEmailCopied(true);
  };

  useEffect(() => {
    if (!showEmailCopied) return;
    const timeout = setTimeout(() => {
      setShowEmailCopied(false);
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [showEmailCopied]);

  return (
    <>
      <Curtain />
      <Header />
      <StyledContactPage variants={{ pageExit: pageContentExit }}>
        <MainColumn>
          <Content variants={contentVariants}>
            <div className="text">
              <Heading>
                <AnimatedLetters>contact</AnimatedLetters>
                <Underline
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: {
                      type: "tween",
                      delay: 1.2,
                      duration: 0.8,
                      ease: theme.easing,
                    },
                    opacity: {
                      delay: 1.1,
                      duration: 0.2,
                    },
                  }}
                />
              </Heading>
              <div>
                <motion.p variants={textVariants}>
                  Convinced by the portfolio? Questions about me? Whatever it
                  is, my inbox is open to you. <br /> Feel free to contact me
                  via mail.
                </motion.p>
              </div>
              <Buttons>
                <a href={`mailto:${EMAIL}?subject=Let's work together!`}>
                  <ExternalButton
                    variants={button1Variants}
                    whileTap={{ scale: 0.95, originX: "center" }}
                    onHoverStart={() => {
                      setShowEmailSVG(true);
                    }}
                    onHoverEnd={() => {
                      setShowEmailSVG(false);
                    }}
                  >
                    <motion.span
                      variants={{
                        pageEntry: { opacity: 0, y: 3 },
                        pageLoad: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.25,
                            easings: theme.easing,
                          },
                        },
                      }}
                    >
                      {EMAIL}
                    </motion.span>
                  </ExternalButton>
                </a>
                <CopyToClipboard
                  onTap={() => !showEmailCopied && onCopyToClipboard()}
                  variants={{
                    pageEntry: { opacity: 0, scale: 0.9 },
                    pageLoad: {
                      opacity: 1,
                      scale: 1,
                      transition: { delay: 1.7, duration: 0.3 },
                    },
                  }}
                  whileHover={{ scale: 1 }} //somehow fixes stuck tap state
                  whileTap={{ scale: 0.95 }}
                />
              </Buttons>
            </div>
            <motion.div
              className="shape"
              variants={{ pageExit: { x: -85 } }} //horizontal parallax to pageExit shift
              transition={{
                x: { type: "tween", ease: theme.easing, duration: 0.5 },
              }}
            >
              <ContactCircle
                initial={{
                  pathLength: 0,
                  opacity: 0,
                  rotate: -180,
                }}
                animate={{
                  pathLength: 1,
                  opacity: 1,
                  rotate: 0,
                  fillOpacity: showEmailCopied || showEmailSVG ? 1 : 0,
                }}
                transition={{
                  pathLength: {
                    type: "tween",
                    delay: 1.5,
                    duration: 1.2,
                    ease: theme.easing,
                  },
                  rotate: {
                    delay: 1.4,
                    duration: 1,
                  },
                  opacity: {
                    delay: 1.4,
                    duration: 0.7,
                  },
                  fillOpacity: {
                    delay: !showEmailSVG && !showEmailCopied ? 0.6 : 0,
                    duration: !showEmailSVG && !showEmailCopied ? 0.8 : 0.2,
                  },
                }}
                mode={
                  showEmailCopied
                    ? "clipboard"
                    : showEmailSVG
                    ? "emailSVG"
                    : undefined
                }
              />
            </motion.div>
          </Content>
        </MainColumn>
        <div className="background">
          <motion.div
            variants={{
              pageEntry: {
                rotate: -3,
                opacity: 0.3,
              },
              pageLoad: {
                rotate: 0,
                opacity: 1,
              },
            }}
            transition={{
              type: "tween",
              delay: 3,
              duration: 2,
              easings: theme.easing as any,
            }}
            className="background-shape"
          />
        </div>
        <AnimatePresence>
          {isMobile && showEmailCopied && (
            <Snackbar>Email was copied to clipboard!</Snackbar>
          )}
        </AnimatePresence>
      </StyledContactPage>
    </>
  );
};

export default Contact;
