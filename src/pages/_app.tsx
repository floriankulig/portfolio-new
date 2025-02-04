import { StyledCurtainContainer } from "components/layout/Curtain";
import { OverlayProvider, useOverlayContext } from "context/overlay-context";
import { AnimatePresence, motion, Variants } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Router } from "next/router";
import { rgba } from "polished";
import { useEffect, useState } from "react";
import styled, { ThemeProvider, css } from "styled-components";
import { GlobalStyle, POPPINS, theme } from "styles";
import { JAKARTA } from "styles/fonts";

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

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>Florian Kulig | Portfolio</title>
        <meta name="description" content="Portfolio of Florian Kulig" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx global>{`
        :root {
          --poppins: ${POPPINS.style.fontFamily};
          --jakarta: ${JAKARTA.style.fontFamily};
        }
      `}</style>
      <ThemeProvider theme={theme}>
        <OverlayProvider>
          <GlobalStyle />
          {/* <motion.div animate=""></motion.div> */}
          <PageLoader router={router}>
            <Component {...pageProps} />
          </PageLoader>
        </OverlayProvider>
      </ThemeProvider>
    </>
  );
}

interface PageLoaderProps {
  children: React.ReactNode;
  router: Router;
}
const PageLoader: React.FC<PageLoaderProps> = ({ children, router }) => {
  const [appHasLoaded, setAppHasLoaded] = useState<boolean>(true);
  const { preRunPageTransition, setPreRunPageTransition } = useOverlayContext();
  useEffect(() => {
    setPreRunPageTransition(false);
  }, [router.route, setPreRunPageTransition]);

  return (
    <AnimatePresence mode="wait">
      <StyledPageLoader
        initial="pageEntry"
        animate={preRunPageTransition ? "pageExit" : "pageLoad"}
        exit="pageExit"
        // variants={!appHasLoaded ? pageLoadingVariants : undefined}
        // onAnimationComplete={() => setAppHasLoaded(true)}
        $appHasLoaded={appHasLoaded}
        key={router.route}
      >
        {children}
      </StyledPageLoader>
    </AnimatePresence>
  );
};
