import { AnimatePresence, motion, Variants } from "framer-motion";
import { Router } from "next/router";
import { rgba } from "polished";
import { useState } from "react";
import styled, { css } from "styled-components";
import { theme } from "styles";
import { StyledCurtainContainer } from "./Curtain";

interface StyledPageLoaderProps {
  $appHasLoaded: boolean;
}

const StyledPageLoader = styled(motion.div)<StyledPageLoaderProps>`
  display: block;
  min-height: 100dvh;
  animation: shadow 1.8s 4.5s forwards;
  animation-timing-function: cubic-bezier(0.6, 0.01, -0.05, 0.95);
  box-shadow: 0px 0px 0px 6px ${({ theme }) => rgba(theme.text1, 1)};
  ${({ $appHasLoaded }) =>
    !$appHasLoaded
      ? css`
          ${StyledCurtainContainer} {
            display: none;
          }
          overflow: hidden;
          height: 100vh;
        `
      : css`
          border: none;
          box-shadow: none;
          overflow: clip;
          height: auto;
        `}

  @keyframes shadow {
    from {
      box-shadow: 0px 0px 0px 6px ${({ theme }) => rgba(theme.text1, 1)};
    }
    to {
      box-shadow: 0px 0px 0px 0px ${({ theme }) => rgba(theme.text1, 0.5)};
    }
  }
`;

const pageLoadingVariants: Variants = {
  pageEntry: {
    scale: 1 / 1.618,
    borderRadius: 25,
  },
  pageLoad: {
    scale: 1,
    borderRadius: 0,
    transition: {
      duration: 1.6,
      delay: 4,
      ease: theme.easing,
    },
  },
};
interface PageLoaderProps {
  children: React.ReactNode;
  router: Router;
}
export const PageLoader: React.FC<PageLoaderProps> = ({ children, router }) => {
  const [appHasLoaded, setAppHasLoaded] = useState<boolean>(true);
  return (
    <AnimatePresence mode="wait">
      <StyledPageLoader
        initial="pageEntry"
        animate="pageLoad"
        exit="pageExit"
        // variants={!appHasLoaded ? pageLoadingVariants : undefined}
        // onAnimationComplete={() => setAppHasLoaded(true)}
        $appHasLoaded={appHasLoaded}
        key={router.asPath}
      >
        {children}
      </StyledPageLoader>
    </AnimatePresence>
  );
};
