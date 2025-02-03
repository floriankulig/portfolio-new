import { Curtain } from "components/layout/Curtain";
import { StaticHeader } from "components/layout/header";
import {
  MainColumn,
  ContactCircle,
  CopyToClipboard,
  ExternalButton,
  Snackbar,
  Underline,
  AnimatedLetters,
} from "components/shared";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { copyToClipboard } from "helpers";
import { useViewport } from "hooks";
import { rgba } from "polished";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { pageContentExit, theme } from "styles";
import { EMAIL } from "ts/content";

const StyledContactPage = styled(motion.div)`
  width: 100vw;
  min-height: calc(100vh - 46px);
  overflow: hidden;
  position: relative;
  z-index: 0;
  display: grid;
  place-items: center;

  ${MainColumn} {
    display: grid;
    place-items: center;
    margin: 0 auto;
    padding: 0;
    width: clamp(1px, 90%, 85rem);
    @media (${({ theme }) => theme.bp.small}) {
      width: clamp(1px, 80%, 85rem);
    }
    @media (${({ theme }) => theme.bp.medium}) {
      width: clamp(1px, 70%, 85rem);
    }
  }

  .background {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    pointer-events: none;
    z-index: 1;
    &-shape {
      width: clamp(1px, min(70vw, 70vh), 520px);
      aspect-ratio: 1;
      background: ${rgba("white", 0.7)};
      border-radius: clamp(1px, 13vw, 90px);
      z-index: 1;
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
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 950px;
  display: flex;
  justify-content: space-between;
  gap: clamp(3rem, 3vw, 4.5rem);
  align-items: center;
  p {
    margin-bottom: 1.75rem;
    max-width: 35ch;
    font-family: var(--jakarta);
    font-size: clamp(1rem, 1.5vw, 1.125rem);
    line-height: 1.618;
  }
  // left side
  .text > div {
    overflow-y: hidden;
  }
  .shape {
    padding-top: 2rem;
    width: clamp(100px, 32vw, 366px);
    display: none;
    @media (${({ theme }) => theme.bp.small}) {
      display: block;
    }
  }
`;

const Heading = styled(motion.h1)`
  position: relative;
  font-size: clamp(3.3rem, 15vw, 4.5rem);
  font-weight: 800;
  width: fit-content;
  margin-bottom: 2.5rem;
  letter-spacing: -0.035em;

  span {
    position: relative;
    z-index: 1;
  }

  svg {
    position: absolute;
    bottom: 8%;
    width: 110%;
    left: -2%;
    z-index: 0;
  }
`;

const button1Variants: Variants = {
  pageEntry: {
    scaleX: 0,
    originX: "left",
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
  gap: 1.125rem;
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
      <StaticHeader />
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
