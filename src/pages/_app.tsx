import { Intro } from "components/layout";
import { StyledCurtain } from "components/layout/Curtain";
import { AnimatePresence, motion, Variants } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";
import { rgba } from "polished";
import { useEffect, useState } from "react";
import styled, { ThemeProvider, css } from "styled-components";
import { GlobalStyle, INTER, POPPINS, theme } from "styles";

interface PageLoaderProps {
  $appHasLoaded: boolean;
}

const PageLoader = styled(motion.div)<PageLoaderProps>`
  display: block;
  animation: shadow 1.8s 4.5s forwards;
  animation-timing-function: cubic-bezier(0.6, 0.01, -0.05, 0.95);
  box-shadow: 0px 0px 0px 6px ${({ theme }) => rgba(theme.dark, 1)};
  ${({ $appHasLoaded }) =>
    !$appHasLoaded
      ? css`
          ${StyledCurtain} {
            display: none;
          }
          overflow: hidden;
          height: 100vh;
        `
      : css`
          border: none;
          box-shadow: none;
          overflow: visible;
          height: auto;
        `}

  @keyframes shadow {
    from {
      box-shadow: 0px 0px 0px 6px ${({ theme }) => rgba(theme.dark, 1)};
    }
    to {
      box-shadow: 0px 0px 0px 0px ${({ theme }) => rgba(theme.dark, 0.5)};
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
  const [appHasLoaded, setAppHasLoaded] = useState<boolean>(false);
  const [introHasFinished, setIntroHasFinished] = useState<boolean>(false);

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
          --inter: ${INTER.style.fontFamily};
        }
      `}</style>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AnimatePresence mode="wait">
          {introHasFinished ? (
            <PageLoader
              initial="pageEntry"
              animate="pageLoad"
              exit="pageExit"
              variants={!appHasLoaded ? pageLoadingVariants : undefined}
              onAnimationComplete={() => setAppHasLoaded(true)}
              $appHasLoaded={appHasLoaded}
              key={router.route}
            >
              <Component {...pageProps} />
            </PageLoader>
          ) : (
            <Intro setHasFinished={setIntroHasFinished} />
          )}
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}
