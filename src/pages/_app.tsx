import { PageLoader } from "components/layout/PageLoader";
import { OverlayProvider } from "context/overlay-context";
import { cancelFrame, frame } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, POPPINS, theme } from "styles";
import { JAKARTA } from "styles/fonts";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";

export default function App({ Component, pageProps, router }: AppProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

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
          <ReactLenis
            options={{ autoRaf: false, lerp: 0.25 }}
            root
            ref={lenisRef}
          >
            <PageLoader router={router}>
              <Component {...pageProps} />
            </PageLoader>
          </ReactLenis>
        </OverlayProvider>
      </ThemeProvider>
    </>
  );
}
